import type { NextPage } from 'next'

import Router from 'next/router'

import { Flex, Button, SimpleGrid, HStack, Divider, VStack, Heading, Box, useToast } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError, AxiosResponse } from 'axios'

import { useMutation } from '@tanstack/react-query'
import { api } from '~/service/api'
import { Input } from '~/components/Form/Input'

import Head from 'next/head'
import { queryClient } from '~/service/queryClient'

type CreatePetshopFormData = {
    nome: string,
    longitude: string,
    latitude: string
}

const CreatePetshopFormSchema = yup.object().shape({
    nome: yup.string().required('Nome obrigatório'),
    longitude: yup.string().required('Nome obrigatório'),
    latitude: yup.string().required('Nome obrigatório')
})

const Home: NextPage = () => {

    const { register, handleSubmit, formState } = useForm<CreatePetshopFormData>({
        resolver: yupResolver(CreatePetshopFormSchema)
    })

    const { errors } = formState

    const toast = useToast()

    const create = useMutation(async (values: CreatePetshopFormData) => {
        return await api.post('/petshop/create', {
            ...values
        })
    }, {
        onSuccess: (response: AxiosResponse<any, any>) => {
            const message = response.data.message ?? 'Petshop criado com sucesso!'
            const type = response.data.type ?? 'Petshop criado com sucesso!'
            toast({
                description: message,
                status: type,
                duration: 9000,
                isClosable: true,
                position: "top-right"
            })
            Router.back()
            queryClient.invalidateQueries(['petshop'])
        },
        onError: (error: AxiosError<any, any>) => {
            const message = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Não foi possível realizar cadastro."

            const type = error.response && error.response.data && error.response.data.type
                ? error.response.data.type
                : "error"

            toast({
                description: message,
                status: type,
                duration: 9000,
                isClosable: true,
                position: "top-right"
            })
        }
    })

    const handleCreatePetshop: SubmitHandler<CreatePetshopFormData> = async (values) => {
        try {
            await create.mutateAsync(values)
        } catch { }
    }

    return (
        <>
            <Head>
                <title>Cadastro de Petshop | ApPet</title>
            </Head>
            <Box>
                <Flex
                    w="100%"
                    my="6"
                    maxWidth={1480}
                    mx="auto"
                    px="6"
                >

                    <Box
                        as="form"
                        flex="1"
                        borderRadius={8}
                        bg="white"
                        p={["6", "8"]}
                        onSubmit={handleSubmit(handleCreatePetshop)}
                    >
                        <Heading size="lg" fontWeight="normal">Criar petshop</Heading>

                        <Divider my="6" borderColor="gray.700" />

                        <VStack spacing="8">

                            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                <Input
                                    label="Nome do Petshop"
                                    placeholder='Digite o nome do petshop'
                                    error={errors.nome}
                                    {...register('nome')}
                                />
                            </SimpleGrid>
                            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                <Input
                                    label="Latitude"
                                    placeholder='Digite a Latitude'
                                    error={errors.latitude}
                                    {...register('latitude')}
                                />
                                <Input
                                    label="Longitude"
                                    placeholder='Digite o Longitude'
                                    error={errors.longitude}
                                    {...register('longitude')}
                                />
                            </SimpleGrid>
                        </VStack>

                        <Flex mt="8" justify="flex-end">
                            <HStack spacing="4">
                                <Button onClick={() => Router.back()} colorScheme="whiteAlpha">Cancelar</Button>
                                <Button
                                    type="submit"
                                    isLoading={formState.isSubmitting}
                                    colorScheme="pink"
                                >
                                    Salvar
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default Home
