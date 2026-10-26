import { getTranslations } from "next-intl/server";
import { AmenityIcon } from "@/components/home/AmenityIcon";
import { SectionReveal } from "@/components/motion/SectionReveal";

type AmenityItem = {
  id: string;
  title: string;
  icon?: string;
};

type Props = {
  title: string;
  body: string;
  items: AmenityItem[];
};

export async function Amenities({ title, body, items }: Props) {
  const t = await getTranslations("home");
  if (items.length === 0) return null;

  return (
    <section className="page-x section-y">
      <SectionReveal className="mx-auto max-w-[90rem] text-center">
        <h2
          data-reveal
          className="font-display text-[length:var(--type-display)] leading-[0.82] font-semibold tracking-[-0.02em]"
        >
          {title || t("amenitiesTitle")}
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-md text-sm text-muted md:text-base">
          {body || t("amenitiesBody")}
        </p>

        <ul
          data-reveal
          className="mt-14 grid grid-cols-2 md:mt-20 md:grid-cols-4"
        >
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`flex flex-col items-center gap-4 px-4 py-8 ${
                i % 2 === 1 ? "border-l border-fg/15" : ""
              } ${i >= 2 ? "border-t border-fg/15 md:border-t-0" : ""} ${
                i % 4 !== 0 ? "md:border-l md:border-fg/15" : "md:border-l-0"
              }`}
            >
              <AmenityIcon name={item.icon} />
              <span className="text-xs tracking-[0.06em] uppercase md:text-sm">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </SectionReveal>
    </section>
  );
}
