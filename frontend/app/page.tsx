'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {

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
      <Navbar />

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

      <Footer />
    </>
  );
}
