import type { SEARCH_PATH } from "./constants";

export type SearchParams = {
  q?: string;
  nasa_id?: string;
  keywords?: string[];
};

export type SearchQueryKey = [typeof SEARCH_PATH, SearchParams];
