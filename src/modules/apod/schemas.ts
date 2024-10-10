import { z } from "zod";
import { MediaType } from "@/modules/search/schemas";

export const ApodSchema = z.object({
  copyright: z.string().optional(),
  date: z.coerce.string().date(),
  explanation: z.coerce.string(),
  hdurl: z.coerce.string().url().optional(),
  media_type: z.nativeEnum(MediaType).default(MediaType.IMAGE),
  service_version: z.coerce.string(),
  title: z.coerce.string(),
  url: z.coerce.string().url(),
});

export type Apod = z.infer<typeof ApodSchema>;

export const ApodsSchema = z.array(ApodSchema);

export type Apods = z.infer<typeof ApodsSchema>;
