import Link from "next/link";

export default function Footer() {
  return <footer id="visit" className="border-t border-white/10"><div className="page-container py-20 md:py-28"><div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
    <div><div className="font-display text-4xl font-extrabold tracking-[-0.06em]">MIV.</div><p className="mt-8 max-w-sm text-xl leading-relaxed text-white/65">“The word of God abides in you, and you have overcome the wicked one.”</p><p className="meta mt-8 text-white/35">1 JOHN 2:14 AMP</p></div>
    <div><p className="meta mb-6 text-white/35">VISIT</p><address className="not-italic leading-8 text-white/65">Behind Accord Building<br />Obadeyi Estate<br />Samonda, Ibadan<br />Oyo State, Nigeria</address><p className="mt-6 text-white/90">Sun 8:30 AM · Wed 6:00 PM</p></div>
    <div><p className="meta mb-6 text-white/35">CONNECT</p><div className="flex flex-col gap-3 text-white/65">{["Facebook","Instagram","X","Threads","Spotify","Telegram","YouTube"].map((item) => <a href="#" key={item} className="transition hover:text-white">{item}</a>)}</div></div>
    <div><p className="meta mb-6 text-white/35">CONTACT</p><a href="mailto:contact@mivwordhouse.com" className="block break-all text-white/75 transition hover:text-white">contact@mivwordhouse.com</a><a href="tel:+2348133027209" className="mt-3 block text-white/75 transition hover:text-white">+234 813 302 7209</a><div className="mt-8 h-36 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"><div className="flex h-full items-center justify-center"><span className="meta text-white/20">SAMONDA · IBADAN</span></div></div></div>
  </div><div className="mt-20 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 md:flex-row"><p className="meta text-white/25">MIV WORD HOUSE · MEN OF ISSACHAR VISION · EST. 1981</p><Link href="/about" className="meta text-white/40 hover:text-white">OUR STORY →</Link></div></div></footer>;
}
