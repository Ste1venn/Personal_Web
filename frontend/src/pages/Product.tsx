import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { loadContent, type ContentItem } from '../utils/contentLoader';

const Product: React.FC = () => {
  const [products, setProducts] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await loadContent('product');
      setProducts(data);
    };
    fetchContent();
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Product Portfolio</h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl">
          A collection of digital products I've managed, designed, and launched. Focusing on user-centric problems and scalable solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item, index) => (
          <Card key={index} {...item} delay={index * 0.1} category="product" />
        ))}
      </div>
    </div>
  );
};

export default Product;
