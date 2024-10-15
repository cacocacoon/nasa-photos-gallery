import { nasaImagesApi } from "@/modules/utils";
import { AssetResponseSchema } from "@/modules/asset/schemas";

export default async function getAsset(nasaId: string) {
  const { data, status, statusText } = await nasaImagesApi.get(
    `/asset/${nasaId}`,
  );
  const parsed = await AssetResponseSchema.safeParseAsync(data);

  if (parsed.success) {
    return { data: parsed.data, status, statusText };
  } else {
    throw parsed.error;
  }
}
