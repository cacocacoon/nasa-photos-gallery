import { useEffect } from "react";
import styled from "styled-components";
import Gallery from "@/pages/search/_components/Gallery";
import useSearch from "@/modules/search/useSearch";

const ExploreMoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

type ExploreMoreProps = {
  keywords?: string[];
};

export default function ExploreMore(props: ExploreMoreProps) {
  const { keywords = [] } = props;
  const { data, fetchNextPage, isFetching, error } = useSearch({ keywords });

  useEffect(() => {
    if (isFetching) {
      return;
    }

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 1000 >=
        document.body.offsetHeight
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, fetchNextPage]);

  if (error) {
    throw error;
  }

  return (
    <ExploreMoreContainer>
      <h3>Explore More</h3>
      <Gallery searchItems={data} />
    </ExploreMoreContainer>
  );
}
