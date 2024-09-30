import { useQuery } from "@tanstack/react-query";
import { baseApi } from "@/modules/utils";
import { type ApodResponse, ApodResponseSchema } from "@/modules/apod/schemas";

const PLANETARY_APOD_PATH = "nasa/planetary/apod" as const;

export default function useApod() {
  return useQuery<
    ApodResponse,
    Error,
    ApodResponse,
    [typeof PLANETARY_APOD_PATH]
  >({
    queryKey: [PLANETARY_APOD_PATH],
    async queryFn() {
      const { data } = await baseApi.get(PLANETARY_APOD_PATH);
      const parsed = await ApodResponseSchema.safeParseAsync(data);

      if (parsed.success) {
        return parsed.data;
      } else {
        throw parsed.error;
      }
    },
  });
}
