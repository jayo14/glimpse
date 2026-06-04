import { useState } from "react";

export function useApiStatus() {
  const [error, setErrorState] = useState<string | null>(null);
  const [success, setSuccessState] = useState<string | null>(null);

  const clear = () => {
    setErrorState(null);
    setSuccessState(null);
  };

  const setError = (err: unknown, fallback = "Something went wrong") => {
    const message =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any)?.response?.data?.message || fallback;

    setErrorState(message);
  };

  const setSuccess = (message: string) => {
    setSuccessState(message);
  };

  return {
    error,
    success,
    setError,
    setSuccess,
    clear,
  };
}