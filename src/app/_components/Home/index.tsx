"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { type Apods } from "@/modules/apod/schemas";
import Button from "@/components/Button";
import { MediaType } from "@/modules/search/schemas";
import ImageSelector from "./ImageSelector";

const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  min-height: 500px;
  z-index: 0;
`;

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

const ImageSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s;
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

  &:hover ${ImageSelectorContainer} {
    opacity: 1;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1016px;
  max-width: 100%;
  height: 70vh;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 32px;
  background-color: white;
  overflow: auto;

  @media screen and (width <= 1160px) {
    flex-direction: column;
    width: 580px;
    height: auto;

    ${VisualContainer} {
      flex: initial;
      width: 100%;

      ${StyledImage} {
        border-radius: 0;
      }
    }
  }
`;

const StyledIframe = styled.iframe`
  border: none;
  width: 100%;
  height: 300px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  flex: 2;
  padding: 32px;
  height: 100%;
`;

const Description = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
  overflow: auto;
`;

const CopyRight = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  text-align: right;
  color: #00000082;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 0;
  background-color: white;
`;

const HomeTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const DateCreated = styled.time`
  font-size: 16px;
  color: #111;
`;

type HomeProps = {
  data: Apods;
};

export default function Home(props: HomeProps) {
  const { data } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedApod = data[selectedIndex];

  if (!selectedApod) {
    return null;
  }

  return (
    <HomeContainer>
      <HomeTitle>Astronomy Pictures of the Day</HomeTitle>
      <ContentWrapper>
        <VisualContainer>
          {selectedApod.media_type === MediaType.IMAGE && (
            <StyledImage
              fill
              sizes="100%"
              src={selectedApod.hdurl ?? selectedApod.url}
              alt={selectedApod.title}
              priority
              quality={100}
            />
          )}
          {selectedApod.media_type === MediaType.VIDEO && (
            <StyledIframe src={selectedApod.url} />
          )}
          <ImageSelectorContainer>
            <ImageSelector
              items={data}
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}
            />
          </ImageSelectorContainer>
        </VisualContainer>
        <DescriptionContainer>
          <Header>
            <Title>{selectedApod.title}</Title>
            <DateCreated>{selectedApod.date}</DateCreated>
          </Header>
          <Description>{selectedApod.explanation}</Description>
          {selectedApod.copyright && (
            <CopyRight>{selectedApod.copyright}</CopyRight>
          )}
        </DescriptionContainer>
      </ContentWrapper>
    </HomeContainer>
  );
}
