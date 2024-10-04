import Asset from "@/app/asset/_components/Asset";
import { SEARCH_PATH } from "@/modules/search/constants";
import { ASSET_PATH } from "@/modules/asset/constants";
import queryAsset from "@/modules/asset/queryAsset";
import querySearch from "@/modules/search/querySearch";

type AssetPageProps = {
  params: {
    nasaId?: string;
  };
};

export default async function AssetPage(props: AssetPageProps) {
  const { params } = props;
  const { nasaId } = params;

  const searchDataPromise = querySearch({
    queryKey: [SEARCH_PATH, { nasa_id: nasaId }],
    pageParam: 1,
  });
  const assetDataPromise = queryAsset({
    queryKey: [ASSET_PATH, nasaId],
  });

  const [searchData, assetData] = await Promise.all([
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
