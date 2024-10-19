import Image from "next/image";
import { boletoStatus, IBoleto } from "@/src/interfaces/boletos";

import { NotFound } from "@/components/NotFound";
import { GoToBoletosButton } from "@/components/rifas/GoToBoletosButton";
import PremiosCard from "@/components/premios/PremiosCard";
import PreciosCard from "@/components/rifas/PreciosCard";
import PromocionCard from "@/components/rifas/OfertasCard";
import BoletosSeleccionados from "@/components/boletos/BoletosSeleccion";
import { BoletosGrid } from "@/components/boletos/BoletosGrid";
import { GeneradorDeBoletos } from "@/components/boletos/GeneradorDeBoletos";
import { getRifaBySlug } from "@/actions/rifas/getRifaBySlug";
import { JSONDataParser } from "@/src/utils/parsers";
import { IPublicRifaModel } from "@/src/interfaces/rifas";

type Props = {
	params: { slug: string };
};

const getRifaByIdPage = async ({ params }: Props) => {
	const slug = params.slug;
	const { data } = await getRifaBySlug(slug);
	
	if (!data) {
		return <NotFound />;
	}

	const rifa = JSONDataParser(data) as IPublicRifaModel;

	return (
		<div className="mb-8 pt-4 text-center">
			<p className="text-gray-400  text-sm">No. rifa: {rifa.serie}</p>
			<h1 className="text-2xl font-bold">{rifa.title}</h1>

			<Image
				width={150}
				height={150}
				className="mt-4 mb-1 rounded-xl mx-auto"
				src={rifa.imageUrl}
				alt={rifa.title}
			/>

			<div className="my-4 text-center space-y-1">
				<p className="flex justify-center before:content-[url(/assets/icons/calendar.svg)] before:mr-2">
					{new Date(rifa.endDate || "")?.toLocaleDateString()}
				</p>
				<p className="flex justify-center before:content-[url(/assets/icons/clock.svg)] before:mr-2">
					{new Date(rifa.endDate || "")?.toLocaleTimeString()}
				</p>
			</div>

			<GoToBoletosButton
				boletos={rifa.ticketsTotal}
				boletosOcupados={
					Object.values(rifa.boletos).filter(
						(boleto: IBoleto) => boleto.estado !== boletoStatus.DISPONIBLE
					).length
				}
			/>

			<p className="my-8">{rifa.description}</p>

			<PromocionCard />

			<PremiosCard premios={rifa.prizes} />

			<PreciosCard precio={rifa.price} />

			<span id="boletos" className="text-sky-900 font-bold">
				Busca tu número de la suerte o elige uno disponible
			</span>

			<BoletosSeleccionados serie={rifa.serie} />

			{/* <BuscarBoletosForm rifa={rifa} /> */}
			<GeneradorDeBoletos rifa={rifa} />

			<BoletosGrid rifa={rifa} />
		</div>
	);
};

export default getRifaByIdPage;
