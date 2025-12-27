import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { loadContent, type ContentItem } from '../utils/contentLoader';

const Entrepreneurship: React.FC = () => {
    const [journeys, setJourneys] = useState<ContentItem[]>([]);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await loadContent('entrepreneurship');
            setJourneys(data);
        };
        fetchContent();
    }, []);

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Entrepreneurial Journey</h1>
                <p className="text-[var(--color-text-secondary)] max-w-2xl">
                    Reflections on building businesses, leadership, and the challenges of the startup world.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {journeys.map((item, index) => (
                    <Card key={index} {...item} delay={index * 0.1} category="entrepreneurship" />
                ))}
            </div>
        </div>
    );
};

export default Entrepreneurship;
