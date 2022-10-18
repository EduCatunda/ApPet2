import type { NextPage } from 'next'

import { Flex, Button, Stack, HStack, AspectRatio, VStack, Text, Heading } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'

import { SignInButton } from '~/components/SignInButton'

import Head from 'next/head'

type SignInFormData = {
  email: string
  password: string
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

const Home: NextPage = () => {

  const { data } = useSession()

  return (
    <>
      <Head>
        <title>Home | ApPet</title>
      </Head>
      <Flex
        align="center"
        justify="center"
      >
        <HStack
          w='100%'
          h='100%'
          maxWidth={1120}
          align='center'
        >
          <AspectRatio ratio={16 / 9} w='100%'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng'
            />
          </AspectRatio>
          <VStack
            w='100%'
            align='center'
            justify='center'
          >
            <Text
              as='span'
              fontSize={'lg'}
            >
              Saudações
            </Text>
            <Heading
              textAlign='center'
            >
              Boas vindas. <br />Encontre os petshops mais perto de você no mapa ao lado.
            </Heading>

            {!data && (
              <>
                <Text
                  as='span'
                  fontSize={'lg'}
                >
                  Efetue seu login clicando no botão abaixo
                </Text>

                <SignInButton />
              </>
            )}

          </VStack>
        </HStack>
      </Flex>
    </>
  )
}

export default Home
