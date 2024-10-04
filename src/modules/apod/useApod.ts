"use client";

import { useQuery } from "@tanstack/react-query";
import { type ApodResponse } from "@/modules/apod/schemas";
import { APOD_PATH } from "@/modules/apod/constants";
import queryApod from "@/modules/apod/queryApod";

export default function useApod() {
  return useQuery<ApodResponse, Error, ApodResponse, [typeof APOD_PATH]>({
    queryKey: [APOD_PATH],
    queryFn: queryApod,
  });
}
