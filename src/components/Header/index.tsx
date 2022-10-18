import { Flex, HStack, Link } from '@chakra-ui/react'
import { Logo } from './Logo'
import { UserInfo } from './UserInfo'
import { useSession } from 'next-auth/react'
import { ActiveLink } from './ActiveLink'

export function Header() {
    const { data } = useSession()
    return (
        <Flex
            as="header"
            w="100%"
            h="20"
            mt="4"
            px="6"
            borderBottom={'2px'}
        >
            <Flex
                align="center"
                justify="space-between"
                maxWidth={1480}
                mx="auto"
                w="100%"
            >

                <HStack>
                    <Logo />
                    <ActiveLink href='/' >
                        <Link >
                            Home
                        </Link>
                    </ActiveLink>
                    <ActiveLink href='/blog' >
                        <Link>
                            Blog
                        </Link>
                    </ActiveLink>
                </HStack>
                <UserInfo />

            </Flex>

        </Flex>
    )
}