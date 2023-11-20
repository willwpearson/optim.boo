import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const response = await fetch('http://identity.optim.boo/connect/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            grant_type: 'password',
                            client_id: process.env.DUENDE_IDS6_ID,
                            client_secret: process.env.DUENDE_IDS6_SECRET,
                            username: credentials.username,
                            password: credentials.password,
                            scope:  "openid profile offline_access api1"
                        }),
                    })
        
                    const data = await response.json()
        
                    if (response.ok && data.access_token){
                        return Promise.resolve({
                            id: data.user_id,
                            name: data.user_name
                        })
                    } else {
                        return Promise.resolve(null)
                    }
                } catch (error) {
                    console.error('Authentication error: ', error)
                    return Promise.resolve(null)
                }
            }
        }),
        DuendeIDS6Provider({
            id: 'identity-server',
            authorization: {
                params: { scope: "openid profile api1" }
            },
            clientId: process.env.DUENDE_IDS6_ID,
            clientSecret: process.env.DUENDE_IDS6_SECRET,
            issuer: process.env.DUENDE_IDS6_ISSUER
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