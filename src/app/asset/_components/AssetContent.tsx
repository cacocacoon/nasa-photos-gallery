"use client";

import Image from "next/image";
import styled from "styled-components";
import { format } from "date-fns";
import Button from "@/components/Button";
import type { SearchItem } from "@/modules/search/schemas";
import type { AssetItem } from "@/modules/asset/schemas";

const ShareButton = styled(Button)`
  display: none;
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: rgba(255, 255, 255, 0.9);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  flex: 2;
  padding: 32px;
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
  background-color: white;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
`;

const VisualContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  height: 70vh;

  &:hover ${ShareButton} {
    display: block;
  }
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

  @media screen and (width <= 1160px) {
    flex-direction: column;
    width: 580px;

    ${VisualContainer} {
      flex: initial;
      width: 100%;

      ${StyledImage} {
        border-radius: 0;
      }
    }
  }
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

type AssetContentProps = {
  searchItemsData: SearchItem[];
  assetItemsData: AssetItem[];
};

export default function AssetContent(props: AssetContentProps) {
  const { searchItemsData, assetItemsData } = props;

  return (
    <AssetContentWrapper>
      <VisualContainer>
        <StyledImage
          fill
          sizes="100%"
          src={assetItemsData[0]?.href}
          alt={searchItemsData[0]?.data[0].title}
          priority
          quality={100}
        />
        <ShareButton>Share</ShareButton>
      </VisualContainer>
      <DescriptionContainer>
        <Header>
          <Title>{searchItemsData[0]?.data[0].title}</Title>
          {searchItemsData[0]?.data[0].date_created && (
            <DateCreated>
              {format(searchItemsData[0]?.data[0].date_created, "PPPPpp")}
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
