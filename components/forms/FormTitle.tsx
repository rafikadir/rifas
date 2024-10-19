import { PropsWithChildren } from "react";

export const FormTitle = ({ children }: PropsWithChildren) => {
	return <h1 className="text-2xl uppercase font-semibold mb-4">{children}</h1>;
};
