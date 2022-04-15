// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import { GraphQLClient, gql } from 'graphql'
import { GraphQLClient } from 'graphql-request'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
export default function comments(req, res){
  const GraphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer `
    }
  })
}