"use client";

import { useEffect, useState } from "react";
import { api, errorMessage } from "@/lib/api";

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useFetch<T>(path: string | null) {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, loading: true });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    api<T>(path)
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, error: errorMessage(error), loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, [path, version]);

  return { ...state, reload: () => setVersion((v) => v + 1) };
}
