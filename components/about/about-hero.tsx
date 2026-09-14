import SectionLabel from "@/components/ui/section-label";

export default function AboutHero() {
  return <section className="flex min-h-[85vh] items-end"><div className="page-container w-full pb-20 pt-44"><SectionLabel>THE MOVEMENT · EST. 1981</SectionLabel><h1 className="display-heading mt-8 max-w-7xl">EMPOWERING A<br />GENERATION TO<br /><span className="text-white/45">LEAD & EXCEL.</span></h1><div className="mt-12 grid gap-8 border-t border-white/10 pt-7 md:grid-cols-2"><p className="body-copy max-w-xl">MIV Word House exists to cultivate a generation grounded in the Word, shaped by character and equipped to lead with excellence.</p><blockquote className="font-display text-2xl font-semibold tracking-[-0.035em] text-white/70 md:text-3xl">“The word of God abides in you, and you have overcome the wicked one.”<footer className="meta mt-5 text-white/30">1 JOHN 2:14 AMP</footer></blockquote></div></div></section>;
}
