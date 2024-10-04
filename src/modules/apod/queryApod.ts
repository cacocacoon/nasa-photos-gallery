import { baseApi } from "@/modules/utils";
import { ApodResponseSchema } from "@/modules/apod/schemas";
import { APOD_PATH } from "@/modules/apod/constants";

export default async function queryApod() {
  const { data } = await baseApi.get(APOD_PATH, { params: { thumbs: true } });
  const parsed = await ApodResponseSchema.safeParseAsync(data);

  if (parsed.success) {
    return parsed.data;
  } else {
    throw parsed.error;
  }
}
