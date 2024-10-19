"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { boletoStatus, IBoleto } from "@/src/interfaces/boletos";
import type { IPublicRifaModel } from "@/src/interfaces/rifas";
import { useStore } from "@/src/utils/store";
import { generateRandomTickets } from "@/src/utils/boletosHelpers";

type Props = {
	rifa: IPublicRifaModel;
};

export const GeneradorDeBoletos = ({ rifa }: Props) => {
	const { order, addToCart } = useStore((state) => ({
		order: state.order[rifa.serie],
		addToCart: state.addToCart,
	}));
	const seleccionTotal = order?.boletosApartados.length || 0;
	const rifaOcupados = Object.values(rifa.boletos).filter(
		(boleto: IBoleto) => boleto.estado !== boletoStatus.DISPONIBLE
	).length;
	const boletosDisponibles = rifa.ticketsTotal - rifaOcupados - seleccionTotal;

	const opciones = [1, 2, 3, 5, 11, 22, 33, 55, 100];
	const [showMessage, setShowMessage] = useState<boolean>(false);
	const [ticketsToGenerate, setTicketsToGenerate] = useState<number>(
		opciones[0]
	);
	const [randomTickets, setRandomTickets] = useState<number[]>([]);
	// const [confirmationButtonIsLoading, setConfirmationButtonIsLoading] =
	// 	useState<boolean>(false);
	// const [generateButtonIsLoading, setGenerateButtonIsLoading] =
	//   useState<boolean>(false);

	const handleGenerateTickets = (
		totalTicktesToGenerate: number,
		disponiblesTotal: number
	) => {
		if (totalTicktesToGenerate > disponiblesTotal) {
			toast.info("No hay suficientes boletos. Elige una cantidad menor.");
		} else {
			const boletos = generateRandomTickets(
				totalTicktesToGenerate,
				rifa.boletos as Map<string, IBoleto>,
				rifa.ticketsTotal,
				order
			);
			setRandomTickets(boletos);
			setShowMessage(true);
		}
	};

	const handleConfirmRandomTickets = () => {
		addToCart(rifa, randomTickets);
		setShowMessage(false);
		setRandomTickets([]);
		toast.success(
			`Se añadi${randomTickets.length === 1 ? "ó" : "eron"} ${
				randomTickets.length
			} boleto${randomTickets.length === 1 ? "" : "s"} al carrito`
		);
	};

	return (
		<div>
			{/* MODAL TRIGGER */}
			<label
				htmlFor="tw-modal"
				className="cursor-pointer w-72 rounded-lg p-4 text-light bg-gradient-to-r from-sky-950 to-sky-600 flex items-center justify-center mx-auto hover:text-sm hover:animate-pulse transition-all duration-300"
			>
				<Image
					src="/assets/icons/dice.svg"
					alt="Dados"
					width={24}
					height={24}
					className="mr-2"
				/>
				Generar boletos aleatorios
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
					<select
						value={ticketsToGenerate}
						className="w-full py-4 px-2  rounded-lg mb-4"
						onChange={(e) => setTicketsToGenerate(+e.target.value)}
					>
						{opciones.map((label) => (
							<option key={label} value={label}>
								{JSON.stringify(label)}
							</option>
						))}
					</select>
					{showMessage && (
						<p className="mb-4 p-2 border-blue-50">
							Estos son tus {ticketsToGenerate} boletos:{" "}
							{randomTickets.join(", ")}
						</p>
					)}
					<button
						type="submit"
						form="generator"
						className="p-2 m-1 bg-blue-500 hover:bg-blue-600 text-light rounded-lg transition duration-200"
						onClick={() =>
							handleGenerateTickets(ticketsToGenerate, boletosDisponibles)
						}
					>
						{randomTickets.length === 0 ? "Generar" : "De nuevo"}
					</button>

					{randomTickets.length > 0 && (
						<button
							type="submit"
							form="generator"
							className="p-2 m-1 bg-orange-500 hover:bg-orange-600 text-light rounded-lg transition duration-200"
							onClick={handleConfirmRandomTickets}
						>
							¡Los quiero!
						</button>
					)}
				</label>
			</label>
		</div>
	);
};
