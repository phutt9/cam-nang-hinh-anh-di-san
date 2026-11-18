import { useState } from 'react';
import { Landmark } from 'lucide-react';

interface ArchivalImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ArchivalImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Tư liệu di sản văn hóa',
}: ArchivalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EBE6DF] text-[#57534E] p-6 text-center border border-stone-200 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Landmark className="w-8 h-8 text-[#78350F] mb-2 stroke-[1.5]" />
        <p className="font-serif text-sm font-medium text-[#1C1917]">{fallbackTitle}</p>
        <p className="text-xs text-[#78716C] mt-1">Hình ảnh minh họa tư liệu</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
