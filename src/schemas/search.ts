import { z } from "zod";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
}

const SearchItemSchema = z.object({
  data: z.array(
    z.object({
      nasa_id: z.coerce.string(),
      title: z.coerce.string(),
      center: z.string().optional(),
      date_created: z.coerce.string().datetime(),
      description: z.string().optional(),
      keywords: z.array(z.coerce.string()).optional(),
      media_type: z.nativeEnum(MediaType).default(MediaType.IMAGE),
    }),
  ),
});

export type SearchItem = z.infer<typeof SearchItemSchema>;

export const SearchResponseSchema = z.object({
  collection: z.object({
    href: z.coerce.string(),
    items: z.array(SearchItemSchema).default([]),
    links: z
      .array(
        z.object({
          href: z.coerce.string().url(),
          prompt: z.coerce.string(),
          rel: z.coerce.string(),
        }),
      )
      .optional(),
    metadata: z.object({
      total_hits: z.coerce.number(),
    }),
    version: z.coerce.string(),
  }),
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
