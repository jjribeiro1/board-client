import { AxiosError } from "axios";

export function getErrorMessage(error: unknown, fallback = "Ocorreu um erro inesperado"): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}
