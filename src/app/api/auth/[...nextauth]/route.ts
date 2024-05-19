import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from 'next-auth';


const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                const { password, username } = credentials as { username: string; password: string; }
                const user: any = {
                    id: 1,
                    username,
                    role: "admin"
                }
                if (username === "ilham" && password === "123123123") {
                    return user
                }

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id
                token.username = user.username
                token.role = user.role
            }

            return token
        },

        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.role = token.role;
            }
            return session
        }
    },

    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)

export {
    handler as GET,
    handler as POST
}
