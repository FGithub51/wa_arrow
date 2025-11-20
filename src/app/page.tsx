import React from 'react';
import { MessageCircle, Instagram, ArrowRight, CheckCircle2, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            SaaS Kit
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <a href="#products" className="hover:text-black transition-colors">Products</a>
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/waarrow" className="text-gray-600 hover:text-black font-medium">Login</Link>
            <Link href="/waarrow" className="bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">New tools added weekly</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Supercharge your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Marketing Workflow</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Access a suite of powerful tools designed to automate your outreach,
            find targeted leads, and grow your business faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/waarrow" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group">
              <MessageCircle size={20} />
              Open Wa Arrow
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/huntgram" className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Instagram size={20} />
              Open Huntgram
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Power Tools</h2>
            <p className="text-gray-500">Everything you need to scale your outreach.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Wa Arrow Card */}
            <Link href="/waarrow" className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/20 group-hover:-translate-y-1 transition-transform">
                  <MessageCircle size={28} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Wa Arrow</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  The ultimate WhatsApp automation tool. Manage contacts, create templates,
                  and send personalized messages safely and efficiently.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    Bulk Message Generation
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    Safe "Click-to-Chat" Mode
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    Real-time Inbox & Replies
                  </li>
                </ul>
                <span className="inline-flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                  Launch App <ArrowRight size={18} className="ml-1" />
                </span>
              </div>
            </Link>

            {/* Huntgram Card */}
            <Link href="/huntgram" className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/20 group-hover:-translate-y-1 transition-transform">
                  <Instagram size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors">Huntgram</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Advanced Instagram scraper for lead generation. Find businesses and influencers
                  by location and niche in seconds.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-pink-500" />
                    Location-based Search
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-pink-500" />
                    Niche & Keyword Filtering
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-pink-500" />
                    One-click CSV Export
                  </li>
                </ul>
                <span className="inline-flex items-center text-pink-600 font-bold group-hover:gap-2 transition-all">
                  Launch Scraper <ArrowRight size={18} className="ml-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-white text-xl">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black">
              <Zap size={18} fill="currentColor" />
            </div>
            SaaS Kit
          </div>
          <div className="text-sm">
            © 2024 SaaS Kit Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors"><Globe size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Shield size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
