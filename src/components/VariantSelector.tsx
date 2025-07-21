import React from 'react';

interface VariantSelectorProps {
  variants: {
    type: string;
    options: string[];
  }[];
  selectedVariants: { [key: string]: string };
  onVariantChange: (type: string, option: string) => void;
}

export function VariantSelector({
  variants,
  selectedVariants,
  onVariantChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.type}>
          <h4 className="font-semibold mb-2">{variant.type}</h4>
          <div className="flex gap-2">
            {variant.options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 border rounded-lg ${
                  selectedVariants[variant.type] === option
                    ? 'border-primary ring-2 ring-primary'
                    : 'border-border'
                }`}
                onClick={() => onVariantChange(variant.type, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}