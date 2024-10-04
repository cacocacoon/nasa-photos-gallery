import AssetContent from "@/app/asset/_components/AssetContent";
import AssetContainer from "@/app/asset/_components/AssetContainer";
import ExploreMore from "@/app/asset/_components/ExploreMore";
import type { SearchResponse } from "@/modules/search/schemas";
import type { AssetResponse } from "@/modules/asset/schemas";

type AssetProps = {
  nasaId: string;
  searchData: SearchResponse;
  assetData: AssetResponse;
};

export default function Asset(props: AssetProps) {
  const { nasaId, searchData, assetData } = props;
  const {
    collection: { items: searchItemsData },
  } = searchData;
  const {
    collection: { items: assetItemsData },
  } = assetData;

  return (
    <AssetContainer>
      <AssetContent
        key={nasaId}
        searchItemsData={searchItemsData}
        assetItemsData={assetItemsData}
      />
      {searchItemsData[0]?.data[0]?.keywords && (
        <ExploreMore
          key={`${nasaId}-explore-more`}
          keywords={searchItemsData[0]?.data[0]?.keywords}
        />
      )}
    </AssetContainer>
  );
}
