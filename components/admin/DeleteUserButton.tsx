"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { deleteUserById } from "@/actions/users";
import { DB_ERROR } from "@/src/interfaces/responses";

interface DeleteButtonProps {
	userId: string;
}

export default function DeleteUserButton({ userId }: DeleteButtonProps) {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		try {
			const result = await deleteUserById(userId);

			if (!result.success) {
				toast.error("Hubo un problema al eliminar el usuario.");
			} else toast.success("Usuario eliminado correctamente.");
		} catch (error) {
			toast.error(DB_ERROR.MONGO_CONNECTION_ERROR);
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			className="px-2 py-1 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none"
			onClick={handleDelete}
			aria-disabled={loading}
		>
			{loading ? "Eliminando..." : "Eliminar"}
		</button>
	);
}
