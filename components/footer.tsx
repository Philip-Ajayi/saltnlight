import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/#experience" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Voices", href: "/#voices" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Venue", href: "/#venue" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[.05] bg-[#030206]">
      <div className="absolute left-1/2 top-0 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-[#460583]/10 blur-[120px]" />

      <div className="section-shell relative">
        <div className="flex flex-col justify-between gap-14 py-16 md:flex-row md:py-20">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-extrabold tracking-[-.05em]"
            >
              SALT <span className="text-[#f5d061]">&</span> LIGHT
              <span className="ml-1 text-zinc-700">'26</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-600">
              A convocation of and for influence on world mountains.
              <br />
              MIV Word House · Men of Issachar Vision.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[.14em] text-zinc-600 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/[.04] py-7 text-[10px] font-bold uppercase tracking-[.12em] text-zinc-700 sm:flex-row">
          <span>© {new Date().getFullYear()} MIV Word House</span>
          <span>Authority · Encounter · Equipping · Influence · Action</span>
        </div>
      </div>
    </footer>
  );
}
