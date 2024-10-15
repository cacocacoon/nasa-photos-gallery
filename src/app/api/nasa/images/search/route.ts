import { type NextRequest, NextResponse } from "next/server";
import tryFetch from "@/libs/tryFetch";
import getSearch from "@/modules/search/getSearch";

export async function GET(request: NextRequest) {
  return tryFetch(async () => {
    const { nextUrl } = request;
    const { searchParams } = nextUrl;
    const { data, status, statusText } = await getSearch(searchParams);

    return NextResponse.json(data, {
      status,
      statusText,
    });
  });
}
