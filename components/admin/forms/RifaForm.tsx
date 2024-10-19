"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
	IRifaForm,
	RifaStatusFormType,
	rifaStatusForm,
} from "@/src/interfaces/rifas";
import { IPremio } from "@/src/interfaces/premios";

import { createRifa } from "@/actions/admin/rifas/createRifaAction";
import { rifaZodSchema, RifaZodSchemaType } from "@/src/lib/validators/rifa";
import {
	MAX_LENGTH_DESCRIPTION,
	MAX_LENGTH_TITLE,
} from "@/src/lib/validators/createErrorsMessages";

import { JSONDataParser } from "@/src/utils/parsers";
import { getDateNow, getDatePlus15Minutes } from "@/src/utils/Dates";
import PrizesListForm from "./PremioForm";
import { ImageUpload } from "../rifas/ImageUpload";
import { Button } from "../../ui/buttons/Buttons";
import { FormTitle } from "../../forms/FormTitle";
import { ZodError } from "zod";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { updateRifa } from "@/actions/admin/rifas/updateRifaAction";

type Props = {
	formId: string;
	vendedorId: string;
	rifaForm: IRifaForm;
	rifaPublicId?: string;
	isNewForm?: boolean;
};

export type handleFormChangeEventType = React.ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const ShowDbZodErrors = (response: ReturnedActionType) => {
	if (response.errors instanceof ZodError) {
		response.errors.issues.forEach((issue) => {
			toast.error(issue.message);
		});
	} else {
		response.errors?.forEach((issue) => {
			toast.error(issue.message);
		});
	}
};

const showFrontZodErrors = (error: ZodError) => {
	error.issues.forEach((issue) => {
		toast.error(issue.message);
	});
};

const RifaForm = ({
	formId,
	rifaForm,
	rifaPublicId,
	vendedorId,
	isNewForm = true,
}: Props) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState<IRifaForm>(rifaForm);

	const rifaStatusIsActive = form.estado === rifaStatusForm.ACTIVA;
	const rifaStatusIsHidden = form.estado === rifaStatusForm.OCULTA;
	const [formattedStartDate, setFormattedStartDate] = useState("");
	const [formattedEndDate, setFormattedEndDate] = useState("");

	useEffect(() => {
		if (form.startDate) {
			setFormattedStartDate(new Date(form.startDate).toLocaleString());
		}
		if (form.endDate) {
			setFormattedEndDate(new Date(form.endDate).toLocaleString());
		}
	}, [form.startDate, form.endDate]);

	const setFormHandler = (data: unknown) => {
		setForm((prevForm) => ({ ...prevForm, ...(data as object) }));
	};

	const putData = async (putDataForm: RifaZodSchemaType) => {
		setIsLoading(true);
		const validatedFields = rifaZodSchema.safeParse(putDataForm);
		if (!validatedFields.success) {
			showFrontZodErrors(validatedFields.error);
			return;
		}
		try {
			const response = await updateRifa(
				rifaPublicId!,
				JSONDataParser(validatedFields.data)
			);
			if (response.errors) {
				ShowDbZodErrors(response);
				return;
			}
			toast.success("Rifa actualizada");
			router.back();
		} catch (error) {
			toast.error("Ocurrió un error al actualizar la rifa.");
		} finally {
			setIsLoading(false);
		}
	};

	const postData = async (postDataForm: RifaZodSchemaType) => {
		setIsLoading(true);
		// validations front
		const validatedFields = rifaZodSchema.safeParse(postDataForm);
		if (!validatedFields.success) {
			validatedFields.error?.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			setIsLoading(false);
			return;
		}

		try {
			const response = await createRifa(JSONDataParser(validatedFields.data));
			if (response.errors) {
				response.errors?.forEach((issue: { message: string }) => {
					toast.error(issue.message);
				});
				return;
			}
			toast.success("Rifa creada");
			setForm(rifaForm);
			if (response.details) {
				router.push(response.details);
			}
		} catch (error) {
			toast.error(`Ocurrió un error al crear la rifa.`);
		} finally {
			setIsLoading(false);
		}
	};

	function mapFormDataToPrizesMap(formData: FormData): IPremio[] {
		const mappedPrizes: Record<number, Partial<IPremio>> = {};

		for (const [key, value] of Array.from(formData.entries())) {
			if (key.startsWith("prizes.")) {
				const [, indexString, field] = key.split(".");
				const index = Number(indexString);

				if (!mappedPrizes[index]) {
					mappedPrizes[index] = {};
				}
				if (field === "url" || field === "description" || field === "title") {
					mappedPrizes[index][field] = value.toString();
				}
			}
		}
		return Object.values(mappedPrizes) as IPremio[]; // Array de premios
	}

	function preprocessFormData(formData: FormData): RifaZodSchemaType {
		const prizes = mapFormDataToPrizesMap(formData);

		const getFormDate = (date: string, type?: string) => {
			if (rifaStatusIsActive && type === "start") {
				return getDatePlus15Minutes().toISOString();
			}
			if (date === "null") {
				return null;
			}
			return date;
		};

		const rifaFormData: IRifaForm = {
			title: String(formData.get("title")),
			description: String(formData.get("description")),
			ticketsTotal: Number(formData.get("ticketsTotal")),
			price: Number(formData.get("price")),
			imageUrl: String(formData.get("imageUrl")),
			startDate: getFormDate(String(formData.get("startDate")), "start"),
			endDate: getFormDate(String(formData.get("endDate"))),
			estado: String(formData.get("estado")) as RifaStatusFormType,
			prizes,
			vendedorId,
		};
		return rifaFormData;
	}

	const handleForm = (formData: FormData) => {
		const processedFormData = preprocessFormData(formData);
		isNewForm ? postData(processedFormData) : putData(processedFormData);
	};

	const handleChange = (e: handleFormChangeEventType) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		if (name.startsWith("prizes")) {
			// 1. El campo es un premio si: name.startsWith(prizes)
			// 2. Obtener el indice y el campo del premio
			const [, index, field] = name.split("."); // name = prizes.indice.campo
			const updatedPrizes = [...form.prizes];
			// 3. Actualizar el campo del premio
			updatedPrizes[Number(index)] = {
				...updatedPrizes[Number(index)],
				[field]: value,
			};
			// 4. Actualizar estado de la nueva rifa
			setFormHandler({ prizes: updatedPrizes });
			return;
		} else if (name.startsWith("estado")) {
			if (value === rifaStatusForm.ACTIVA) {
				const newStartDate = getDatePlus15Minutes().toISOString();
				setFormHandler({
					startDate: newStartDate,
					estado: rifaStatusForm.ACTIVA,
				});
				return;
			} else if (value === rifaStatusForm.OCULTA) {
				setFormHandler({
					startDate: "",
					endDate: "",
					estado: rifaStatusForm.OCULTA,
				});
				return;
			}
			setFormHandler({ [`${name}`]: value });
		} else {
			setFormHandler({ [`${name}`]: value });
		}
	};

	return (
		<div className="max-w-xl mx-auto shadow-md p-4 pt-6 mb-4 bg-white rounded-lg">
			<form
				id={formId}
				action={handleForm}
				className="space-y-2 flex flex-col *:border-gray-300"
			>
				{isNewForm ? (
					<FormTitle>Nueva rifa</FormTitle>
				) : (
					<FormTitle>Editar: {rifaForm.title}</FormTitle>
				)}
				<label
					htmlFor="title"
					className="text-sm block font-medium text-gray-700"
				>
					Título {`${MAX_LENGTH_TITLE}/`}
					<span
						className={form.title.length < 3 ? "text-red-600" : ""}
					>{`${form.title.length}`}</span>
				</label>
				<input
					type="text"
					id="title"
					name="title"
					className="p-2 w-full border rounded-md"
					maxLength={MAX_LENGTH_TITLE}
					value={form.title}
					onChange={handleChange}
					required
				/>
				<label
					htmlFor="description"
					className=" text-sm block font-medium text-gray-700"
				>
					Descripción {`${MAX_LENGTH_DESCRIPTION}/`}
					<span
						className={form.description.length < 3 ? "text-red-600" : ""}
					>{`${form.description.length}`}</span>
				</label>
				<textarea
					id="description"
					name="description"
					className="p-2 w-full h-auto border rounded-md resize-y"
					maxLength={MAX_LENGTH_DESCRIPTION}
					value={form.description}
					onChange={handleChange}
					required
				/>
				<label
					htmlFor="ticketsTotal"
					className=" text-sm block font-medium text-gray-700"
				>
					Número de boletos
				</label>
				<input
					type="number"
					id="ticketsTotal"
					name="ticketsTotal"
					className="p-2 w-full border rounded-md"
					value={form.ticketsTotal ? form.ticketsTotal : ""}
					onChange={handleChange}
					required
					placeholder="000000"
					min={1}
					max={60000}
				/>

				<label
					htmlFor="price"
					className=" text-sm block font-medium text-gray-700"
				>
					Precio
				</label>
				<div className="relative">
					<div className="text-gray-500 sm:text-sm pointer-events-none absolute inset-y-[16px] left-0 flex items-center pl-3 enter">
						$
					</div>
					<input
						type="number"
						id="price"
						name="price"
						className="p-2 block w-full border border-gray-400 rounded-md pl-7"
						value={form.price ? form.price : ""}
						onChange={handleChange}
						min={1}
						placeholder="0.00"
						required
					/>
				</div>

				<label
					htmlFor="estado"
					className="text-sm block font-medium text-gray-700"
				>
					Estado inicial de la rifa
				</label>
				<select
					id="estado"
					name="estado"
					required
					value={form.estado}
					onChange={handleChange}
					className="p-2 bg-gray-200 block w-full rounded-md"
				>
					{Object.keys(rifaStatusForm).map((key) => (
						<option
							key={key}
							value={rifaStatusForm[key as keyof typeof rifaStatusForm]}
						>
							{rifaStatusForm[key as keyof typeof rifaStatusForm]}
						</option>
					))}
				</select>

				<label
					htmlFor="startDate"
					className="text-sm block font-medium text-gray-700"
				>
					Fecha de inicio{" "}
				</label>
				{form.startDate && (
					<span className="text-xs text-gray-400">({formattedStartDate})</span>
				)}
				<input
					type="datetime-local"
					min={getDateNow().toISOString()}
					id="startDate"
					name="startDate"
					disabled={rifaStatusIsHidden || rifaStatusIsActive}
					className="p-2 w-full border rounded-md disabled:opacity-30"
					defaultValue={form.startDate || ""}
					onChange={handleChange}
				/>

				<label
					htmlFor="endDate"
					className="text-sm block font-medium text-gray-700"
				>
					Fecha de fin{" "}
				</label>
				{form.endDate && (
					<span className="text-xs text-gray-400">({formattedEndDate})</span>
				)}
				<input
					type="datetime-local"
					min={getDateNow().toISOString()}
					disabled={rifaStatusIsHidden}
					className="p-2 w-full border rounded-md disabled:opacity-30"
					id="endDate"
					name="endDate"
					defaultValue={form.endDate || ""}
					onChange={handleChange}
				/>

				<label
					htmlFor="imageUrl"
					className="text-sm block font-medium text-gray-700"
				>
					Imagen principal
				</label>
				{/* <input type="file" name="imageFile" id="mainImageFile" /> */}
				<ImageUpload
					inputName="imageUrl"
					handleChange={handleChange}
					formValue={form.imageUrl}
				/>

				<label className="pt-2 block text-lg font-bold text-gray-700">
					Premios
				</label>
				<div className="pt-0">
					<PrizesListForm
						prizes={form.prizes}
						setFormHandler={setFormHandler}
						handleChange={handleChange}
					/>
				</div>
				{/* SUBMIT */}
				<Button
					type="submit"
					text={isNewForm ? "Guardar" : "Guardar cambios"}
					loadingText="Guardando..."
					isLoading={isLoading}
					textColor="light"
				/>
			</form>
		</div>
	);
};

export default RifaForm;
