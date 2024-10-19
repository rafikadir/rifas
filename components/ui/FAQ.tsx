import Image from "next/image";
import Link from "next/link";
import { Title } from "./Title";
import SorteosSeguros from "./SorteosSeguros";

export default function FAQ() {
	return (
		<div className="max-w-2xl mx-auto my-8" id="preguntasfrecuentes">
			<Title>Preguntas frecuentes</Title>

			<details className="mx-auto mb-5" name="faq">
				<summary className="bg-primary text-light font-bold p-4 rounded">
					¿Cómo se elige a los ganadores?
				</summary>
				<div className="m-2">
					<p>
						Todos nuestros sorteos se realizan en base a la{" "}
						<span className="text-green underline">
							<Link href="https://www.loterianacional.gob.mx/" aria-label="Enlace a la lotería nacional">
								Lotería Nacional para la Asistencia Pública
							</Link>
						</span>{" "}
						mexicana.
						<br />
						El ganador de <i>Sorteos el Magnate</i> será el participante cuyo
						número de boleto coincida con las útlimas cifras del primer premio
						ganador de la Lotería Nacional.{" "}
						<b>
							Las fechas serán publicadas en nuestra{" "}
							<Link href="#" className="underline" aria-label="Enlace a la página oficial de Rifas El Magnate">
								página oficial
							</Link>
						</b>
						.
					</p>
				</div>
			</details>

			<details className="mx-auto mb-5" name="faq">
				<summary className="bg-primary text-light font-bold p-4 rounded">
					¿Qué sucede cuando el número ganador es un boleto no vendido?
				</summary>
				<div className="m-2">
					<p>
						Se elige un nuevo ganador realizando la misma dinámica en otra fecha
						cercana (se anunciará la nueva fecha). <br />
						Esto significa que:{" "}
						<b>
							¡Tendrás el dobre de oportunidades de ganar con tu mismo boleto!
						</b>
					</p>
				</div>
			</details>

			<details className="mx-auto mb-5" name="faq">
				<summary className="bg-primary text-light font-bold p-4 rounded">
					¿Dónde se publica a los ganadores?
				</summary>
				<div className="m-2">
					<p>
						<b>
							En nuestra página oficial de Facebook{" "}
							<Link href="#" className="underline" aria-label="Enlace a Facebook">
								<i>Sorteos el Magnate</i>
							</Link>
							.
						</b>
						<br />
						Aquí puedes encontrar todos y cada uno de nuestros sorteos
						anteriores, así como las transmisiones en vivo con la Lotería
						Nacional y las entregas de premios a los ganadores.
					</p>
				</div>
			</details>

			<details className="mx-auto mb-5" name="faq">
				<summary className="bg-primary text-light font-bold p-4 rounded">
					¿Cómo puedo participar en las rifas?
				</summary>
				<div className="m-2">
					<p className="font-bold">
						¡Es muy fácil participar! Solo tienes que:
					</p>
					<ul className="list-decimal list-inside">
						<li>Seleccionar una rifa activa.</li>
						<li>Elegir tus boletos. Hay 2 modalidades: Autómático y Manual.</li>
						<li>Registra tus datos y aparta tus boletos.</li>
						<li>Paga tus boletos por cualquiera de los métodos aceptados.</li>
					</ul>
					<br />
					<i>
						Tendrás un plazo de 12 horas para pagar tus boletos una vez
						apartados. Una vez realizado el pago podrás comprobar la compra de
						tu boleto por WhatsApp o en esta página web{" "}
						<Link href="/verificador" className="underline" aria-label="Enlace al verificador de boletos">
							(Verificar mis boletos)
						</Link>
						.
					</i>
					<br />
					<i>
						Puedes revisar los métodos de pago aceptados{" "}
						<Link href="/metodosdepago" className="underline" aria-label="Enlace a métodos de pago">
							aquí
						</Link>
						.
					</i>
				</div>
			</details>

			<hr />
			<SorteosSeguros />
			<p className="mb-5 text-center font-bold">
				Encuentra la transmisión en vivo de los sorteos en nuestra página de
				Facebook en las fechas indicadas a las 20:00 hrs CDMX.
				<br />
				¡No te lo pierdas!
			</p>

			<div className="bg-sky-900 p-1.5 text-light text-center font-bold">
				<p>Contáctanos</p>
			</div>

			<div className="my-4 text-center">
				<span className="font-bold">Envíanos tus preguntas a</span>
				<span className="flex gap-6 justify-center align-middle my-4">
					<Link href="#" className="Enlace a WhatsApp">
						<Image
							src="/assets/icons/whatsapp.svg"
							alt="whatsapp logo"
							width={42}
							height={42}
						/>
					</Link>
					<Link href="#" aria-label="Enlace a Facebook">
						<Image
							src="/assets/icons/facebook.svg"
							alt="facebook logo"
							width={43}
							height={43}
						/>
					</Link>
				</span>
				<span className="font-bold underline">WHATSAPP: (123) 456 7890</span>
			</div>
		</div>
	);
}
