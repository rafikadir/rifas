import Image from "next/image";

export const NotFound = () => {
  return (
    <div className="grid place-items-center bg-white px-6 py-12 md:py-20 lg:px-8 mx-auto">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-secondary">
          Lo sentimos, la página que buscas no existe.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-primary bg-opacity-100 px-3.5 py-2.5 text-sm font-semibold text-light shadow-sm  hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex justify-center items-center"
          >
            <Image
              src="/assets/icons/backIcon.svg"
              width={42}
              height={42}
              alt="back icon"
              className="mr-2 w-6"
            />
            Regresar a inicio
          </a>
        </div>
      </div>
    </div>
  );
};
