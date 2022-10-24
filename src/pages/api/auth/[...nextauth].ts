import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from "faunadb"
import { fauna } from "~/service/fauna"


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,

        }),
        // ...add more providers here
    ],
    // secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email!)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('user'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email!)
                            )
                        )
                    )

                )
                return true
            }
            catch {
                return false
            }
        }
    }
}
export default NextAuth(authOptions)