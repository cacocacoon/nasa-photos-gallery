import { baseApi } from "@/modules/utils";
import { ASSET_PATH } from "@/modules/asset/constants";
import { type AssetResponse } from "@/modules/asset/schemas";
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
    const { data } = await baseApi.get<AssetResponse>(`${ASSET_PATH}/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
