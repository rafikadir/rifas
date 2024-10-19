"use client";
import { deleteRifaById } from "@/actions/vendedor/deleteRifaById";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const DeleteRifaButton = ({
	id,
	estado,
}: {
	id: string;
	estado: string;
}) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleDelete = async (id: string) => {
		setLoading(true);
		try {
			const response = await deleteRifaById(id, estado);
			if (!response.success) {
				response.errors?.forEach((issue) => {
					toast.error(issue.message);
				});
				return;
			}
			toast.success("rifa eliminada");
			router.back();
		} catch (error) {
			toast.error("Ocurrió un problema al eliminar la rifa.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<button
			className="py-1 px-2 rounded text-light bg-red-600 hover:bg-red-700 disabled:bg-opacity-60"
			onClick={() => handleDelete(id)}
			disabled={loading}
		>
			Eliminar
		</button>
	);
};
