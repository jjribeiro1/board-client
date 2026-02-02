import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParam = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams],
  );

  const getAllQueryParams = useCallback(
    (name: string) => {
      return searchParams.getAll(name);
    },
    [searchParams],
  );

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const toggleQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.getAll(name);

      if (currentValues.includes(value)) {
        const newParams = new URLSearchParams();
        for (const [key, val] of params.entries()) {
          if (key !== name || val !== value) {
            newParams.append(key, val);
          }
        }
        router.push(`${pathname}?${newParams.toString()}`);
      } else {
        params.append(name, value);
        router.push(`${pathname}?${params.toString()}`);
      }
    },
    [router, pathname, searchParams],
  );

  const hasQueryParam = useCallback(
    (name?: string, value?: string) => {
      if (name && value) {
        return searchParams.getAll(name).includes(value);
      }
      if (name) {
        return searchParams.has(name);
      }
      return searchParams.size > 0;
    },
    [searchParams],
  );

  const clearAllQueryParams = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const createQueryString = () => {
    const params = new URLSearchParams(searchParams.toString());
    return params.toString() ? `?${params.toString()}` : "";
  };

  return {
    getQueryParam,
    getAllQueryParams,
    setQueryParam,
    toggleQueryParam,
    hasQueryParam,
    clearAllQueryParams,
    createQueryString,
  };
}
