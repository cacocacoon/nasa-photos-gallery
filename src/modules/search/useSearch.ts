import { useCallback, useEffect, useState, startTransition } from "react";
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

const SEARCH_PATH = "nasa/images/search" as const;

type Params = {
  q?: string;
  nasa_id?: string;
  keywords?: string[];
};

export default function useSearch(params: Params) {
  const [innerParams, setInnerParams] = useState<Params>();

  const queryResult = useSuspenseInfiniteQuery<
    SearchResponse | null,
    Error,
    SearchItem[],
    [typeof SEARCH_PATH, Params],
    number
  >({
    queryKey: [SEARCH_PATH, innerParams ?? {}],
    initialPageParam: 1,
    async queryFn({ queryKey: [, { q, nasa_id, keywords }], pageParam }) {
      if (
        typeof q === "undefined" &&
        typeof nasa_id === "undefined" &&
        typeof keywords === "undefined"
      ) {
        return null;
      }

      const { data } = await baseApi.get<unknown>(SEARCH_PATH, {
        params: {
          page: pageParam,
          page_size: 50,
          q,
          nasa_id,
          keywords,
          media_type: ["image", "video"],
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
      const isNoNextPage = (lastPage?.collection.items.length ?? 0) === 0;
      if (isNoNextPage) {
        return null;
      }

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
    const keywords = params.keywords;

    if (
      typeof q === "string" ||
      typeof nasa_id === "string" ||
      (Array.isArray(keywords) && keywords.length > 0)
    ) {
      startTransition(() => {
        setInnerParams({ q, nasa_id, keywords });
      });
    }
  }, [params.q, params.nasa_id, params.keywords]);

  return {
    ...queryResult,
    fetchNextPage,
  };
}
