import frontMatter from 'front-matter';

export interface ContentAttributes {
    title: string;
    description: string;
    tags: string[];
    date: string;
}

export interface ContentItem extends ContentAttributes {
    slug: string;
    body: string;
}

export const loadContent = async (category: 'product' | 'ai' | 'entrepreneurship'): Promise<ContentItem[]> => {
    let modules;

    // Vite's import.meta.glob must take string literals, so we switch
    switch (category) {
        case 'product':
            modules = import.meta.glob('../content/product/*.md', { query: '?raw', import: 'default' });
            break;
        case 'ai':
            modules = import.meta.glob('../content/ai/*.md', { query: '?raw', import: 'default' });
            break;
        case 'entrepreneurship':
            modules = import.meta.glob('../content/entrepreneurship/*.md', { query: '?raw', import: 'default' });
            break;
        default:
            return [];
    }

    const contentPromises = Object.entries(modules).map(async ([path, loader]) => {
        const markdown = await loader() as string;
        const result = frontMatter<ContentAttributes>(markdown);
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        return {
            slug,
            ...result.attributes,
            body: result.body
        };
    });

    return Promise.all(contentPromises);
};
