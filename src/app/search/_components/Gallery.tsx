"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import type { SearchItem } from "@/modules/search/schemas";
import AssetItem from "@/app/search/_components/AssetItem";

const COLUMN_WIDTH = 236;
const GAP_WIDTH = 16;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const GalleryTable = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: ${GAP_WIDTH}px;
  justify-content: center;
`;

const GalleryColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${GAP_WIDTH}px;
  width: ${COLUMN_WIDTH}px;
  height: fit-content;
`;

type GalleryProps = {
  searchItems: SearchItem[];
};

export default function Gallery(props: GalleryProps) {
  const { searchItems } = props;
  const containerRef = useRef(null);
  const [columnCount, setColumnCount] = useState(0);

  const columnsData = useMemo(() => {
    const newColumnsData = Array.from(
      { length: columnCount },
      () => [] as SearchItem[],
    );
    for (
      let nextRenderItemIndex = 0, currentColumnIndex = 0;
      nextRenderItemIndex < searchItems.length;
      ++nextRenderItemIndex, ++currentColumnIndex
    ) {
      if (currentColumnIndex === columnCount) {
        currentColumnIndex = 0;
      }
      newColumnsData[currentColumnIndex]?.push(
        searchItems[nextRenderItemIndex],
      );
    }

    return newColumnsData;
  }, [searchItems, columnCount]);

  // init columnsCount
  useEffect(() => {
    if (!containerRef.current) {
      return () => {};
    }
    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      let newColumnCount = 0;
      let contentWidth = 0;
      do {
        newColumnCount += 1;

        if (newColumnCount > 1) {
          contentWidth += GAP_WIDTH;
        }

        contentWidth += COLUMN_WIDTH;
      } while (contentWidth + GAP_WIDTH + COLUMN_WIDTH < width);

      setColumnCount(newColumnCount);
    });

    const containerDom = containerRef.current;
    observer.observe(containerDom);

    return () => {
      observer.unobserve(containerDom);
    };
  }, []);

  return (
    <GalleryContainer ref={containerRef}>
      <GalleryTable>
        {columnsData.map((columnData, index) => (
          <GalleryColumn key={index}>
            {columnData.map((item, index) => (
              <Fragment key={index}>
                {item.data.map((searchItem) => (
                  <AssetItem
                    key={searchItem.nasa_id}
                    id={searchItem.nasa_id}
                    title={searchItem.title}
                    mediaType={searchItem.media_type}
                  />
                ))}
              </Fragment>
            ))}
          </GalleryColumn>
        ))}
      </GalleryTable>
    </GalleryContainer>
  );
}
