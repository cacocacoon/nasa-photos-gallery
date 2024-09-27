import { useCallback, useEffect, useState, useTransition } from "react";
import {
  useSuspenseInfiniteQuery,
  type FetchNextPageOptions,
} from "@tanstack/react-query";
import { baseApi } from "@/modules/utils";
import {
  type SearchResponse,
  type SearchItem,
  SearchResponseSchema,
} from "@/modules/search/schemas";

type Params = {
  q?: string;
  nasa_id?: string;
};

export default function useSearch(params: Params) {
  const [innerParams, setInnerParams] = useState<Params>();
  const [, startTransition] = useTransition();

  const queryResult = useSuspenseInfiniteQuery<
    SearchResponse | null,
    Error,
    SearchItem[],
    ["search", q?: string, nasa_id?: string],
    number
  >({
    queryKey: ["search", innerParams?.q, innerParams?.nasa_id],
    initialPageParam: 1,
    async queryFn({ queryKey: [key, q, nasa_id], pageParam }) {
      if (q === undefined && q === nasa_id) {
        return null;
      }

      const { data } = await baseApi.get<unknown>(key, {
        params: {
          page: pageParam,
          page_size: 50,
          q,
          nasa_id,
        },
      });
      const parsed = await SearchResponseSchema.safeParseAsync(data);

      if (parsed.success) {
        return parsed.data;
      } else {
        throw parsed.error;
      }
    },
    getNextPageParam(lastPage, allPages, lastPageParam) {
      return lastPageParam + 1;
    },
    select(data) {
      const transformed = data.pages.reduce((accu, page) => {
        accu.push(...(page?.collection.items ?? []));
        return accu;
      }, [] as SearchItem[]);
      return transformed;
    },
  });

  const fetchNextPage = useCallback(
    (options?: FetchNextPageOptions) => {
      startTransition(() => {
        queryResult.fetchNextPage(options);
      });
    },
    [queryResult],
  );

  useEffect(() => {
    const q = params.q;
    const nasa_id = params.nasa_id;

    if (typeof q === "string" || typeof nasa_id === "string") {
      startTransition(() => {
        setInnerParams({ q, nasa_id });
      });
    }
  }, [params.q, params.nasa_id]);

  return {
    ...queryResult,
    fetchNextPage,
  };
}
