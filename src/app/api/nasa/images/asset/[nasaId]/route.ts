import { type NextRequest, NextResponse } from "next/server";
import tryFetch from "@/libs/tryFetch";
import getAsset from "@/modules/asset/getAsset";

type Params = {
  nasaId: string;
};

export function GET(request: NextRequest, { params }: { params: Params }) {
  const { nasaId } = params;
  return tryFetch(async () => {
    const { data, status, statusText } = await getAsset(nasaId);
    return NextResponse.json(data, {
      status,
      statusText,
    });
  });
}
