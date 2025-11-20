import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { keyword, location, amount } = await request.json();
        const count = parseInt(amount) || 10;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate mock data
        const results = Array.from({ length: count }).map((_, i) => {
            const id = i + 1;
            // Deterministic pseudo-random for consistent demo results
            const followers = Math.floor(Math.random() * 50000) + 1000;
            const isBusiness = Math.random() > 0.5;

            return {
                username: `${keyword.toLowerCase().replace(/\s+/g, '_')}_${location.toLowerCase()}_${id}`,
                name: `${keyword} ${location} ${id}`,
                followers: followers.toLocaleString(),
                bio: isBusiness
                    ? `Best ${keyword} in ${location}. Open daily 9-5. 📞 +62 812-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}`
                    : `Lover of ${keyword} | Living in ${location} 🌴`,
                profileUrl: `https://instagram.com/example_${id}`
            };
        });

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to scrape data' }, { status: 500 });
    }
}
