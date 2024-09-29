import type { NextApiRequest, NextApiResponse } from "next";
import { nasaImagesAssetsApi } from "@/modules/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const { query } = req;
      const { mediaType, nasaId, filename } = query;
      const response = await nasaImagesAssetsApi.get(
        `/${mediaType}/${nasaId}/${filename}`,
        { responseType: "stream" },
      );
      const { data, status } = response;
      res.status(status).send(data);
      break;
    }
    default: {
      res.setHeader("Allow", "GET");
      res
        .status(405)
        .json({ message: `Error 405: Method ${method} Not Allowed` });
    }
  }
}
