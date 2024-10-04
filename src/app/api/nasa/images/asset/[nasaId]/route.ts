import { type NextRequest, NextResponse } from "next/server";
import { nasaImagesApi } from "@/modules/utils";
import tryFetch from "@/libs/tryFetch";

type Params = {
  nasaId: string;
};

export function GET(request: NextRequest, { params }: { params: Params }) {
  const { nasaId } = params;
  return tryFetch(async () => {
    const { data, status, statusText } = await nasaImagesApi.get(
      `/asset/${nasaId}`,
    );
    return NextResponse.json(data, {
      status,
      statusText,
    });
  });
}
