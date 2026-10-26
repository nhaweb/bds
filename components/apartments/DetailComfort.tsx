import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { AmenityIcon } from "@/components/home/AmenityIcon";
import { SectionReveal } from "@/components/motion/SectionReveal";

type AmenityItem = {
  id: string;
  title: string;
  icon?: string;
};

type Props = {
  title: string;
  body: PortableTextBlock[];
  summary?: string;
  amenities: AmenityItem[];
};

export function DetailComfort({ title, body, summary, amenities }: Props) {
  const hasBody = body.length > 0;

  return (
    <section className="page-x section-y">
      <SectionReveal className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <h2
            data-reveal
            className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] font-semibold tracking-[-0.02em]"
          >
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {summary ? (
            <p
              data-reveal
              className="max-w-xl text-lg leading-relaxed text-muted md:text-xl"
            >
              {summary}
            </p>
          ) : null}

          {hasBody ? (
            <div
              data-reveal
              className="columns-1 gap-x-10 text-muted md:columns-2 [&_p]:mb-5 [&_p]:break-inside-avoid [&_p]:leading-relaxed"
            >
              <PortableText value={body} />
            </div>
          ) : null}

          {amenities.length > 0 ? (
            <ul
              data-reveal
              className="mt-2 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3"
            >
              {amenities.map((a) => (
                <li key={a.id} className="flex items-center gap-3 text-sm">
                  <span className="text-fg/80">
                    <AmenityIcon name={a.icon} />
                  </span>
                  <span>{a.title}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </SectionReveal>
    </section>
  );
}
