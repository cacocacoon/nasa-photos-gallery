import Home from "@/app/_components/Home";
import queryApod from "@/modules/apod/queryApod";

export default async function HomePage() {
  const apod = await queryApod();
  return <Home data={apod} />;
}
