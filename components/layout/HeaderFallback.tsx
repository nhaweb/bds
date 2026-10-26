type Props = {
  brand: string;
};

export function HeaderFallback({ brand }: Props) {
  const short =
    brand.replace(/\s*Resort\s*/i, "").trim().toLowerCase() || "pml";
  return (
    <header className="fixed top-0 right-0 left-0 z-40">
      <div className="page-x flex min-h-16 items-center justify-between gap-4 py-4 md:min-h-[4.5rem]">
        <span className="font-body text-[clamp(1.35rem,2.2vw,1.7rem)] font-bold tracking-[-0.04em] text-fg">
          {short}.
        </span>
        <span className="h-11 w-11 rounded-full bg-fg" aria-hidden />
      </div>
    </header>
  );
}
