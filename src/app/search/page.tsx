import querySearch from "@/modules/search/querySearch";
import SearchContent from "./_components/SearchContent";
import { SEARCH_PATH } from "@/modules/search/constants";

type PageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function Page(props: PageProps) {
  const { searchParams } = props;
  const { q } = searchParams;
  const searchResponse = await querySearch({
    queryKey: [SEARCH_PATH, { q }],
    pageParam: 1,
  });

  const initialData = searchResponse
    ? {
        pages: [searchResponse],
        pageParams: [1],
      }
    : {
        pages: [],
        pageParams: [],
      };

  return <SearchContent key={q} initialData={initialData} />;
}
