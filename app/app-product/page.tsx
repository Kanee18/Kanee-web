import { GlitchText } from "@/components/ui/GlitchText";

export default function AppProductPage() {
    return (
        <main className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center py-24 relative overflow-hidden">

            {/* Background Grids */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="z-10 container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-2">
                        <span className="text-lenis-pink">APP</span> REPOSITORY
                    </h1>
                    <p className="text-gray-400 font-mono tracking-widest text-sm uppercase">Secure Download Terminal</p>
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* IMaRe App Card */}
                    <div className="group relative bg-white/5 border border-white/10 hover:border-lenis-pink/50 transition-colors flex flex-col overflow-hidden">
                        <div className="absolute inset-0 bg-lenis-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Preview Image */}
                        <div className="w-full h-48 bg-black/50 relative overflow-hidden border-b border-white/10">
                            <img
                                src="/assets/imare_preview.png"
                                alt="IMaRe Preview"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />
                            {/* Overlay Number */}
                            <div className="absolute top-4 left-4 w-10 h-10 bg-black/80 backdrop-blur-md rounded-md flex items-center justify-center border border-lenis-pink/50 z-10">
                                <span className="text-lenis-pink font-bold text-sm">01</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-4 flex-grow relative z-10">
                            <div>
                                <h3 className="text-xl font-bold font-syncopate mb-2 text-white group-hover:text-lenis-pink transition-colors">IMaRe</h3>
                                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                                    Image Reference Manager. Create and manage multiple reference image spaces with drag-and-drop, drawing tools, and auto-save.
                                </p>
                            </div>

                            <div className="mt-auto pt-4 w-full">
                                <a
                                    href="https://github.com/Kanee18/IMaRe/releases/download/v1.2.2/IMaRe.Setup.1.2.2.exe"
                                    className="w-full py-3 bg-lenis-pink text-black font-bold font-mono text-sm hover:bg-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>DOWNLOAD (v1.2.2)</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder App Card 2 */}
                    <div className="group relative bg-white/5 border border-white/10 hover:border-lenis-pink/50 transition-colors flex flex-col overflow-hidden">
                        <div className="absolute inset-0 bg-lenis-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Preview Image */}
                        <div className="w-full h-48 bg-black/50 relative overflow-hidden border-b border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
                                alt="Neon Sync Preview"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 filter grayscale group-hover:grayscale-0"
                            />
                            {/* Overlay Number */}
                            <div className="absolute top-4 left-4 w-10 h-10 bg-black/80 backdrop-blur-md rounded-md flex items-center justify-center border border-lenis-pink/50 z-10">
                                <span className="text-lenis-pink font-bold text-sm">02</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-4 flex-grow relative z-10">
                            <div>
                                <h3 className="text-xl font-bold font-syncopate mb-2 text-white group-hover:text-lenis-pink transition-colors">Neon Sync</h3>
                                <p className="text-gray-400 text-sm font-mono leading-relaxed">Visual synchronization suite for holographic projectors. Beta version available.</p>
                            </div>

                            <div className="mt-auto pt-4 w-full">
                                <button className="w-full py-3 bg-white/10 text-white border border-white/20 font-bold font-mono text-sm hover:bg-lenis-pink hover:text-black hover:border-lenis-pink transition-colors flex items-center justify-center gap-2">
                                    <span>COMING SOON</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Return to Dashboard
                    </a>
                </div>
            </div>
        </main>
    );
}
