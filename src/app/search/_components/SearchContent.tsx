"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { type InfiniteData } from "@tanstack/react-query";
import type { SearchResponse } from "@/modules/search/schemas";
import useSearch from "@/modules/search/useSearch";
import Gallery from "@/app/search/_components/Gallery";

type SearchContentProps = {
  initialData?: InfiniteData<SearchResponse, number>;
};

export default function SearchContent(props: SearchContentProps) {
  const { initialData } = props;
  const searchParams = useSearchParams();
  const q = searchParams?.get("q") ?? undefined;
  const { data, fetchNextPage, isFetching, error } = useSearch(
    { q },
    initialData,
  );

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

  if (!data) {
    return null;
  }

  if (error) {
    throw error;
  }

  return <Gallery searchItems={data} />;
}
