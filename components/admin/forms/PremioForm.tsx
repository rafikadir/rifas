import Image from "next/image";
import { useState } from "react";

import { IPremio } from "@/src/interfaces/premios";
import {
	MAX_LENGTH_DESCRIPTION,
	MAX_LENGTH_TITLE,
} from "@/src/lib/validators/createErrorsMessages";
import { handleFormChangeEventType } from "./RifaForm";
import { ImageUpload } from "../rifas/ImageUpload";

interface Props {
	prizes: IPremio[];
	setFormHandler: (data: unknown) => void;
	handleChange: (e: handleFormChangeEventType) => void;
}

// export const ImageButton = ({
// 	form = "",
// 	src,
// 	desc,
// 	handler,
// 	width = 42,
// 	height = 42,
// }: {
// 	form?: string;
// 	src: string;
// 	desc: string;
// 	handler: MouseEventHandler<HTMLButtonElement>;
// 	width?: number;
// 	height?: number;
// }) => {
// 	return (
// 		<div className="mt-2">
// 			<button onClick={handler} form={form}>
// 				<Image src={src} width={width} height={height} alt={desc} />
// 			</button>
// 		</div>
// 	);
// };

const PrizesListForm = ({ prizes, handleChange, setFormHandler }: Props) => {
	const [deletedPrize, setDeletedPrize] = useState<number | null>(null);

	const addPrize = () => {
		const emptyPrize: IPremio = {
			title: "",
			description: "",
			url: "",
		};
		setFormHandler({ prizes: [...prizes, emptyPrize] });
	};

	const deletePrize = (index: number) => {
		setDeletedPrize(index);
		setTimeout(() => {
			const updatedPrizes = prizes.filter((_, i) => i !== index);
			setFormHandler({ prizes: updatedPrizes });
			setDeletedPrize(null);
		}, 300); // Tiempo de la animación
	};

	const deleteButton = (key: number) =>
		prizes.length > 1 && (
			<div className="w-full text-center">
				<button onClick={() => deletePrize(key)} form="_">
					<Image
						src={"/assets/icons/trash.svg"}
						width={28}
						height={28}
						alt={"eliminar"}
					/>
				</button>
			</div>
		);

	return (
		<div className={`${prizes.length > 1 && "mb-8"}`}>
			{prizes.map((prize, index) => (
				<div
					key={index}
					className={`transition-all duration-300 ease-in-out ${
						deletedPrize === index ? "opacity-0 -translate-y-6" : "opacity-100"
					}`}
				>
					<PrizeFormFields
						index={index}
						prize={prize}
						handleChange={handleChange}
					/>
					{deleteButton(index)}
				</div>
			))}
			<div className="mt-2 text-center">
				<button onClick={addPrize} form="">
					<Image
						className="bg-primary rounded-xl hover:bg-secondary"
						src={"/assets/icons/add.svg"}
						width={38}
						height={38}
						alt="agregar premio"
					/>
				</button>
			</div>
		</div>
	);
};

export const PrizeFormFields = ({
	index,
	prize,
	handleChange,
}: {
	index: number;
	prize: IPremio;
	handleChange: (e: handleFormChangeEventType) => void;
}) => {
	const idPrefix = `prizes.${index}`;

	return (
		<div className="max-w-64 mx-auto my-2 space-y-2 transition-all">
			<label
				htmlFor={`${idPrefix}.title`}
				className="text-sm block font-medium text-gray-700"
			>
				Título {`${MAX_LENGTH_TITLE}/`}
				<span
					className={prize.title.length < 3 ? "text-red-600" : ""}
				>{`${prize.title.length}`}</span>
			</label>
			<input
				className="mt-1.5 p-2 w-full border border-gray-400 rounded-md"
				type="text"
				id={`${idPrefix}.title`}
				name={`${idPrefix}.title`}
				value={prize.title}
				maxLength={MAX_LENGTH_TITLE}
				onChange={handleChange}
				required
			/>

			<label
				htmlFor={`${idPrefix}.description`}
				className="text-sm block font-medium text-gray-700"
			>
				Descripción {`${MAX_LENGTH_DESCRIPTION}/`}
				<span
					className={prize.description.length < 3 ? "text-red-600" : ""}
				>{`${prize.description.length}`}</span>
			</label>
			<textarea
				id={`${idPrefix}.description`}
				name={`${idPrefix}.description`}
				className="mt-1.5 p-2 w-full h-auto border border-gray-400 rounded-md resize-y"
				maxLength={MAX_LENGTH_DESCRIPTION}
				value={prize.description}
				onChange={handleChange}
				required
			/>

			<ImageUpload
				inputName={`${idPrefix}.url`}
				handleChange={handleChange}
				formValue={prize.url}
			/>
		</div>
	);
};

export default PrizesListForm;
