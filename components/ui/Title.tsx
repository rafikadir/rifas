import { PropsWithChildren } from "react";

type TitleProps = PropsWithChildren & {
  padding?: string;
  margin?: string;
  position?: string;
};

export const Title = ({ children, padding="p-2", margin="my-2" }: TitleProps) => {
  return <h1 className={`${margin} ${padding} text-center text-2xl md:text-3xl font-bold `}>{children}</h1>;
};

export const Subtitle = ({ children, position="text-left" }: TitleProps) => {
  return <p className={`${position} my-2 p-1 text-xl md:text-2xl font-semibold`}>{children}</p>;
};
