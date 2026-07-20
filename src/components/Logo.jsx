import React from 'react';

export default function Logo({
  variant = 'horizontal',
  transparent = true,
  className = "h-9 md:h-11 w-auto"
}) {
  const imageSrc = variant === 'square' ? '/logo-square.png' : '/logo-horizontal.png';

  return (
    <div className={`inline-flex items-center select-none group cursor-pointer ${className}`}>
      <img
        src={imageSrc}
        alt="ZENO-SKY Aerospace & Defence"
        className={`h-full w-auto object-contain transition ${
          transparent ? 'mix-blend-screen' : 'bg-black p-1 rounded-lg'
        } filter drop-shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]`}
      />
    </div>
  );
}
