import { startTransition, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { baseApi } from "@/modules/utils";
import {
  type AssetResponse,
  type AssetItem,
  AssetResponseSchema,
} from "@/modules/asset/schemas";

const ASSET_PATH = "nasa/images/asset" as const;
const IMAGES_ASSETS_PATH = "nasa/images-assets" as const;

export default function useAsset(nasaId: string) {
  const [innerNasaId, setInnerNasaId] = useState<string>();

  useEffect(() => {
    if (typeof nasaId !== "undefined") {
      startTransition(() => {
        setInnerNasaId(nasaId);
      });
    }
  }, [nasaId]);

  return useSuspenseQuery<
    AssetResponse | null,
    Error,
    AssetItem[],
    [typeof ASSET_PATH, string?]
  >({
    queryKey: [ASSET_PATH, innerNasaId],
    async queryFn({ queryKey: [, id] }) {
      if (!id) {
        return null;
      }

      const { data } = await baseApi.get<unknown>(`${ASSET_PATH}/${id}`);
      const parsed = await AssetResponseSchema.safeParseAsync(data);

      if (parsed.success) {
        return parsed.data;
      } else {
        throw parsed.error;
      }
    },
    select(data) {
      return (
        data?.collection.items.map((item) => ({
          href: `${baseApi.defaults.baseURL}/${IMAGES_ASSETS_PATH}${new URL(item.href).pathname}`,
        })) ?? []
      );
    },
  });
}
