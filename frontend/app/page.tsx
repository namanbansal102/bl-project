'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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

  useEffect(() => {
    const SQRT_5000 = Math.sqrt(5000);
    let cardSize = window.innerWidth >= 640 ? 365 : 290;

    const testimonials = [
      { text: "My favorite solution in the market.", by: "Alex, CEO", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" },
      { text: "My data feels completely secure.", by: "Dan, CTO", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12" },
      { text: "We were lost before this.", by: "Stephanie, COO", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
      { text: "Planning is effortless now.", by: "Marie, CFO", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" },
      { text: "If I could give 11 stars, I'd give 12.", by: "Andre, Design Lead", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c" }
    ];

    let items = [...testimonials];

    function render() {
      const container = document.getElementById("carousel");
      if (!container) return;
      container.innerHTML = "";

      const center = Math.floor(items.length / 2);

      items.forEach((t, i) => {
        const position = i - center;
        const isCenter = position === 0;

        const card = document.createElement("div");
        card.className = `
          absolute left-1/2 top-1/2 p-8 border-2 cursor-pointer
          transition-all duration-500 ease-in-out
          ${isCenter ? "bg-black text-white border-black z-10" : "bg-white border-gray-300 z-0"}
        `;

        card.style.width = cardSize + "px";
        card.style.height = cardSize + "px";
        card.style.clipPath = "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)";
        card.style.transform = `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `;
        card.style.boxShadow = isCenter ? "0px 8px 0px 4px #ddd" : "none";

        card.onclick = () => move(position);

        card.innerHTML = `
          <span class="absolute bg-gray-300"
            style="right:-2px; top:48px; width:${SQRT_5000}px; height:2px;
                   transform:rotate(45deg)"></span>

          <img src="${t.img}" class="h-14 w-12 object-cover mb-4"
            style="box-shadow:3px 3px 0 #fff" alt="${t.by}" />

          <h3 class="text-lg font-medium">"${t.text}"</h3>
          <p class="absolute bottom-8 italic text-sm opacity-70">- ${t.by}</p>
        `;

        container.appendChild(card);
      });
    }

    function move(steps: number) {
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          items.push(items.shift()!);
        }
      } else {
        for (let i = 0; i < Math.abs(steps); i++) {
          items.unshift(items.pop()!);
        }
      }
      render();
    }

    const handleResize = () => {
      cardSize = window.innerWidth >= 640 ? 365 : 290;
      render();
    };

    window.addEventListener("resize", handleResize);
    render();

    // Expose move function to window for button clicks
    (window as any).move = move;

    return () => {
      window.removeEventListener("resize", handleResize);
      delete (window as any).move;
    };
  }, []);

  return (
    <>
      {/* HEADER */}
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

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('/assets/homepage.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            The trust layer for the
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {' '}decentralized economy
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/80">
            Build enterprise-grade decentralized applications with speed, security, and sustainability.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-3 px-6 bg-[#050b1f]">
        <div className="relative z-10 bg-gray-200 rounded-[50px] p-12 md:p-16 shadow-2xl max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">9,403,156</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-900 mt-3">Mainnet<br/>Accounts Created</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">71,611,518</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-900 mt-3">Total Mainnet<br/>Transactions</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">345,980</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-900 mt-3">Transactions in<br/>the Last 24 Hours</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">2.90</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-900 mt-3">Seconds to<br/>Consensus Finality</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">$0.001</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-900 mt-3">Average Cost<br/>Per Transaction</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">0.000003</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-900 mt-3">Average kWh<br/>Per Transaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why YourChain Section */}
      <section className="max-w-7xl mx-auto px-6 bg-[#050b1f] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT (STICKY) */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center">
            <div className="space-y-6 max-w-md">
              <span className="text-sm uppercase tracking-widest text-blue-400">Why YourChain</span>

              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Built for the
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {' '}decentralized future
                </span>
              </h1>

              <p className="text-white/70 text-lg">
                Enterprise-grade infrastructure designed to scale securely with your applications.
              </p>
            </div>
          </div>

          {/* RIGHT (SCROLLING) */}
          <div className="space-y-32 py-24">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Open, Public, and Globally Governed</h2>
              <p className="text-white/60">
                YourChain is an open-source, public network governed by a global council of leading organizations. This model ensures decentralization, transparency, and long-term stability without reliance on any single entity.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Enterprise-Grade Governance</h2>
              <p className="text-white/60">
                The governing council consists of globally recognized enterprises, institutions, and infrastructure leaders. Each member operates network nodes, participates equally in decision-making, and helps guide the future of the protocol.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Trust, Security, and Transparency</h2>
              <p className="text-white/60">
                Network upgrades, treasury management, and protocol changes follow a transparent and auditable process. This structure builds trust while maintaining strong security guarantees for applications running on the network.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Open Source & Community Driven</h2>
              <p className="text-white/60">
                The YourChain codebase and ecosystem standards are fully open source. Developers, node operators, and ecosystem contributors collaborate through structured improvement proposals to evolve the network responsibly over time.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Expanding Application Ecosystem</h2>
              <p className="text-white/60">
                A growing global ecosystem of applications spans finance, identity, sustainability, AI, gaming, and supply chain. Builders leverage predictable fees, high throughput, and enterprise reliability to power real-world use cases at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <div id="carousel" className="relative w-full h-full"></div>

        <button
          onClick={() => (window as any).move(-1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 flex items-center justify-center border-2 border-gray-300 bg-white hover:bg-black hover:text-white transition rounded-full shadow"
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          onClick={() => (window as any).move(1)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 flex items-center justify-center border-2 border-gray-300 bg-white hover:bg-black hover:text-white transition rounded-full shadow"
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Get Started Section */}
      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-white/70 text-3xl md:text-4xl font-bold text-center mb-4">Get Started with Mintverse</h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">
            Whether you&apos;re a developer, MVERSE enthusiast, or web3 application user, here&apos;s how to get started with Mintverse.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600')] bg-cover bg-center opacity-30"></div>
              <div className="relative p-8 h-80 flex flex-col justify-end">
                <h3 className="text-xs uppercase tracking-wider text-blue-200 mb-2">Developers</h3>
                <p className="text-white/80 text-sm mb-4">
                  Learn how to start building on Mintverse, join the developer community, and contribute to the codebase.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all">
                  Start building
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-teal-600/80"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600')] bg-cover bg-center opacity-30"></div>
              <div className="relative p-8 h-80 flex flex-col justify-end">
                <h3 className="text-xs uppercase tracking-wider text-green-200 mb-2">Retail Users</h3>
                <p className="text-white/80 text-sm mb-4">
                  Start using permissionless dapps built on Mintverse, from DeFi protocols to NFT marketplaces and more.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all">
                  Start using
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 to-red-600/80"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600')] bg-cover bg-center opacity-30"></div>
              <div className="relative p-8 h-80 flex flex-col justify-end">
                <h3 className="text-xs uppercase tracking-wider text-orange-200 mb-2">MVERSE Enthusiasts</h3>
                <p className="text-white/80 text-sm mb-4">
                  Learn more about MVERSE, Mintverse, and use cases. Join the community, get a wallet, and view exchanges.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all">
                  Start learning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-purple-600">◆</span>
                </div>
                <span className="font-bold text-xl">Metaverse</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Building the trust layer of the digital economy with fast, fair, and secure distributed ledger technology.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4">Network</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Overview</Link></li>
                <li><Link href="#" className="hover:text-white transition">How It Works</Link></li>
                <li><Link href="#" className="hover:text-white transition">Consensus</Link></li>
                <li><Link href="#" className="hover:text-white transition">Network Services</Link></li>
                <li><Link href="#" className="hover:text-white transition">Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4">Developers</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition">SDKs</Link></li>
                <li><Link href="#" className="hover:text-white transition">Code Samples</Link></li>
                <li><Link href="#" className="hover:text-white transition">Tutorials</Link></li>
                <li><Link href="#" className="hover:text-white transition">Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4">Ecosystem</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Use Cases</Link></li>
                <li><Link href="#" className="hover:text-white transition">Projects</Link></li>
                <li><Link href="#" className="hover:text-white transition">Partners</Link></li>
                <li><Link href="#" className="hover:text-white transition">Council</Link></li>
                <li><Link href="#" className="hover:text-white transition">Grants</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition">Press</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 pb-8">
            <div className="max-w-xl">
              <h4 className="font-semibold text-lg mb-3">Stay up to date</h4>
              <p className="text-gray-400 text-sm mb-4">Get the latest Metaverse news and updates delivered to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-purple-600 focus:outline-none text-sm text-white placeholder-gray-500"
                />
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-sm transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024-2025 Metaverse Network, LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition">Cookie Policy</Link>
              <Link href="#" className="hover:text-white transition">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
