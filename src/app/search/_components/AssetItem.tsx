import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { MediaType } from "@/modules/search/schemas";
import type { AssetItem as AssetItemType } from "@/modules/asset/schemas";
import useAsset from "@/modules/asset/useAsset";
import Skeleton from "@/components/Skeleton";

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

const StyledImage = styled.img`
  border-radius: 16px;
  object-fit: cover;
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
  width: 236px;

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
      return assetData
        .filter((item) => /.jpg$/.test(item.href))
        .sort(
          (a, b) =>
            getPriority(a.href, IMAGE_PRIORITIES) -
            getPriority(b.href, IMAGE_PRIORITIES),
        )[0]?.href;
    case MediaType.VIDEO:
      return assetData
        .filter((item) => /.jpg$/.test(item.href))
        .sort(
          (a, b) =>
            getPriority(a.href, IMAGE_PRIORITIES) -
            getPriority(b.href, IMAGE_PRIORITIES),
        )[0]?.href;
    default:
      return undefined;
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
  const [isLoading, setIsLoading] = useState(true);

  const href = getMediaHref(mediaType, assetData ?? []);

  return (
    <StyledLink href={`/asset/${id}`}>
      <AssetItemContainer>
        <MediaContainer>
          {href && (
            <StyledImage
              src={href}
              title={title}
              alt={id}
              width="100%"
              height="auto"
              onLoad={() => setIsLoading(false)}
              onError={(e) => console.error(e)}
            />
          )}
          {isLoading && <Skeleton style={{ width: 236, height: 236 }} />}
          <MediaMask />
        </MediaContainer>
        <Title>{title}</Title>
      </AssetItemContainer>
    </StyledLink>
  );
}
