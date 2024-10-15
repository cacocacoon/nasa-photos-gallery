import { SEARCH_PATH } from "@/modules/search/constants";
import { MediaType, type SearchResponse } from "@/modules/search/schemas";
import type { SearchQueryKey } from "@/modules/search/types";
import { baseApi } from "@/modules/utils";

export default async function querySearch({
  queryKey: [, { q, nasa_id, keywords }],
  pageParam,
}: {
  queryKey: SearchQueryKey;
  pageParam: number;
}) {
  if (
    typeof q === "undefined" &&
    typeof nasa_id === "undefined" &&
    typeof keywords === "undefined"
  ) {
    return null;
  }

  try {
    const response = await baseApi.get<SearchResponse>(SEARCH_PATH, {
      params: {
        page: pageParam,
        page_size: 50,
        q,
        nasa_id,
        keywords,
        media_type: [MediaType.IMAGE, MediaType.VIDEO],
      },
    });
    const { data } = response;

    return data;
  } catch (error) {
    throw error;
  }
}
