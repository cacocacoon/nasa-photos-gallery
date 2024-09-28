/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSearch from "@/modules/search/useSearch";
import Button from "@/components/Button";
import AssetContent from "@/pages/asset/_components/AssetContent";
import ExploreMore from "@/pages/asset/_components/ExploreMore";

const AssetContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  min-height: 500px;
  padding: 16px;
  z-index: 0;
`;

const BackButton = styled(Button)`
  position: fixed;
  top: 96px;
  left: 16px;
  font-weight: 600;
  background-color: white;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
`;

const AssetBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  cursor: zoom-out;
`;

function AssetPage() {
  const router = useRouter();
  const { query } = router;
  const { nasaId } = query;
  const { data: searchItemsData } = useSearch({
    nasa_id: typeof nasaId === "string" ? nasaId : undefined,
  });

  if (typeof nasaId !== "string") {
    return null;
  }

  return (
    <AssetContainer>
      <BackButton onClick={() => router.back()}>⬅</BackButton>
      <AssetContent key={nasaId} nasaId={nasaId} />
      {searchItemsData[0]?.data[0]?.keywords && (
        <ExploreMore
          key={`${nasaId}-explore-more`}
          keywords={searchItemsData[0]?.data[0]?.keywords}
        />
      )}
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
