"use client";

import { useQuery } from "@tanstack/react-query";
import { type Apods } from "@/modules/apod/schemas";
import { APOD_PATH } from "@/modules/apod/constants";
import queryApod from "@/modules/apod/queryApod";

export default function useApod() {
  return useQuery<Apods, Error, Apods, [typeof APOD_PATH]>({
    queryKey: [APOD_PATH],
    queryFn: queryApod,
  });
}
