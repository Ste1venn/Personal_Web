import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleOpenChat = () => {
        window.dispatchEvent(new Event('open-chat'));
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)] opacity-10 blur-[120px] rounded-full animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-secondary)] opacity-10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-6 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-[var(--color-primary)] mb-6">
                        AI Product Manager & Entrepreneur
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        Building the Future <br />
                        <span className="text-gradient">With Ste1venn</span>
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10">
                        Exploring the intersection of Product Management, Artificial Intelligence, and Entrepreneurship.
                        Documenting the journey of building valuable products in the age of AI.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/product')}
                            className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-bg-primary)] font-bold hover:opacity-90 transition-opacity w-full md:w-auto"
                        >
                            Start Exploring
                        </button>
                        <button
                            onClick={handleOpenChat}
                            className="px-8 py-3 rounded-full glass-panel text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-bg-secondary)] transition-colors w-full md:w-auto"
                        >
                            Ask AI Assistant
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
