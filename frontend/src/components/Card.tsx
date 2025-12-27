import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    title: string;
    description: string;
    tags: string[];
    date?: string;
    image?: string; // Optional image URL for future use
    delay?: number;
    slug?: string;
    category?: string;
}

const Card: React.FC<CardProps> = ({ title, description, tags, date, delay = 0, slug, category }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (slug && category) {
            navigate(`/${category}/${slug}`);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            onClick={handleClick}
            className="glass-panel p-6 rounded-2xl hover:border-[var(--color-primary)] transition-colors group cursor-pointer h-full flex flex-col"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, i) => (
                        <span key={i} className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--border-color)]">
                            {tag}
                        </span>
                    ))}
                </div>
                {date && <span className="text-xs text-[var(--color-text-secondary)]">{date}</span>}
            </div>

            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-primary)] transition-colors">
                {title}
            </h3>

            <p className="text-[var(--color-text-secondary)] mb-6 flex-grow leading-relaxed">
                {description}
            </p>

            <div className="flex items-center text-sm font-medium text-[var(--color-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Read more <ArrowRight size={16} className="ml-1" />
            </div>
        </motion.div>
    );
};

export default Card;
