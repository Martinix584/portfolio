export function SectionTitle({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-safety">
        <span className="hazard-thin inline-block h-3 w-8 rounded-sm" /> {label}
      </p>
      <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
