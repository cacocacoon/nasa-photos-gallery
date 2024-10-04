import { SEARCH_PATH } from "@/modules/search/constants";
import { MediaType, SearchResponseSchema } from "@/modules/search/schemas";
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
    const response = await baseApi.get<unknown>(SEARCH_PATH, {
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
    const parsed = await SearchResponseSchema.safeParseAsync(data);

    if (parsed.success) {
      return parsed.data;
    } else {
      throw parsed.error;
    }
  } catch (error) {
    throw error;
  }
}
