// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  email: string,
  password?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if(req.method === "POST"){
    console.log(req.body);
    res.status(418);
  } else if(req.method === "GET") {
    res.status(200).json({ email: 'john.doe@example.com' })
  }
}
