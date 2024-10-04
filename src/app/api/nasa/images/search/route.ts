import { type NextRequest, NextResponse } from "next/server";
import { nasaImagesApi } from "@/modules/utils";
import tryFetch from "@/libs/tryFetch";

export async function GET(request: NextRequest) {
  return tryFetch(async () => {
    const { nextUrl } = request;
    const { searchParams } = nextUrl;
    const { data, status, statusText } = await nasaImagesApi.get("/search", {
      params: searchParams,
    });

    return NextResponse.json(data, {
      status,
      statusText,
    });
  });
}
