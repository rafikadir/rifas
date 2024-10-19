import Image from "next/image";
import Link from "next/link";
import { boletoStatus } from "@/src/interfaces/boletos";
import { IRifaModel } from "@/src/interfaces/rifas";
import { RifaStatusBar } from "./RifaStatusBar";

type Props = {
	rifa: IRifaModel;
};

export const RifaAdminCard = ({ rifa }: Props) => {
	return (
		<div className="rounded shadow-md bg-white h-40">
			<Link href={`/admin/rifas/${rifa.slug}`}>
				<RifaStatusBar estado={rifa.estado} />
				<div className="py-2 px-4 space-y-1.5 text-sm md:text-base">
					{/* TITLE AND DATES */}
					<div className="flex justify-between">
						<span className="font-bold">{rifa.title}</span>
						<small className="text-gray-500">
							<div>
								Inicio:{" "}
								{rifa.startDate?.toLocaleDateString()}
							</div>
							<div>
								Fin: {rifa.endDate?.toLocaleDateString()}
							</div>
						</small>
					</div>

					<div className="flex justify-between">
						<div>
							{/* TICKETS INFO */}
							<small className="text-gray-500">Boletos</small>
							<div className="font-semibold flex flex-col md:flex-row md:space-x-4 ">
								<span>
									Apartados:{" "}
									{
										Object.values(rifa.boletos).filter(
											(boleto) => boleto.estado === boletoStatus.APARTADO
										).length
									}
								</span>
								<span>
									Vendidos:{" "}
									{
										Object.values(rifa.boletos).filter(
											(boleto) => boleto.estado === boletoStatus.VENDIDO
										).length
									}
								</span>
								<span>Total: {rifa.ticketsTotal}</span>
							</div>
						</div>
						<Image
							alt={`Imagen de: ${rifa.title}`}
							src={rifa.imageUrl}
							width={60}
							height={40}
							className="mr-5"
						/>
					</div>
				</div>
			</Link>
		</div>
	);
};
