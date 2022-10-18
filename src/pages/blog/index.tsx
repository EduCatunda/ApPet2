import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import * as Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { format, parseISO } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { getPrismicClient } from '../../service/prismic'
//import styles from './styles.module.scss'

import { Box, Text, Link as ChakraLink } from '@chakra-ui/react'

type Post = {
    slug: string
    title: string
    excerpt: string
    updatedAt: string
}

interface PostProps {
    posts: Post[]
}

export default function Posts({ posts }: PostProps) {
    return (
        <>
            <Head>
                <title>Blogs | ApPet</title>
            </Head>

            <Box maxW={'1120'} margin={'0 auto'} padding={'0 2rem'} >
                <Box maxW={'720'} m={'5rem auto 0'}>
                    {posts.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                           <ChakraLink _hover={{ color:'yellow.500' }}>
                            <Text as={'time'} display='block' fontSize={'1rem'} margin='1.5rem' >
                                {post.updatedAt}
                            </Text>
                            <Text as={'strong'}  >
                                {post.title}
                            </Text>
                            <Text as={'p'} margin='1.5rem 0'>
                                {post.excerpt}
                            </Text> 
                            </ChakraLink>
                        </Link>
                    ))}
                </Box> 
            </Box>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({previewData}) => {
    const client = getPrismicClient({previewData})

    const response = await client.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['post.title', 'post.content'],
        pageSize: 100
    })

    const posts = response.results.map((post:any) => {
        return {
            slug: post.uid,
            title: post.data.title,
            excerpt: post.data.content[0].body.find(
                    (content:any) => content.type === 'paragraph'
                )?.text ?? '',
            updatedAt: format(parseISO(post.last_publication_date), 'd MMMM y', {
                locale: ptBr
            })
        }
    })

    console.log(response)

    return {
        props: {
            posts, response
        }
    }
}