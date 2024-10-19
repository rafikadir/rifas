import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer p-4">
      <div>
        <h1 className="text-2xl font-extrabold">Rifas el Magnate</h1>
        <p>Sorteo entre amigos en base a la Lotería Nacional.</p>
      </div>
      <br />
      <div>
        <h1 className="text-2xl font-extrabold">Ir a</h1>
        <span>
          <Link className="underline" href="/rifas">
            Rifas activas
          </Link>
          <br />
          <Link className="underline" href="/verificador">
            Verificador de boletos
          </Link>
          <br />
          <Link className="underline" href="/#preguntasfrecuentes">
            Preguntas frecuentes
          </Link>
        </span>
      </div>
      <br />
      <div>
        <h1 className="text-2xl font-extrabold">Contacto</h1>
        <p>+12 345 678 9012</p>
      </div>
      <br />
      <iframe
        className="mx-auto"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7525.637288080951!2d-102.06865485773803!3d19.42024029587991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842de2722b32cb05%3A0x635d3a6a5afed75f!2sCentro%2C%20Uruapan%2C%20Mich.!5e0!3m2!1ses-419!2smx!4v1722751607923!5m2!1ses-419!2smx"
        width="300"
        height="200"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </footer>
  );
}
