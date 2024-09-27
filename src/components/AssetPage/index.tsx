/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import styled from "styled-components";
import useAsset from "@/pages/search/useAsset";
import useSearch from "@/pages/search/useSearch";

const AssetContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const AssetContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 1016px;
  max-width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 32px;
  background-color: white;
`;

const VisualContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px;
  font-size: 28px;
`;

const Description = styled.div`
  margin: 16px 0;
  font-size: 16px;
`;

const StyledImg = styled.img`
  max-width: 100%;
  border-radius: 16px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

const Tag = styled.div`
  padding: 8px 12px;
  background-color: #8080802b;
  font-size: 12px;
  border-radius: 16px;
  cursor: pointer;
`;

export default function AssetPage() {
  const { query } = useRouter();
  const { nasaId } = query;
  const { data: assetData } = useAsset(
    typeof nasaId! === "string" ? nasaId : "",
  );
  const { data: searchItemsData } = useSearch({
    nasa_id: typeof nasaId === "string" ? nasaId : undefined,
  });
  if (!nasaId || !assetData || !searchItemsData) {
    return null;
  }

  return (
    <AssetContainer>
      <AssetContent>
        <VisualContainer>
          <StyledImg
            width={488}
            height="auto"
            src={assetData[0].href}
            alt={searchItemsData[0].data[0].title}
          />
        </VisualContainer>
        <DescriptionContainer>
          {searchItemsData[0].data[0].title}
          {searchItemsData[0].data[0].keywords && (
            <TagsContainer>
              {searchItemsData[0].data[0].keywords.map((keyword) => (
                <Tag key={keyword}>{keyword}</Tag>
              ))}
            </TagsContainer>
          )}
          <Description>{searchItemsData[0].data[0].description}</Description>
        </DescriptionContainer>
      </AssetContent>
    </AssetContainer>
  );
}
