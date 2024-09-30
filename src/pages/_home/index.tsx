import useApod from "@/modules/apod/useApod";

export default function Home() {
  const { data: apodData } = useApod();
  console.log(apodData);
  return <div>Home 123</div>;
}
