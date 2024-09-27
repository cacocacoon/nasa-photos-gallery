import type { NextApiRequest, NextApiResponse } from "next";
import { nasaImagesApi } from "@/pages/api/utils";
import { isAxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const { query } = req;
        const { nasaId } = query;
        const { data, status } = await nasaImagesApi.get(`/asset/${nasaId}`);
        res.status(status).send(data);
      } catch (error) {
        if (isAxiosError(error)) {
          const { response } = error;
          const { data, status = 500 } = response ?? {};
          res.status(status).send(data);
        } else {
          res.status(500).send({ message: "Internal Server Error" });
        }
      }
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
