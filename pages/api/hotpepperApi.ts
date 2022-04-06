import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const respose = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY}&keyword=${req.query.keyword}&start=${req.query.start}&format=json`
  );

  const data = await respose.json();
  res.status(200).json({ data });
}
