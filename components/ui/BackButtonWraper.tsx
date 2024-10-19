import { PropsWithChildren } from "react";
import { BackButton } from "./buttons/BackButton";

export default function BackButtonWrapper({ children }: PropsWithChildren) {
  return (
    <>
      <BackButton />
      <div className="mt-16 inline">{children}</div>
    </>
  );
}
