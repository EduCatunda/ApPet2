import type { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { getSession } from 'next-auth/react'
import { fauna } from "~/service/fauna";

type ResponseData = {
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    petshops?: any
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const session = await getSession({ req })

    if (session && session.user && session.user.email) {
        if (req.method === "POST") {
            const { nome, latitude, longitude } = req.body

			const data = {
				nome, latitude, longitude
			}

			/*const hasCollection = await fauna.query(
				q.Exists(
					q.Match(
						q.Index('collection_by_user_id'),
						[user.ref.id, data.slug]
					)
				)
			)

			if (hasCollection) {
				return res.status(400).json({ type: 'warning', message: 'Já existe uma coleção com esse nome!' })
			} else {*/
				await fauna.query(
					q.Create(
						q.Collection('petshop'),
						{ data }
					)
				)

				return res.status(200).json({ type: 'success', message: 'Petshop cadastrado com sucesso!' })
			//}
        }
        else {
            res.setHeader('Allow', 'POST')
            res.status(405).end('Method not allowed')
        }
    } else {
        return res.status(405).json({ type: 'error', message: 'É necessário estar logado!' })
    }
}