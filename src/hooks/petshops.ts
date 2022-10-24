import { useQuery } from "@tanstack/react-query"
import { api } from "~/service/api"

export type Petshop = {
    id: string
	nome: string
	longitude: string
	latitude: string
}

type GetPetshopResponse = {
	petshop: Petshop[]
}

export async function getPetshop(): Promise<GetPetshopResponse> {
	const { data } = await api.get('petshop')

	return { petshop: data.petshops }
}

export function usePetshop() {
	return useQuery(['petshop'], () => getPetshop(), {
		staleTime: 1000 * 60 * 10 // 10 minutos
	})
}