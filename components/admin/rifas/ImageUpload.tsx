"use client";
import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import {
	MAX_SIZE_IMAGE_FILE,
} from "@/src/lib/validators/createErrorsMessages";
import { ImagenExtLegend } from "@/components/forms/ImagenExtLegend";
import { handleFormChangeEventType } from "../forms/RifaForm";
import { toast } from "react-toastify";

export const ImageUpload = ({
	inputName,
	handleChange,
	formValue,
}: {
	inputName: string;
	formValue: string;
	handleChange: (e: handleFormChangeEventType) => void;
}) => {
	const [imageUrl, setImageUrl] = useState("");

	return (
		<CldUploadWidget
			onSuccess={(result, { widget }) => {
				if (result.event === "success") {
					widget.close();
					// @ts-expect-error: result.info?.secure_url es un error de typeScript de Cloudinary
					setImageUrl(result.info?.secure_url);
				}
			}}
			uploadPreset={
				process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
			}
			options={{
				sources: ["local"],
				maxFileSize: MAX_SIZE_IMAGE_FILE,
				clientAllowedFormats: ["webp", "jpg", "png"],
			}}
			onError={() => toast.error("Error al subir la imagen. Intenta de nuevo")}
		>
			{({ open }) => (
				<>
					<div className="space-y-2">
						<ImagenExtLegend />

						<div
							className="relative cursor-pointer hover:opacity-70 transition p-10 border-gray-200 bg-gray-200 text-center rounded-xl"
							onClick={() => open()}
						>
							<Image
								alt="imagen"
								src={"/assets/icons/photo.svg"}
								className="mx-auto"
								width={48}
								height={48}
							/>
							<p className="text-lg font-semibold">Agregar imagen</p>
							{(imageUrl || formValue) && (
								<div className="absolute inset-0 w-full h-full">
									<Image
										fill
										style={{ objectFit: "contain" }}
										src={imageUrl || formValue}
										alt="Imagen de la rifa"
									/>
								</div>
							)}
						</div>
					</div>
					<input
						type="hidden"
						name={inputName}
						value={imageUrl || formValue}
						onChange={handleChange}
					/>
				</>
			)}
		</CldUploadWidget>
	);
};
