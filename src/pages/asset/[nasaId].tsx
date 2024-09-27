/* eslint-disable @next/next/no-img-element */
import { Suspense, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useAsset from "@/modules/asset/useAsset";
import useSearch from "@/modules/search/useSearch";
import { format } from "date-fns";

const AssetContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 16px;
  z-index: 0;
`;

const AssetBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  cursor: zoom-out;
`;

const AssetContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 1016px;
  max-width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 32px;
  background-color: white;
  overflow: auto;
  z-index: 1;
`;

const VisualContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 32px 32px 32px;
  height: 100%;
  overflow: auto;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: normal;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 0;
  padding: 32px 0 16px 0;
  background-color: white;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const StyledImg = styled.img`
  max-width: 100%;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  padding: 8px 12px;
  background-color: #8080802b;
  font-size: 12px;
  font-weight: normal;
  border-radius: 16px;
  cursor: pointer;
`;

const DateCreated = styled.time`
  font-size: 16px;
  color: #111;
`;

function AssetPage() {
  const router = useRouter();
  const { query } = router;
  const { nasaId } = query;
  const [containerHeight, setContainerHeight] =
    useState<React.CSSProperties["height"]>();
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
      <AssetContent style={{ height: containerHeight }}>
        <VisualContainer>
          <StyledImg
            width={488}
            height="auto"
            src={assetData[0].href}
            alt={searchItemsData[0].data[0].title}
            onLoad={(e) => {
              const { height } = e.currentTarget.getBoundingClientRect();
              setContainerHeight(height);
            }}
          />
        </VisualContainer>
        <DescriptionContainer>
          <Header>
            <Title>{searchItemsData[0].data[0].title}</Title>
            <DateCreated>
              {format(
                searchItemsData[0].data[0].date_created,
                "PPPP h:mm:ss a",
              )}
            </DateCreated>
            {searchItemsData[0].data[0].keywords && (
              <TagsContainer>
                {searchItemsData[0].data[0].keywords.map((keyword) => (
                  <Tag key={keyword}>{keyword}</Tag>
                ))}
              </TagsContainer>
            )}
          </Header>
          <Description>{searchItemsData[0].data[0].description}</Description>
        </DescriptionContainer>
      </AssetContent>
      <AssetBackground onClick={() => router.back()} />
    </AssetContainer>
  );
}

export default function Asset() {
  return (
    <Suspense>
      <AssetPage />
    </Suspense>
  );
}
