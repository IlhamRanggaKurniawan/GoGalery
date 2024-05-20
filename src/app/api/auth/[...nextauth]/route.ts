import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions, Session, User } from 'next-auth';
import { prisma } from '@/lib/dataStorage/db';
import { compare } from 'bcrypt';
import { JWT } from 'next-auth/jwt';
  

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

                const {username, password} = credentials as { username: string, password: string}

                const user: User | null = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })

                if (!user) {
                    throw new Error('No user found');
                }

                const isPasswordValid = await compare(password, user.password)

                if(!isPasswordValid) {
                    throw new Error("invalid password")
                }

                return {
                    ...user,
                    id: String(user.id)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: {token: JWT, user: User}) {

            if (user) {
                token.id = user.id
                token.username = user.username
                token.role = user.role
            }

            return token
        },

        async session({ session, token }: {session: Session, token: JWT}) {
        
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
