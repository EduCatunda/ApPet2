import {
    Td,
    Tr
} from '@chakra-ui/react'
import { FC } from 'react'

type Petshop = {
    id: string
    nome: string
    longitude: string
    latitude: string
}

interface CardPetshopProps {
    petshop: Petshop
}

export const CardPetshop: FC<CardPetshopProps> = ({ petshop }) => {
    return (
        <Tr key={petshop.id} px="6">
            <Td px={["4", "4", "6"]}>
                {petshop.nome}
            </Td>
        </Tr>
    )
}