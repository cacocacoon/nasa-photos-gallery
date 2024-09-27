/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import useAsset from "./useAsset";
import Link from "next/link";
import { MediaType } from "@/schemas/search";
import type { AssetItem as AssetItemType } from "@/schemas/asset";

const AssetItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: zoom-in;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: bold;
  padding: 8px 6px 16px;
  margin: 0;
  color: #111111;
`;

const StyledImg = styled.img`
  border-radius: 16px;
`;

const MediaMask = styled.div`
  position: absolute;
  display: none;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  opacity: 0.4;
`;

const MediaContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover ${MediaMask} {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const IMAGE_PRIORITIES = {
  small: 0,
  medium: 1,
  orig: 2,
} as const;

const getPriority = (href: string, priorities: Record<string, number>) => {
  return (
    Object.entries(priorities)
      .map(([key, priority]) => ({
        regex: new RegExp(key),
        priority,
      }))
      .find(({ regex }) => regex.test(href))?.priority ?? Infinity
  );
};

const getMediaHref = (mediaType: MediaType, assetData: AssetItemType[]) => {
  switch (mediaType) {
    case MediaType.IMAGE:
      return (
        assetData
          .filter((item) => /.jpg$/.test(item.href))
          .sort(
            (a, b) =>
              getPriority(a.href, IMAGE_PRIORITIES) -
              getPriority(b.href, IMAGE_PRIORITIES),
          )[0]?.href ?? null
      );
    case MediaType.VIDEO:
      return (
        assetData
          .filter((item) => /.jpg$/.test(item.href))
          .sort(
            (a, b) =>
              getPriority(a.href, IMAGE_PRIORITIES) -
              getPriority(b.href, IMAGE_PRIORITIES),
          )[0]?.href ?? null
      );
    default:
      return null;
  }
};

type AssetItemProps = {
  id: string;
  title: string;
  mediaType: MediaType;
};

export default function AssetItem(props: AssetItemProps) {
  const { id, title, mediaType } = props;
  const { data: assetData } = useAsset(id);

  if (!assetData) {
    return null;
  }

  const href = getMediaHref(mediaType, assetData);

  if (!href) {
    return null;
  }

  if (mediaType !== MediaType.IMAGE) {
    console.log(assetData);
  }

  return (
    <StyledLink href={`/asset/${id}`}>
      <AssetItemContainer>
        <MediaContainer>
          <StyledImg
            src={href}
            title={title}
            alt={title}
            width={236}
            height="auto"
            loading="lazy"
          />
          {/* {mediaType === MediaType.IMAGE && (
          )}
          {mediaType === MediaType.VIDEO && (
            <StyledVideo
              src={href}
              title={title}
              width={236}
              height="auto"
              controls
            />
          )} */}
          <MediaMask />
        </MediaContainer>
        <Title>{title}</Title>
      </AssetItemContainer>
    </StyledLink>
  );
}
