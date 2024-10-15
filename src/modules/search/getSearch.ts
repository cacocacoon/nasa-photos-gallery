import { nasaImagesApi } from "@/modules/utils";
import { SearchResponseSchema } from "@/modules/search/schemas";

export default async function getSearch(urlSearchParams: URLSearchParams) {
  const { data, status, statusText } = await nasaImagesApi.get("/search", {
    params: urlSearchParams,
  });
  const parsed = await SearchResponseSchema.safeParseAsync(data);

  if (parsed.success) {
    return { data: parsed.data, status, statusText };
  } else {
    throw parsed.error;
  }
}
