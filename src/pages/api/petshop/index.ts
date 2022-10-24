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
        if (req.method === "GET") {
            const response = await fauna.query<any>(
				q.Map(
					q.Paginate(q.Documents(q.Collection('petshop'))),
					q.Lambda('x', q.Get(q.Var('x')))
				)
			)

			const petshops = response.data.map((petshop: any) => ({
				id: petshop.ref.id,
				nome: petshop.data.nome,
				longitude: petshop.data.longitude,
				latitude: petshop.data.latitude
			}))

			return res.status(200).json({ type: 'success', message: 'Consulta realizada com sucesso.', petshops })
        }
        else {
            res.setHeader('Allow', 'GET')
            res.status(405).end('Method not allowed')
        }
    } else {
        return res.status(405).json({ type: 'error', message: 'É necessário estar logado!' })
    }
}