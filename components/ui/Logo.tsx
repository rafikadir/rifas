import Image from "next/image";

export function HeaderLogo() {
  return (
    <Image
      src="https://res.cloudinary.com/djhyhtage/image/upload/v1729038482/m9h0esm4vktippzfzp88.webp"
      className="w-20 absolute top-0 md:left-0 right-1/2 translate-x-1/2 md:translate-x-[10%]"
      alt="Logotipo Rifas El Magnate"
      width={168}
      height={170}
    />
  );
}

export function Logo() {
  return (
    <Image
      src="https://res.cloudinary.com/djhyhtage/image/upload/v1729038482/m9h0esm4vktippzfzp88.webp"
      className="w-20"
      alt="Logotipo Rifas El Magnate"
      width={168}
      height={170}
    />
  );
}
