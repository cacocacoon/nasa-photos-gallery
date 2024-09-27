import { z } from "zod";

const AssetItemSchema = z.object({
  href: z.string().url(),
});

export type AssetItem = z.infer<typeof AssetItemSchema>;

export const AssetResponseSchema = z.object({
  collection: z.object({
    href: z.coerce.string().url(),
    items: z.array(AssetItemSchema).default([]),
    version: z.coerce.string(),
  }),
});

export type AssetResponse = z.infer<typeof AssetResponseSchema>;
