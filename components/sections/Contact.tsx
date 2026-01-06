'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { GlitchText } from '@/components/ui/GlitchText';
import { HolographicRadar } from '@/components/canvas/HolographicRadar';

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Form Submitted:', formState);
            alert('Message transmitted to the network!');
            setIsSubmitting(false);
            setFormState({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-black relative flex items-center justify-center min-h-screen overflow-hidden">
            {/* Background Radar */}
            <HolographicRadar />

            <div className="container mx-auto px-6 max-w-5xl relative z-10 w-full grid md:grid-cols-2 gap-16">

                {/* Info Side */}
                <div>
                    <h2 className="text-3xl md:text-7xl font-orbitron font-bold text-white mb-6">
                        <GlitchText text="LET'S" /> <br />
                        <span className="text-lenis-pink"><GlitchText text="CONNECT" /></span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-sm leading-relaxed">
                        Ready to build something extraordinary? Initialize a secure connection and let&apos;s discuss your next mission.
                    </p>

                    <div className="space-y-6">
                        <a href="#" className="flex items-center space-x-4 text-gray-300 hover:text-lenis-pink transition-colors group">
                            <div className="p-3 bg-white/5 border border-white/10 group-hover:border-lenis-pink transition-colors">
                                <Mail size={24} />
                            </div>
                            <span className="font-mono">hello@bhagaskara.dev</span>
                        </a>

                        <div className="flex space-x-4 mt-8">
                            {[Github, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="p-3 bg-white/5 border border-white/10 hover:bg-lenis-pink/10 hover:border-lenis-pink hover:text-lenis-pink transition-all">
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#0a0a0a] border border-white/10 p-6 md:p-12 relative"
                >
                    {/* Decor corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lenis-pink/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lenis-pink/50" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-mono text-lenis-pink mb-2 uppercase tracking-wider">Identity</label>
                            <input
                                type="text"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-lenis-pink transition-colors placeholder:text-gray-700"
                                placeholder="ENTER NAME"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-lenis-pink mb-2 uppercase tracking-wider">Signal Source</label>
                            <input
                                type="email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-lenis-pink transition-colors placeholder:text-gray-700"
                                placeholder="ENTER EMAIL"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-lenis-pink mb-2 uppercase tracking-wider">Transmission</label>
                            <textarea
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-lenis-pink transition-colors placeholder:text-gray-700 resize-none"
                                placeholder="ENTER MESSAGE"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-lenis-pink/10 border border-lenis-pink text-lenis-pink font-bold hover:bg-lenis-pink hover:text-black transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
