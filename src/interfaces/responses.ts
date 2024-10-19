import { ZodIssue } from "zod";

export type httpResponse = {
	success: boolean;
	message: string;
	details?: string;
	status: number;
	data?: unknown;
};

export interface dbResponse<T = null> {
	data: T;
	success: boolean;
	errors?: { message: string }[] | ZodIssue[];
	details?: string;
}

export type DbResponse<T = null> = {
	data: T;
	success: boolean;
	errors?: { message: string }[] | ZodIssue[];
};

export type ReturnedActionType = {
	data: object | null;
	success: boolean;
	details?: string;
	errors?: { message: string }[] | ZodIssue[];
};

export const DB_ERROR = {
	NotFound: "NOT_FOUND",
	InvalidRequest: "INVALID_REQUEST",
	ConflictError: "CONFLICT_ERROR",
	MONGO_CONNECTION_ERROR: "Error de conexión.",
};

export const successResponse: httpResponse = {
	success: true,
	message: "ok",
	status: 200,
};

export const forbiddenResponse: httpResponse = {
	success: false,
	message: "Forbidden. Try again later.",
	status: 403,
};

export const notFoundResponse: httpResponse = {
	success: false,
	message: "Not found.",
	status: 404,
};

export const noContentResponse: httpResponse = {
	success: true,
	message: "No content.",
	status: 204,
};

export const badRequestResponse: httpResponse = {
	success: false,
	message: "Bad request.",
	status: 400,
};
