import { SectionReveal } from "@/components/motion/SectionReveal";

export type SpecItem = {
  value: string;
  label: string;
};

type Props = {
  items: SpecItem[];
};

/** Compact rounded specs strip (Nueve Classic mosaic band). */
export function DetailSpecs({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <SectionReveal className="page-x pt-10 md:pt-14">
      <dl
        data-reveal
        className="mx-auto flex max-w-[90rem] flex-wrap overflow-hidden rounded-[1.25rem] border border-fg/15 md:rounded-[1.5rem]"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex min-w-[40%] flex-1 flex-col items-center justify-center px-4 py-5 text-center sm:min-w-0 sm:px-6 sm:py-6 ${
              i > 0 ? "border-t border-fg/12 sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <dd className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-semibold tracking-[-0.03em]">
              {item.value}
            </dd>
            <dt className="mt-2 text-xs tracking-[0.04em] text-muted md:text-sm">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </SectionReveal>
  );
}
