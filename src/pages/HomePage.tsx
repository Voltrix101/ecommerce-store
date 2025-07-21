import React from 'react';
import { ImageCarousel } from '@/components/ImageCarousel';
import { ContentSection } from '@/components/ContentSection';
import { products } from '@/data/mockData';

export function HomePage() {
  return (
    <div>
      <ImageCarousel />
      <ContentSection
        title="Curated Desires"
        products={products.slice(0, 4)}
      />
      <ContentSection
        title="This Week’s Obsessions"
        products={products.slice(4, 8)}
      />
      <ContentSection
        title="Luxe Essentials"
        products={products.slice(8, 12)}
      />
    </div>
  );
}