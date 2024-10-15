import { nasaApi } from "@/modules/utils";
import { ApodsSchema } from "@/modules/apod/schemas";

export default async function getApod(urlSearchParams: URLSearchParams) {
  const { data, status, statusText } = await nasaApi.get("/planetary/apod", {
    params: urlSearchParams,
  });
  const parsed = await ApodsSchema.safeParseAsync(data);

  if (parsed.success) {
    return { data: parsed.data, status, statusText };
  } else {
    throw parsed.error;
  }
}
