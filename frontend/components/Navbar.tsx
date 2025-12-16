'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  useEffect(() => {
    const header = document.getElementById("siteHeader");
    const navLinks = header?.querySelectorAll(".nav-link");
    const searchInput = header?.querySelector(".search-input") as HTMLInputElement;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        header?.classList.remove("bg-transparent", "text-white");
        header?.classList.add("bg-white", "text-black", "shadow-sm");

        navLinks?.forEach(link => {
          link.classList.remove("opacity-80");
        });

        searchInput?.classList.remove("bg-white/10", "border-white/20", "placeholder-white/60");
        searchInput?.classList.add("bg-gray-100", "border-gray-300", "placeholder-gray-500");
      } else {
        header?.classList.add("bg-transparent", "text-white");
        header?.classList.remove("bg-white", "text-black", "shadow-sm");

        searchInput?.classList.add("bg-white/10", "border-white/20", "placeholder-white/60");
        searchInput?.classList.remove("bg-gray-100", "border-gray-300", "placeholder-gray-500");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="siteHeader" className="fixed top-0 z-50 w-full transition-all duration-300 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 font-serif text-2xl">
            <Image src="/assets/logo.png" alt="YourChain logo" width={32} height={32} className="object-contain" />
            <span><Link href="/">Mintverse</Link></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link href="#" className="nav-link">Network</Link>
            <Link href="#" className="nav-link">Use Cases</Link>
            <Link href="/nftlist" className="nav-link">Items</Link>
            <Link href="#" className="nav-link underline underline-offset-4">Quickstart</Link>

            {/* Inline Search */}
            <input
              type="text"
              placeholder="Search"
              className="search-input w-36 px-3 py-1.5 rounded-md text-xs bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40 transition"
            />
          </nav>

          {/* Mobile Toggle */}
          <button id="menuBtn" className="lg:hidden w-8 h-8 relative">
            <span className="bar top-3"></span>
            <span className="bar top-5"></span>
            <span className="bar top-7"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
