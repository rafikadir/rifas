
export type httpResponse = {
  ok: boolean;
  message: string;
  details?: string;
  status: number;
  data?: undefined;
};

export const commonResponse: httpResponse = {
  ok: true,
  message: "ok",
  status: 200,
};

export const forbiddenResponse: httpResponse = {
  ok: false,
  message: "Forbidden. Try again later.",
  status: 403,
};

export const notFoundResponse: httpResponse = {
  ok: false,
  message: "Not found.",
  status: 404,
};

export const invalidRequestResponse: httpResponse = {
  ok: false,
  message: "Invalid request.",
  status: 400,
};

// Interfaz base para sorteos
export interface IRifaForm {
  title: string;
  description: string;
  tickets_total: number;
  price: number;
  start_date: string;
  end_date: string;
  prize_title: string;
  prize_description: string;
  prize_file: File | null;
}

export type ISorteo = {
  id: string;
  title: string;
  description: string;
  tickets_total: number;
  price: number | null;
  start_date: string;
  end_date: string;
  prize_title: string;
  prize_description: string;
  prize_file?: File | null;
  prize_url: string;
  winner_ticket?: number | null;
  boletos_vendidos: number;
  boletos_apartados: number;
  active?: boolean;
};

export type ITickets = {
  id: string;
  ticket_index: number;
  id_sorteo: string;
  id_user?: number;
  expires_at?: string;
};

export interface IReservation {
  id: string;
  id_rifa: string;
  numeroBoleto: number;
  id_user: string;
  expires_at?: string;
};

type issuesType = {
  message: string;
  code?: string;
  keys?: string;
  path?: string[];
};

// FRONTEND INTERFACES
export interface AnotherHttpResponse<T> {
  ok: boolean | string;
  message: string;
  details?: string;
  data: T;
  error?: {
    issues: issuesType[];
  };
}

export interface HttpResponse<T> {
  ok?: boolean | string;
  success?: boolean;
  message: string;
  data: T | null;
  error?: {
    issues: issuesType[];
  };
}

export type ErrorMessagesType = {
  message: string;
  msgType?: string;
};

export interface ValidationResponses {}
