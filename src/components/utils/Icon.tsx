"use client";
import { FC } from "react";

interface IconProps {
  src?: string;
  alt: string;
  className?: string;
  color?: string; 
  clickFunction?:()=>void
}

const Icon: FC<IconProps> = ({
  alt,
  src = "/icons/icon-192x192.png",
  className = "",
  clickFunction
}) => {
  const isSvg = src.endsWith(".svg") || src.startsWith("data:image/svg+xml");

  if (isSvg) {
    return (
      <div
      onClick={clickFunction}
        className={`w-5 h-5 inline-block   ${className}`}
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
    onClick={clickFunction}
      src={`${src}`}
      alt={alt}
      className={`w-5 h-5 ${className}`}
      width={20}
      height={20}
    />
  );
};

export default Icon;
