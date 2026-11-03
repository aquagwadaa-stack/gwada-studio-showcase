import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding } from "@/components/site/SeoLanding";
import { landingHead, landingPages } from "@/lib/landing-pages";

const page = landingPages.noel;

export const Route = createFileRoute("/site-commandes-noel")({
  staticData: { sitemap: true },
  head: () => landingHead(page),
  component: () => <SeoLanding page={page} />,
});
