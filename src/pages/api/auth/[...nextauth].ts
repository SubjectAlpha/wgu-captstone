import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { Compare } from "@/opencms/utility/pwd";
import prisma from "@/opencms/utility/prisma";
import { Users } from "@prisma/client";

const handler = NextAuth({
    pages: {
        signIn: '/auth/signIn',
        error: "/auth/error",
        // verifyRequest: '/auth/verify-request', // (used for check email message) implement this with smtp docker img?
    },
    providers: [Credentials({
        credentials: {
            email: {
                label: "Email:",
                type: "text",
                placeholder: "Email"
            },
            password: {
                label: "Password:",
                type: "password",
                placeholder: "Password"
            }
        },
        async authorize(credentials) {
            // Retrieve user data check next auth docs
            if (!credentials?.email || !credentials?.password){
                return null;
            }

            const user = await prisma.users.findUnique({
                where: {
                    email: credentials.email
                }
            });

            if(!user) {
                return null;
            }

            if(Compare(credentials.password, user.password)){
                return user;
            }

            return null;
        },
    })],
    callbacks: {
        async jwt({token, user}) {
            const convertedUser = user as Users;
            if (convertedUser?.id) {
                token.id = convertedUser.id
            }
            if (convertedUser?.email) {
                token.email = convertedUser.email;
            }
            if(convertedUser?.name) {
                token.name = convertedUser.name
            }
            if(convertedUser?.permission) {
                token.permission = convertedUser.permission;
            }
            return token
        },
        async session({session, token, user}) {
            session.user = token as Users;
            (session.user as Users).permission = token.permission as number;
            return session;
        }
    }
});

export default handler
export { handler as GET, handler as POST }
