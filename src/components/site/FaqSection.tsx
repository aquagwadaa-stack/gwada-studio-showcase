import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

export function FaqSection({
  items,
  title = "Vos questions",
}: {
  items: FaqItem[];
  title?: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-[860px]">
        <h2 className="font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
          {title}
        </h2>
        <div className="mt-8 grid gap-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold">
                {item.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-[#54d7c8] transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/62">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
