"use client";

type Props = {
  boletos: number;
  boletosOcupados: number;
};

export const GoToBoletosButton = ({ boletos, boletosOcupados }: Props) => {
  const hayBoletosDisponibles = boletosOcupados < boletos;
  const buttonText = hayBoletosDisponibles ? "Boletos" : "No hay boletos";

  return (
    <button
      onClick={() => {
        const targetElement = document.querySelector("#boletos");
        if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
      }}
      aria-disabled={!hayBoletosDisponibles}
      className="inline-block w-52 text-light border-2 border-dashed border-white p-2 px-8 bg-red rounded-lg hover:text-red hover:bg-opacity-30 uppercase hover:border-red transition-colors disabled:bg-opacity-30 disabled:text-red disabled:border-red"
    >
      {buttonText}
    </button>
  );
};
