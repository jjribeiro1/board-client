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

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const hasQueryParam = useCallback(
    (name?: string) => {
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
    setQueryParam,
    hasQueryParam,
    clearAllQueryParams,
    createQueryString,
  };
}
