import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Gallery from "@/pages/search/_components/Gallery";
import useSearch from "../../modules/search/useSearch";

const SearchContainer = styled.div``;

function SearchContent() {
  const router = useRouter();
  const { query } = router;
  const { q } = query;

  const { data, fetchNextPage, isFetching, isPending, error } = useSearch({
    q: typeof q === "string" ? q : undefined,
  });

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

  if (data.length === 0) {
    return null;
  }

  return (
    <SearchContainer>
      <Gallery
        key={typeof q === "string" ? q : undefined}
        searchItems={data}
        isLoading={isPending}
      />
    </SearchContainer>
  );
}

export default function Search() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
