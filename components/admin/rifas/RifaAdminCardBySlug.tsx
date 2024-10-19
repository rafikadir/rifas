import { IRifaModel } from "@/src/interfaces/rifas";
import { boletoStatus } from "@/src/interfaces/boletos";

import { formatCurrency } from "@/src/utils/parsers";
import { Title } from "../../ui/Title";
import { RifaStatusBar } from "./RifaStatusBar";
import Link from "next/link";
import { DeleteRifaButton } from "./DeleteRifaButton";
import Image from "next/image";
import { IUserModel } from "@/src/interfaces/users";

type Props = {
	rifa: IRifaModel;
	vendedor: IUserModel;
};

export const RifaAdminCardBySlug = ({ rifa, vendedor }: Props) => {
	return (
		<div className="space-y-2">
			<Title>{rifa.title}</Title>
			<div className="text-center text-gray-400">Serie: {rifa.serie}</div>
			<Image
				className="mx-auto pb-4"
				width={120}
				height={120}
				src={rifa.imageUrl}
				alt="Imagen de la rifa"
			/>

			<div className="rounded-t rounded-b-xl shadow-md bg-white">
				<RifaStatusBar estado={rifa.estado} />
				<div className="py-2 px-4 space-y-4 text-sm md:text-base">
					<div className="flex space-x-4">
						<span className="w-24">Inicio:</span>
						<span className="font-bold">
							{rifa.startDate?.toLocaleString()}
						</span>
					</div>
					<div className="flex space-x-4">
						<span className="w-24">Fin:</span>
						<span className="font-bold">{rifa.endDate?.toLocaleString()}</span>
					</div>
					<div className="flex space-x-4">
						<span className="w-24">Precio:</span>
						<p className="font-bold break-normal">
							{formatCurrency(rifa.price)}
						</p>
					</div>

					<div className="flex space-x-4">
						<span className="w-24">Descripción:</span>
						<p className="font-bold break-words">{rifa.description}</p>
					</div>

					<div className="flex space-x-4">
						<span className="w-24">Estado:</span>
						<span className="font-bold">{rifa.estado}</span>
					</div>

					<div className="flex space-x-4">
						<span className="w-24">Vendedor:</span>
						<div className="flex flex-col">
							<span className="font-bold">Nombre: {vendedor.name}</span>
							<span className="font-bold">Email: {vendedor.email}</span>
							<span className="font-bold">Teléfono: {vendedor.phone_number || "-"}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="rounded-xl shadow-md bg-white py-2 px-4 space-y-2 text-sm md:text-base">
				<div className="flex space-x-4">
					<span className="w-24">Boletos:</span>
					<span className="font-bold text-center">{rifa.ticketsTotal}</span>
				</div>
				<div className="flex space-x-4">
					<span className="w-24">Vendidos:</span>
					<span className="font-bold text-center">
						{
							Object.values(rifa.boletos).filter(
								(boleto) => boleto.estado === boletoStatus.VENDIDO
							).length
						}
					</span>
				</div>
				<div className="flex space-x-4">
					<span className="w-24">Apartados:</span>
					<span className="font-bold text-center">
						{
							Object.values(rifa.boletos).filter(
								(boleto) => boleto.estado === boletoStatus.APARTADO
							).length
						}
					</span>
				</div>
			</div>

			<div className="flex justify-end space-x-4">
				<EditRifaButton slug={rifa.slug!} />
				<DeleteRifaButton id={rifa.id} estado={rifa.estado} />
			</div>

			<Title>Premios:</Title>
			<div className="rounded-xl shadow-md bg-white p-4 text-sm md:text-base space-y-2 md:space-y-0 md:gap-2 flex-col md:flex md:flex-row md:justify-center md:flex-wrap">
				{rifa.prizes.map((premio, index) => (
					<div key={index} className="p-4 space-y-4 bg-white-100 rounded-lg">
						<div className="flex space-x-4">
							<span className="w-24">Título:</span>
							<p className="font-bold break-words">{premio.title}</p>
						</div>
						<div className="flex space-x-4">
							<span className="w-24">Descripción:</span>
							<p className="font-bold break-words">{premio.description}</p>
						</div>
						<Image
							className="mx-auto"
							alt={premio.title}
							src={premio.url}
							width={100}
							height={100}
						/>
						<p className="text-gray-400 text-center">{index + 1}</p>
					</div>
				))}
			</div>
		</div>
	);
};

const EditRifaButton = ({ slug }: { slug: string }) => {
	return (
		<Link
			href={`/admin/rifas/${slug}/editar`}
			className="py-1 px-2 rounded text-light bg-orange-500 hover:bg-orange-600"
		>
			Editar
		</Link>
	);
};
