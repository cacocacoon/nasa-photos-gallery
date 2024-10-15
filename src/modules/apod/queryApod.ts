import { baseApi } from "@/modules/utils";
import { type Apods } from "@/modules/apod/schemas";
import { APOD_PATH } from "@/modules/apod/constants";

export default async function queryApod() {
  const { data } = await baseApi.get<Apods>(APOD_PATH, {
    params: { thumbs: true, count: 5 },
  });

  return data;
}
