import Home from "@/app/_components/Home";
import getApod from "@/modules/apod/getApod";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data } = await getApod(
    new URLSearchParams({ thumbs: "true", count: "5" }),
  );
  return <Home data={data} />;
}
