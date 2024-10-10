import { NextResponse, type NextRequest } from "next/server";
import { nasaApi } from "@/modules/utils";
import tryFetch from "@/libs/tryFetch";

export async function GET(request: NextRequest) {
  return tryFetch(async () => {
    const { nextUrl } = request;
    const { searchParams } = nextUrl;
    const { data, status, statusText } = await nasaApi.get("/planetary/apod", {
      params: searchParams,
    });

    return NextResponse.json(data, {
      status,
      statusText,
    });
  });
}
