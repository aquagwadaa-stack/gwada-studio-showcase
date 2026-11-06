import { useEffect, type CSSProperties } from "react";

type Apparition = { "data-reveal": string; style?: CSSProperties };

/**
 * Apparition au défilement. Un nombre décale l'élément dans une série,
 * "zoom" le fait arriver avec un léger agrandissement.
 */
export function reveal(option: number | "zoom" = 0): Apparition {
  if (option === "zoom") return { "data-reveal": "zoom" };
  return { "data-reveal": "", style: { "--i": option } as CSSProperties };
}

/** Entrée au chargement, pour le haut de page. */
export function rise(ordre = 0): { style: CSSProperties } {
  return { style: { "--i": ordre } as CSSProperties };
}

/** Filet de sécurité : si le script du site n'arrive pas, tout le contenu reste visible. */
export const scriptAnimations = `setTimeout(function(){if(!window.__gwsMotion)document.documentElement.classList.remove('gws-anim')},3000)`;

const DUREE_PAGE = 7000;

export function useSiteMotion() {
  useEffect(() => {
    const racine = document.documentElement;
    (window as Window & { __gwsMotion?: boolean }).__gwsMotion = true;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit || !("IntersectionObserver" in window)) {
      racine.classList.remove("gws-anim");
      return;
    }
    racine.classList.add("gws-anim");

    // React finit de préparer la page juste après cet effet : on attend qu'il ait
    // terminé avant de poser quoi que ce soit sur ses éléments.
    let arreter = () => {};
    const demarrer = () => {
      arreter = lancerMouvement(racine);
    };
    const inactif = typeof window.requestIdleCallback === "function";
    const attente = inactif
      ? window.requestIdleCallback(demarrer, { timeout: 800 })
      : window.setTimeout(demarrer, 200);

    return () => {
      if (inactif) window.cancelIdleCallback(attente);
      else window.clearTimeout(attente);
      arreter();
    };
  }, []);
}

function lancerMouvement(racine: HTMLElement) {
  const apparitions = new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        entree.target.setAttribute("data-visible", "");
        apparitions.unobserve(entree.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
  );

  // Sur écran tactile, chaque vraie page défile une fois quand elle arrive à l'écran.
  const tactile = window.matchMedia("(hover: none)").matches;
  const minuteries: number[] = [];
  const pages = new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        const page = entree.target;
        pages.unobserve(page);
        minuteries.push(
          window.setTimeout(() => page.setAttribute("data-pan", ""), 500),
          window.setTimeout(() => page.removeAttribute("data-pan"), 500 + DUREE_PAGE + 600),
        );
      }
    },
    { threshold: 0.65 },
  );

  const suivre = () => {
    document
      .querySelectorAll("[data-reveal]:not([data-visible])")
      .forEach((element) => apparitions.observe(element));
    if (tactile) {
      document.querySelectorAll(".gws-page:not([data-suivie])").forEach((element) => {
        element.setAttribute("data-suivie", "");
        pages.observe(element);
      });
    }
  };
  suivre();

  let attente = 0;
  const changements = new MutationObserver(() => {
    cancelAnimationFrame(attente);
    attente = requestAnimationFrame(suivre);
  });
  changements.observe(document.body, { childList: true, subtree: true });

  let image = 0;
  const auDefilement = () => {
    if (image) return;
    image = requestAnimationFrame(() => {
      image = 0;
      const y = window.scrollY;
      racine.toggleAttribute("data-scrolled", y > 12);
      document
        .querySelector<HTMLElement>("[data-fan]")
        ?.style.setProperty("--sy", Math.min(y / 620, 1).toFixed(3));
    });
  };
  auDefilement();
  window.addEventListener("scroll", auDefilement, { passive: true });

  // À la souris : les vraies pages suivent légèrement le curseur, et les cartes s'éclairent.
  let imageSouris = 0;
  let dernier: PointerEvent | null = null;
  const appliquerSouris = () => {
    imageSouris = 0;
    if (!dernier) return;
    const { clientX, clientY, target } = dernier;
    const fan = document.querySelector<HTMLElement>("[data-fan]");
    if (fan) {
      fan.style.setProperty("--mx", ((clientX / window.innerWidth) * 2 - 1).toFixed(3));
      fan.style.setProperty("--my", ((clientY / window.innerHeight) * 2 - 1).toFixed(3));
    }
    const carte = target instanceof Element ? target.closest<HTMLElement>("[data-spot]") : null;
    if (carte) {
      const cadre = carte.getBoundingClientRect();
      carte.style.setProperty("--x", `${clientX - cadre.left}px`);
      carte.style.setProperty("--y", `${clientY - cadre.top}px`);
    }
  };
  const auPointeur = (evenement: PointerEvent) => {
    dernier = evenement;
    if (!imageSouris) imageSouris = requestAnimationFrame(appliquerSouris);
  };
  const souris = window.matchMedia("(pointer: fine)").matches;
  if (souris) window.addEventListener("pointermove", auPointeur, { passive: true });

  return () => {
    apparitions.disconnect();
    pages.disconnect();
    changements.disconnect();
    minuteries.forEach(window.clearTimeout);
    cancelAnimationFrame(attente);
    cancelAnimationFrame(image);
    cancelAnimationFrame(imageSouris);
    window.removeEventListener("scroll", auDefilement);
    window.removeEventListener("pointermove", auPointeur);
  };
}
