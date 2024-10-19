
export const boletoStatus = {
  APARTADO: "apartado",
  DISPONIBLE: "disponible",
  VENDIDO: "vendido",
} as const;
export type BoletoStatusType = (typeof boletoStatus)[keyof typeof boletoStatus];

export type IBoleto = {
  estado: BoletoStatusType;
  idPublico: string;
  reservadoHasta?: Date | null;
};
