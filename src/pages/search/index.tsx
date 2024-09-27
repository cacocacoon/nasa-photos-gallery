import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import Gallery from "@/pages/search/_components/Gallery";
import useSearch from "@/modules/search/useSearch";

function SearchContent() {
  const router = useRouter();
  const { query } = router;
  const { q } = query;

  const { data, fetchNextPage, isFetching, error } = useSearch({
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

  return (
    <Gallery key={typeof q === "string" ? q : undefined} searchItems={data} />
  );
}

export default function Search() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
