import { ReactElement, cloneElement } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"

interface ActiveLinkProps extends LinkProps {
    children: ReactElement
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
    const { asPath } = useRouter()

    const isActive = asPath === rest.href

    return (
        <Link {...rest}>
            {cloneElement(children, { color: isActive ? 'yellow.500' : 'inherit', fontWeight: 'bold' } )}
        </Link>
    )
}