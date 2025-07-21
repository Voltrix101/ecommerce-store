import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/data/mockData';
import { ImageGallery } from '@/components/ImageGallery';
import { VariantSelector } from '@/components/VariantSelector';
import { FloatingAddToCart } from '@/components/FloatingAddToCart';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>({});

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleVariantChange = (type: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: option }));
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <ImageGallery images={product.images} />
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {product.variants && (
              <VariantSelector
                variants={product.variants}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
              />
            )}
          </div>
        </div>
      </div>
      <FloatingAddToCart product={product} />
    </>
  );
}