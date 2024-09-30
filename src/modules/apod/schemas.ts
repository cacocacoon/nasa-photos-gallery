import { z } from "zod";
import { MediaType } from "@/modules/search/schemas";

export const ApodResponseSchema = z.object({
  copyright: z.string().optional(),
  date: z.coerce.string().date(),
  explanation: z.coerce.string(),
  hdurl: z.coerce.string().url(),
  media_type: z.nativeEnum(MediaType).default(MediaType.IMAGE),
  service_version: z.coerce.string(),
  title: z.coerce.string(),
  url: z.coerce.string().url(),
});

export type ApodResponse = z.infer<typeof ApodResponseSchema>;
