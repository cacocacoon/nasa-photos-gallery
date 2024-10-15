import Asset from "@/app/asset/_components/Asset";
import getAsset from "@/modules/asset/getAsset";
import getSearch from "@/modules/search/getSearch";
import { MediaType } from "@/modules/search/schemas";

type AssetPageProps = {
  params: {
    nasaId?: string;
  };
};

export default async function AssetPage(props: AssetPageProps) {
  const { params } = props;
  const { nasaId } = params;

  const searchDataPromise = getSearch(
    new URLSearchParams({
      nasa_id: nasaId!,
      page: "1",
      page_size: "50",
      media_type: `${MediaType.IMAGE},${MediaType.VIDEO}`,
    }),
  );
  const assetDataPromise = getAsset(nasaId!);
  const [{ data: searchData }, { data: assetData }] = await Promise.all([
    searchDataPromise,
    assetDataPromise,
  ]);

  if (typeof nasaId !== "string" || !searchData || !assetData) {
    return null;
  }

  return (
    <Asset nasaId={nasaId} searchData={searchData} assetData={assetData} />
  );
}
