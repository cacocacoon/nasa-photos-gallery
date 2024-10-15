import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

export default function tryFetch<T extends () => Response | Promise<Response>>(
  fetcher: T,
): Response | Promise<Response> {
  try {
    return fetcher();
  } catch (error) {
    console.error(error);
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
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
