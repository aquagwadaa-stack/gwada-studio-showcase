import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#0d1715] px-5 py-14 text-[#f7f7ef] sm:px-8 sm:py-20 lg:px-12">
      <article className="mx-auto max-w-[760px]">
        <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.045em]">
          {title}
        </h1>
        <p className="mt-3 text-xs font-bold text-white/40">Mise à jour : {updated}</p>
        <div className="mt-10 grid gap-9">{children}</div>
      </article>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-black tracking-[-0.02em]">{title}</h2>
      <div className="mt-3 grid gap-3 text-sm leading-relaxed text-white/68">{children}</div>
    </section>
  );
}
