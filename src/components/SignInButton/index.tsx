import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton() {
	// const { data } = useSession()

	return (
		<Button
			size="lg"
			rounded="full"
			colorScheme="yellow"
			onClick={() => signIn('github')}
		>
			<Icon as={FaGithub} color="black" />

		</Button >
	)
}