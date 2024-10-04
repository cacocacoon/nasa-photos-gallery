import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { nasaApi } from "@/modules/utils";

export async function GET() {
  try {
    const { data, status, statusText } = await nasaApi.get("/planetary/apod");

    return NextResponse.json(data, {
      status,
      statusText,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      const { response } = error;
      const {
        data,
        status = 500,
        statusText = "Internal Server Error",
      } = response ?? {};
      return NextResponse.json(data, { status, statusText });
    } else if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500, statusText: "Internal Server Error" },
      );
    } else {
      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
