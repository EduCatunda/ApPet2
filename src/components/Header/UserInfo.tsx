import { Button, HStack, Icon, Text, Avatar } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGithub } from 'react-icons/fa'
import { FiPower } from 'react-icons/fi'

export function UserInfo() {
    const { data } = useSession()

    if (!data || !data.user) return null

    return (
        <HStack>
            {data.user.name && data.user.image && (
                <Avatar
                    name={data.user.name}
                    src={data.user.image}
                />
            )}

            <Text>
                {data.user.name}
            </Text>
            <Button
                size="md"
                rounded="full"
                colorScheme="red"
                variant="outline"
                onClick={() => signOut()}
            >
                <Icon as={FiPower} />

            </Button >
        </HStack>
    )
}