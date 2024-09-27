import { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { SearchItem } from "@/schemas/search";
import AssetItem from "@/pages/search/AssetItem";

const COLUMN_WIDTH = 236;
const GAP_WIDTH = 16;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GalleryTable = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: ${GAP_WIDTH}px;
  justify-content: center;
  padding: 16px;
`;

const GalleryColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${GAP_WIDTH}px;
  width: ${COLUMN_WIDTH}px;
  height: fit-content;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  font-size: 32px;
`;

type GalleryProps = {
  searchItems: SearchItem[];
  isLoading: boolean;
};

export default function Gallery(props: GalleryProps) {
  const { searchItems, isLoading } = props;
  const containerRef = useRef(null);
  const [columnCount, setColumnCount] = useState(0);
  const [columnsData, setColumnsData] = useState<SearchItem[][]>([]);
  const [currentRenderItemIndex, setCurrentRenderItemIndex] = useState(0);

  // init columnsData
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

      if (columnCount === newColumnCount) {
        return;
      }

      setColumnCount(newColumnCount);
      setCurrentRenderItemIndex(0);
      setColumnsData(Array.from({ length: newColumnCount }, () => []));
    });

    const containerDom = containerRef.current;
    observer.observe(containerDom);

    return () => {
      observer.unobserve(containerDom);
    };
  }, [columnCount]);

  // fill new items
  useEffect(() => {
    if (currentRenderItemIndex === searchItems.length - 1) {
      return;
    }

    for (
      let nextRenderItemIndex = currentRenderItemIndex + 1,
        currentColumnIndex = 0;
      nextRenderItemIndex < searchItems.length;
      ++nextRenderItemIndex, ++currentColumnIndex
    ) {
      if (currentColumnIndex === columnCount) {
        currentColumnIndex = 0;
      }
      columnsData[currentColumnIndex] = [
        ...(columnsData[currentColumnIndex] ?? []),
        searchItems[nextRenderItemIndex],
      ];
    }

    setColumnsData([...columnsData]);
    setCurrentRenderItemIndex(searchItems.length - 1);
  }, [searchItems, currentRenderItemIndex, columnCount, columnsData]);

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
      {isLoading && <LoadingContainer>Loading...</LoadingContainer>}
    </GalleryContainer>
  );
}
