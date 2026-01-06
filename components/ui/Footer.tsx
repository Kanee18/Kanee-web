'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black border-t border-white/10 py-8 relative z-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div className="font-mono">
                    &copy; {new Date().getFullYear()} KANEE.DEV. SYSTEM ONLINE.
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-6">
                    <a href="#" className="hover:text-lenis-pink transition-colors">PRIVACY</a>
                    <a href="#" className="hover:text-lenis-pink transition-colors">TERMS</a>

                    <button
                        onClick={scrollToTop}
                        className="p-2 border border-white/10 hover:border-lenis-pink hover:text-lenis-pink transition-colors rounded-sm"
                        aria-label="Back to top"
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
