'use client';

import React, { useState } from 'react';
import { Search, MapPin, Instagram, Loader2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HuntgramPage() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate search
        setTimeout(() => {
            setResults([
                { username: 'cafe_bali', name: 'Bali Coffee Spot', followers: '12.5k', bio: 'Best coffee in Bali ☕️' },
                { username: 'bali_eats', name: 'Bali Foodie', followers: '45.2k', bio: 'Exploring Bali food scene 🌴' },
                { username: 'seminyak_vibes', name: 'Seminyak Vibes', followers: '8.9k', bio: 'Sunset and chill 🌅' },
            ]);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
                        <Instagram size={24} />
                    </div>
                    <span className="font-bold text-2xl text-gray-900 tracking-tight">Huntgram</span>
                </div>
                <nav className="flex gap-6">
                    <a href="/" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Home</a>
                    <a href="/waarrow" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Wa Arrow</a>
                </nav>
            </header>

            <main className="max-w-6xl mx-auto p-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Instagram Lead Scraper</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find targeted leads on Instagram by location and niche.
                        Export data directly to CSV for your marketing campaigns.
                    </p>
                </div>

                {/* Search Box */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto mb-12">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Niche / Keyword (e.g. Coffee Shop)"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 rounded-xl transition-all outline-none font-medium"
                                required
                            />
                        </div>
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Location (e.g. Bali, Indonesia)"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 rounded-xl transition-all outline-none font-medium"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Scrape'}
                        </button>
                    </form>
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Results ({results.length})</h2>
                            <button className="flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                                <Download size={18} />
                                Export CSV
                            </button>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 font-semibold text-gray-600 text-sm">User</th>
                                        <th className="p-4 font-semibold text-gray-600 text-sm">Followers</th>
                                        <th className="p-4 font-semibold text-gray-600 text-sm">Bio</th>
                                        <th className="p-4 font-semibold text-gray-600 text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {results.map((item, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                                                        {item.username[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{item.name}</div>
                                                        <div className="text-sm text-gray-500">@{item.username}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-600 font-medium">{item.followers}</td>
                                            <td className="p-4 text-gray-600 text-sm max-w-xs truncate">{item.bio}</td>
                                            <td className="p-4">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View Profile</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
