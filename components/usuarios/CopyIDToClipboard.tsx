"use client";
import Image from "next/image";
import { toast } from "react-toastify";

export const CopyIDToClipboard = ({ userId }: { userId: string }) => {
	const copyToClipboard = () => {
		const userIdInput = document.getElementById(userId);
		if (userIdInput) {
			navigator.clipboard
				.writeText(userIdInput.innerText)
				.then(() => {
					toast.success("ID copiado al portapapeles");
				})
				.catch(() => {
					toast.error("Error al copiar el ID");
				});
		} else {
			toast.error("No hay ID para copiar");
		}
	};

	return (
		<td className="text-center flex flex-wrap items-center justify-around">
			<span id={userId}>{userId}</span>
			<Image
				className="ml-1 rounded p-1 cursor-pointer hover:bg-gray-400"
				alt=":icono:copiar"
				src={"/assets/icons/clipboard.svg"}
				onClick={copyToClipboard}
				width={24}
				height={24}
			/>
		</td>
	);
};
