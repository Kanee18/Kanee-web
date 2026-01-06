export default function ApiProductPage() {
    return (
        <main className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden">
            <div className="z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-lenis-pink mb-4">
                    API PRODUCT
                </h1>
                <p className="text-gray-400 font-mono tracking-widest uppercase text-sm md:text-base">
                    System Under Development
                </p>
                <div className="mt-8">
                    <a href="/" className="text-white hover:text-lenis-pink border border-white/20 px-6 py-2 rounded-sm transition-colors font-syncopate text-xs uppercase">
                        Return to Base
                    </a>
                </div>
            </div>

            {/* Background Element */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lenis-pink/30 via-transparent to-transparent"></div>
        </main>
    );
}
