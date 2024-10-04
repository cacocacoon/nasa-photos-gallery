import { useQuery } from "@tanstack/react-query";
import { type AssetResponse, type AssetItem } from "@/modules/asset/schemas";
import queryAsset from "@/modules/asset/queryAsset";
import { ASSET_PATH } from "./constants";

export default function useAsset(nasaId: string) {
  return useQuery<
    AssetResponse | null,
    Error,
    AssetItem[],
    [typeof ASSET_PATH, string]
  >({
    queryKey: [ASSET_PATH, nasaId],
    queryFn: queryAsset,
    select(data) {
      return data?.collection.items ?? [];
    },
  });
}
