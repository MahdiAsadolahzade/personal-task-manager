'use client'
import { FC } from "react";

interface IconProps {
  src?: string;
  alt: string;
  className?: string;
  color?: string; // Tailwind class like "text-red-500"
}

const Icon: FC<IconProps> = ({
  alt,
  src = "/icons/icon-192x192.png",
  className = "",
}) => {
  const isSvg = src.endsWith(".svg");

  if (isSvg) {
    return (
      <div
        className={`w-5 h-5 inline-block text-foreground  ${className}`}
        style={{
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          backgroundColor: "currentColor",
        }}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={`${src}`}
      alt={alt}
      className={`w-5 h-5 ${className}`}
      width={20}
      height={20}
    />
  );
};

export default Icon;
