"use client";

import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { type SearchResponse, type SearchItem } from "@/modules/search/schemas";
import type { SearchParams, SearchQueryKey } from "@/modules/search/types";
import { SEARCH_PATH } from "@/modules/search/constants";
import querySearch from "@/modules/search/querySearch";

export default function useSearch(
  params: SearchParams,
  initialData?: InfiniteData<SearchResponse, number>,
) {
  return useInfiniteQuery<
    SearchResponse | null,
    Error,
    SearchItem[],
    SearchQueryKey,
    number
  >({
    queryKey: [SEARCH_PATH, params ?? {}],
    initialPageParam: 1,
    initialData,
    queryFn: querySearch,
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
}
