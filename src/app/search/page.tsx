import SearchContent from "./_components/SearchContent";
import getSearch from "@/modules/search/getSearch";
import { MediaType } from "@/modules/search/schemas";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function Page(props: PageProps) {
  const { searchParams } = props;
  const { q } = searchParams;

  const { data: searchResponse } = await getSearch(
    new URLSearchParams({
      q: q!,
      page: "1",
      page_size: "50",
      media_type: `${MediaType.IMAGE},${MediaType.VIDEO}`,
    }),
  );

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
