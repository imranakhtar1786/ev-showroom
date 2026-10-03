export default function Footer() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Technology", href: "#technology" },
    { label: "Charging", href: "#charging" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14">

        {/* Main Footer */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div>
            <div className="text-3xl font-black tracking-[-0.07em]">
              VOLT<span className="text-[#baff35]">URA</span>
            </div>

            <p className="mt-3 max-w-xs text-xs leading-5 text-white/35">
              Electric mobility and energy systems
              built for the future.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/45 transition-colors duration-300 hover:text-[#baff35]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="md:text-right">
            <a
              href="mailto:hello@voltura.com"
              className="text-xs text-white/45 transition-colors duration-300 hover:text-[#baff35]"
            >
              hello@voltura.com
            </a>

            <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/20">
              Electric Mobility
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">

          <p className="text-[10px] text-white/25">
            © 2026 Voltura. All rights reserved.
          </p>

          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
            Electric Mobility / Energy Systems
          </p>

        </div>
      </div>
    </footer>
  );
}