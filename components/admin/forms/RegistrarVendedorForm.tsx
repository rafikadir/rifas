"use client";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { ZodError } from "zod";
import { toast } from "react-toastify";

import { registrarNuevoVendedor } from "@/actions/admin/createVendedorAction";
import {
	createAdminZodSchema,
} from "@/src/lib/validators/usuario";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { Button } from "../../ui/buttons/Buttons";

const ShowDbZodErrors = (
	response: ReturnedActionType,
	setIsLoading: (value: SetStateAction<boolean>) => void
) => {
	if (response.errors instanceof ZodError) {
		response.errors.issues.forEach((issue) => {
			toast.error(issue.message);
		});
	} else {
		response.errors?.forEach((issue) => {
			toast.error(issue.message);
		});
	}
	setIsLoading(false);
};

const showFrontZodErrors = (
	error: ZodError,
) => {
	error.issues.forEach((issue) => {
		toast.error(issue.message);
	});
};

export const RegistrarVendedorForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleFormAction = async (formData: FormData) => {
		const userID = formData.get("userID")?.toString();
		setIsLoading(true);
		try {
			const validatedFields = createAdminZodSchema.safeParse({ userID });
			if (!validatedFields.success) {
				showFrontZodErrors(validatedFields.error);
				return;
			}
			const response = await registrarNuevoVendedor(validatedFields.data.userID);
			if (response.errors) {
				ShowDbZodErrors(response, setIsLoading);
				return;
			}
			if (response.success) {
				toast.success("Nuevo vendedor añadido");
			}
			
		} catch (error) {
			toast.error("Ocurrió un error al registrar vendedor.")
		} finally {
			setIsLoading(false);
			const input = document.getElementById("userID") as HTMLInputElement;
			if(input) input.value = ""
		}
	};

	return (
		<div>
			{/* MODAL TRIGGER */}
			<label
				htmlFor="tw-modal"
				className="cursor-pointer w-44 text-sm rounded-full py-2 px-4 text-light bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center mx-auto hover:text-sm hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-all duration-300 text-center"
			>
				<Image
					src="/assets/icons/userGroup.svg"
					alt=":icono:Grupo de usuarios"
					width={24}
					height={24}
					className="mr-2"
				/>
				Añadir vendedor
			</label>
			{/* TOGGLER */}
			<input
				type="checkbox"
				name="tw-modal"
				id="tw-modal"
				className="peer fixed appearance-none opacity-0"
			/>
			{/* MODAL CONTENT */}
			<label
				htmlFor="tw-modal"
				className="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center justify-center overflow-hidden overscroll-contain bg-dark bg-opacity-80 opacity-0 transition-all duration-200 ease-in-out peer-checked:pointer-events-auto peer-checked:visible peer-checked:opacity-100 peer-checked:[&>*]:translate-y-0 peer-checked:[&>*]:scale-100"
			>
				{/* MODAL BOX */}
				<label className="max-h-[calc(100vh-5em)] h-fit w-72 scale-90 overflow-y-auto overscroll-contain rounded-md bg-white p-6 text-dark shadow-2xl transition">
					{/* CONTENT HERE */}
					<form action={handleFormAction} className="space-y-1.5">
						<label
							htmlFor="userID"
							className="text-sm block font-medium text-gray-700"
						>
							ID de usuario
						</label>
						<input
							type="text"
							name="userID"
							id="userID"
							defaultValue={""}
							className="p-2 w-full border border-gray-300 rounded-md"
						/>
						<Button text="Guardar" type="submit" loadingText="Guardando..." isLoading={isLoading} />
					</form>
				</label>
			</label>
		</div>
	);
};

