import NextAuth from "next-auth/next"
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
    providers: [
        DuendeIDS6Provider({
            id: 'identity-server',
            name: 'IdentityServer',
            authorization: {
                params: { scope: 'openid profile api1' },
            },
            issuer: 'https://',
            clientId: 'optim.boo',
            clientSecret: 'secret'
        }),
        GithubProvider({
            id: 'github',
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        },
        async jwt({ token, user }) {
            if (user){
                token.accessToken = user.accessToken
            }
            return token
        }
    },
    pages: {
        signIn: '/account/login'
    }
})