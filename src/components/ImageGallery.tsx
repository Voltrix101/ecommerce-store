import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`thumbnail-${index}`}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
              mainImage === image ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
      <motion.div
        className="relative w-full h-96 overflow-hidden rounded-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={mainImage}
          alt="main-product"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}