"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="z-10 flex fixed bottom-5 sm:top sm:bottom-auto rounded-full bg-blue-400 bg-opacity-40 items-center p-2 active:animate-ping duration-300"
    >
      <Image
        src={"/assets/icons/backButton.svg"}
        width={36}
        height={36}
        quality={45}
        alt="Ir atrás"
      />
    </button>
  );
};
