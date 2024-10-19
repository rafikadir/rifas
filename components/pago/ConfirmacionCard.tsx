"use client";
import Image from "next/image";
import { Subtitle, Title } from "../ui/Title";
import { formatCurrency } from "@/src/utils/parsers";
import Link from "next/link";
import { calculateTotal } from "../ui/carrito/Carrito";
import { useMemo, useState } from "react";
import { useStore } from "@/src/utils/store";
import { IUserModel } from "@/src/interfaces/users";
import { Logo } from "../ui/Logo";
import { toast } from "react-toastify";

type Props = {
	user: IUserModel;
};

const BlueHeader = ({ title }: { title: string }) => {
	return (
		<div className="font-bold uppercase text-center bg-primary p-2 rounded text-light">
			{title}
		</div>
	);
};

export default function ConfirmacionCard({ user }: Props) {
	const confirmedOrder = useStore((state) => state.confirmedOrder);
	const clearOrder = useStore((state) => state.clearOrder);
	const [loading, setLoading] = useState(false);

	const total = useMemo(() => calculateTotal(confirmedOrder), [confirmedOrder]);
	const initValue = 0;
	const sumaBoletos = Object.entries(confirmedOrder).reduce(
		(total, [, item]) => total + item.boletosApartados.length,
		initValue
	);

	const handleDescargarInstruccionesPago = () => {
		setLoading(true);
		const instrucciones = 
`Instrucciones de Pago:

Por favor, realiza una transferencia bancaria o depósito en cajero a la siguiente cuenta:

Transferencias y cajeros:
- Banco: Nombre del banco
- Nombre: Nombre del beneficiario
- CLABE: 123-456-000-789-321

Pago en Oxxo, 7Eleven, farmacias:
- Banco: Nombre del banco
- Nombre: Nombre del beneficiario
- CLABE: 123-456-000-789-321

Importante:
Para que tu pago sea válido, en "concepto de pago" escribe tu nombre.

Una vez hecho el pago, toma una foto del comprobante y súbelo en la sección de compras en tu perfil para finalizar tu compra.
Podrás revisar el estado de tu orden en tu perfil.

	🍀¡Mucha suerte!🍀
  		`;

		// Crear un blob con el texto
		const blob = new Blob([instrucciones], { type: "text/plain" });

		// Crear una URL para el blob
		const url = URL.createObjectURL(blob);

		// Crear un enlace para descargar el archivo
		const a = document.createElement("a");
		a.href = url;
		a.download = "instrucciones_pago.txt";

		// Simular un clic para iniciar la descarga
		a.click();

		// Liberar la URL creada
		URL.revokeObjectURL(url);
		setLoading(false);
		toast.success("Archivo descargado con éxito");
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-lg text-center">
			<Title>¡Compra confirmada!</Title>
			<p className="text-lg mb-8">
				Tus boletos han sido apartados exitosamente.
			</p>

			<div className="bg-white-100 p-4 rounded-lg shadow-md mb-4">
				<h2 className="text-2xl font-semibold mb-4">Detalles de compra</h2>
				<p className="text-center mb-2 font-bold text-xl">Cliente</p>
				<div className="text-left text-gray-500">
					<p>Nombre: {`${user.name}`}</p>
					<p>Email: {user.email}</p>
					<p>Teléfono: {user.phone_number || "-"}</p>
					<hr className="my-4 border-1 border-gray-400" />
				</div>

				<p className="text-center mb-2 font-bold text-xl">Orden</p>
				<div className="text-left font-semibold">
					Rifas: {Object.keys(confirmedOrder).length}
				</div>
				<div className="text-left font-semibold">Boletos: {sumaBoletos}</div>
				<ul className="text-left my-4">
					{Object.entries(confirmedOrder).map(([key, item]) => (
						<li key={key} className="mb-4">
							<p className="font-bold">{item.title}</p>
							<p>Serie: <b>{key}</b></p>
							<p>Números:<b>{" #"}{item.boletosApartados.join(", #")}</b></p>
							<p>
								Cantidad: <b>{item.boletosApartados.length} x{" "}
								{formatCurrency(item.price)}</b>
							</p>
							{item.boletosGratis[0] > 0 ? (
								<p>Gratis: <b>{item.boletosGratis[0]}{" "}{item.boletosGratis[0] > 1 ? "boletos":"boleto"}</b></p>
							) : null}
							<p className="font-bold">
								Subtotal: {formatCurrency(item.subtotal)}
							</p>
						</li>
					))}
				</ul>

				<div className="font-bold text-xl">
					Total a pagar: {formatCurrency(total)}
				</div>
			</div>

			<p className="text-sm mb-8">
				<span className="font-bold">Recuerda: </span>Tus boletos se apartarán
				durante 12 horas. Si no completas el pago en ese tiempo, los boletos
				serán liberados y se cancelará tu orden.
			</p>

			<div className="w-fit mx-auto mb-8">
				<Logo />
			</div>

			<div className="text-left mt-8 mb-4">
				<Subtitle>Instrucciones de Pago</Subtitle>

				<p className="mb-4">
					Por favor, realiza una transferencia bancaria o depósito en cajero a
					la siguiente cuenta:
				</p>

				<div className="mb-4">
					<BlueHeader title="Transferencias y cajeros" />
					<div className="p-4">
						<p className="font-bold mb-4">
							Banco: <span className="font-extrabold">Nombre del banco</span>
						</p>
						<p className="font-bold mb-4">
							Nombre:{" "}
							<span className="font-extrabold">Nombre del beneficiario</span>
						</p>
						<p className="font-bold mb-4">
							CLABE: <span className="font-extrabold">123-456-000-789-321</span>
						</p>
					</div>
				</div>

				<div className="mb-4">
					<BlueHeader title="Pago en oxxo, 7eleven, farmacias" />
					<div className="p-4">
						<p className="font-bold mb-4">
							Banco: <span className="font-extrabold">Nombre del banco</span>
						</p>
						<p className="font-bold mb-4">
							Nombre:{" "}
							<span className="font-extrabold">Nombre del beneficiario</span>
						</p>
						<p className="font-bold mb-4">
							CLABE: <span className="font-extrabold">123-456-000-789-321</span>
						</p>
					</div>
				</div>

				<p className="text-red mb-4 underline underline-offset-8 text-center">
					<span className="font-bold ">Importante: </span>Para que tu pago sea
					válido, en <span className="font-bold ">concepto de pago</span>{" "}
					escribe <span className="font-bold">tu nombre</span>
				</p>

				<p className="mb-4 text-center ring-1 ring-dark rounded p-2">
					Una vez hecho el pago,{" "}
					<span className="font-bold">
						toma una foto del comprobante y súbelo en la sección de compras en
						tu perfil
					</span>{" "}
					para finalizar tu compra. Podrás revisar el estado de tu orden en tu
					perfil.
					<br />
					🍀¡Mucha suerte!🍀
				</p>

				<button
					onClick={handleDescargarInstruccionesPago}
					disabled = {loading}
					aria-disabled = {loading}
					className="py-2 px-4 mt-8 flex justify-evenly bg-blue text-light rounded-lg font-bold hover:bg-blue-150 transition duration-200 disabled:bg-opacity-60"
				>
					<Image
						src={"/assets/icons/download.svg"}
						alt="icono:descargar:"
						width={24}
						height={24}
						className="mr-2"
					/>
					{loading? "Descargando...":"Descargar instrucciones"}
				</button>
			</div>

			<Link href="/compras/estado/pendiente">
				<p className="py-2 px-4 bg-green text-light hover:bg-opacity-30 rounded-lg font-bold hover:bg-green-600 transition duration-200">
					Ver en Mi Perfil
				</p>
			</Link>

			<button
				className="mx-auto mt-4 hover:bg-blue-600 hover:bg-opacity-20 font-bold rounded-full p-2 transition duration-300"
				onClick={clearOrder}
			>
				<Image
					width={36}
					height={36}
					src={"/assets/icons/close-bg-solid.svg"}
					alt="icono:cerrar:"
				/>
			</button>
		</div>
	);
}
