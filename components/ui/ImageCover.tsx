import Image from "next/image";
import Link from "next/link";

type Props = {
	buttonUrl: string;
};

export default function ImageCover({ buttonUrl }: Props) {
	return (
		<div className="flex flex-col space-y-4 md:justify-around items-center">
			<div className="text-dark left-5 top-8 md:space-y-1">
				<h1 className="text-3xl md:text-5xl mt-4">Rifas el Magnate</h1>
				<p className="uppercase md:text-2xl">
					Sorteo entre amigos
					<br /> en base a la lotería nacional
				</p>
			</div>

			<Link
				href={buttonUrl}
				className="uppercase px-8 py-3 w-44 text-center rounded-2xl text-light bg-gradient-to-r from-sky-700 to-sky-950 hover:shadow-lg hover:from-sky-950 hover:to-sky-700 transition-colors duration-700 flex items-center justify-evenly"
			>
				<p>Entrar</p>
				<Image
					className="ml-3"
					src="/assets/icons/rightArrow.svg"
					alt="entrar"
					width={42}
					height={42}
					quality={5}
				/>
			</Link>
		</div>
	);
}
