export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="meta flex items-center gap-3 text-white/35"><span className="h-px w-7 bg-white/20" />{children}</p>;
}
