import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Logo and Description */}
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

          {/* Network */}
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

          {/* Developers */}
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

          {/* Ecosystem */}
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

          {/* Company */}
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

        {/* Newsletter Section */}
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

        {/* Bottom Bar */}
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
  );
}
