import { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import useAsset from "@/modules/asset/useAsset";
import useSearch from "@/modules/search/useSearch";
import Skeleton from "@/components/Skeleton";

const StyledSkeleton = styled(Skeleton)`
  border-radius: 0;
`;

const AssetContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1016px;
  max-width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 32px;
  background-color: white;
  overflow: auto;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  flex: 1;
  padding: 0 32px 32px 32px;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
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

const VisualContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  max-height: 100%;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
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

type AssetContentProps = {
  nasaId: string;
};

export default function AssetContent(props: AssetContentProps) {
  const { nasaId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { data: assetData } = useAsset(
    typeof nasaId === "string" ? nasaId : "",
  );
  const { data: searchItemsData } = useSearch({
    nasa_id: typeof nasaId === "string" ? nasaId : undefined,
  });

  return (
    <AssetContentWrapper>
      <VisualContainer>
        <StyledImg
          width={488}
          height="auto"
          onLoad={() => setIsLoading(false)}
          src={assetData[0]?.href}
          alt={searchItemsData[0]?.data[0].title}
          style={{ display: isLoading ? "none" : "block" }}
        />
        {isLoading && <StyledSkeleton $width={488} $height={300} />}
      </VisualContainer>
      <DescriptionContainer>
        <Header>
          <Title>{searchItemsData[0]?.data[0].title}</Title>
          {searchItemsData[0]?.data[0].date_created && (
            <DateCreated>
              {format(searchItemsData[0]?.data[0].date_created, "h aaa PPP")}
            </DateCreated>
          )}
        </Header>
        {(searchItemsData[0]?.data[0].keywords?.length ?? 0) > 0 && (
          <TagsContainer>
            {searchItemsData[0]?.data[0].keywords!.map((keyword) => (
              <Tag key={keyword}>{keyword}</Tag>
            ))}
          </TagsContainer>
        )}
        <Description>{searchItemsData[0]?.data[0].description}</Description>
      </DescriptionContainer>
    </AssetContentWrapper>
  );
}
