import type { GetServerSideProps, NextPage } from 'next'

import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	VStack
} from '@chakra-ui/react'

import NextLink from 'next/link'

import { RiAddLine } from 'react-icons/ri'

import { getSession } from 'next-auth/react'

import { usePetshop } from '~/hooks/petshops'

import { CardPetshop } from '~/components/Petshop/CardPetshop'

export type Petshop = {
	id: string
	nome: string
	longitude: string
	latitude: string
}

interface PetshopsProps {
}

const Petshops: NextPage<PetshopsProps> = () => {

	const { data, isLoading, isFetching, error } = usePetshop()

	return (
		<>
			<VStack
				align="center"
				justify="center"
				maxW={1120}
				position="relative"
				m="0 auto"
				py="4"
			>
				<Box w="100%" flex="1" borderRadius="8" bg="white" p="8">
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Petshops
							{!isLoading && isFetching && (
								<Spinner
									size="sm"
									color="gray.500"
									ml="4"
								/>
							)}
						</Heading>
						<NextLink href="/petshops/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="green"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Criar novo
                            </Button>
                        </NextLink>
					</Flex>

					{isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center">
							<Text>Falha ao obter dados dos petshops.</Text>
						</Flex>
					) : (
						<>
							<TableContainer w="100%">
								<Table colorScheme="blackAlpha">
									<Thead>
										<Tr>
											<Th>Nome</Th>
										</Tr>
									</Thead>
									<Tbody>
										{data && data.petshop.map(ps => (
											<CardPetshop
												key={ps.id}
												petshop={ps}
											/>
										))}
									</Tbody>
								</Table>
							</TableContainer>
						</>
					)}
				</Box>
			</VStack>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession({ req: ctx.req })

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,

			}
		}
	}

	return {
		props: {},
	}
}

export default Petshops