import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { loadContent, type ContentItem } from '../utils/contentLoader';
import { ArrowLeft } from 'lucide-react';

const ArticleDetail: React.FC = () => {
    const { category, slug } = useParams<{ category: string; slug: string }>();
    const navigate = useNavigate();
    const [content, setContent] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!category || !slug) return;

            // Load all content for the category (simple approach for now)
            const allContent = await loadContent(category as 'product' | 'ai' | 'entrepreneurship');
            const found = allContent.find(item => item.slug === slug);

            setContent(found || null);
            setLoading(false);
        };

        fetchArticle();
    }, [category, slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen pt-32 text-center px-6">
                <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                <button onClick={() => navigate(-1)} className="text-[var(--color-primary)] hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back
                </button>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h1 className="text-4xl font-bold mb-4 text-white leading-tight">{content.title}</h1>

                    <div className="flex gap-4 text-sm text-[var(--color-text-secondary)] mb-8 border-b border-[var(--border-color)] pb-6">
                        <span>{content.date}</span>
                        <div className="flex gap-2">
                            {content.tags.map(tag => (
                                <span key={tag} className="text-[var(--color-primary)]">#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="markdown-content text-[var(--color-text-secondary)] leading-loose">
                        <ReactMarkdown
                            components={{
                                img: ({ node, ...props }) => (
                                    <span className="block my-8">
                                        <img
                                            {...props}
                                            className="rounded-xl shadow-2xl border border-[var(--border-color)] w-full max-h-[500px] object-cover"
                                        />
                                        {props.title && (
                                            <span className="block text-center text-sm text-[var(--color-text-secondary)] mt-2 italic">
                                                {props.title}
                                            </span>
                                        )}
                                    </span>
                                ),
                                h1: ({ node, ...props }) => <h1 {...props} className="text-3xl font-bold text-white mt-12 mb-6" />,
                                h2: ({ node, ...props }) => <h2 {...props} className="text-2xl font-bold text-white mt-10 mb-5" />,
                                h3: ({ node, ...props }) => <h3 {...props} className="text-xl font-bold text-[var(--color-primary)] mt-8 mb-4" />,
                                ul: ({ node, ...props }) => <ul {...props} className="list-disc list-outside ml-6 space-y-2 mb-6" />,
                                ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-outside ml-6 space-y-2 mb-6" />,
                                blockquote: ({ node, ...props }) => (
                                    <blockquote {...props} className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-text-primary)] my-6 bg-[var(--color-bg-secondary)] py-2 pr-2 rounded-r" />
                                ),
                            }}
                        >
                            {content.body}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ArticleDetail;
