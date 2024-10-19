"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="p-2 w-full bg-blue-500 text-white rounded-md"
		>
			{pending ? "Guardando..." : "Guardar"}
		</button>
	);
}
