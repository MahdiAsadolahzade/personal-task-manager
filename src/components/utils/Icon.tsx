import { FC } from "react";
import Image from "next/image";
interface IconProps {
  src: string;
  alt: string;
  className?: string;
}

const Icon: FC<IconProps> = ({ alt, src, className }) => {
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`w-5 h-5 ${className} `}
        width={20}
        height={20}
      />
    </>
  );
};

export default Icon;
