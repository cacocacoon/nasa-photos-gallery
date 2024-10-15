import { NextResponse, type NextRequest } from "next/server";
import tryFetch from "@/libs/tryFetch";
import getApod from "@/modules/apod/getApod";

export async function GET(request: NextRequest) {
  return tryFetch(async () => {
    const { nextUrl } = request;
    const { searchParams } = nextUrl;
    const { data, status, statusText } = await getApod(searchParams);

    return NextResponse.json(data, {
      status,
      statusText,
    });
  });
}
