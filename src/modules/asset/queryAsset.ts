import { baseApi } from "@/modules/utils";
import { ASSET_PATH } from "@/modules/asset/constants";
import { AssetResponseSchema } from "@/modules/asset/schemas";
import type { AssetQueryKey } from "@/modules/asset/types";

export default async function queryAsset({
  queryKey: [, id],
}: {
  queryKey: AssetQueryKey;
}) {
  if (!id) {
    return null;
  }

  try {
    const { data } = await baseApi.get(`${ASSET_PATH}/${id}`);
    const parsed = await AssetResponseSchema.safeParseAsync(data);

    if (parsed.success) {
      return parsed.data;
    } else {
      throw parsed.error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
