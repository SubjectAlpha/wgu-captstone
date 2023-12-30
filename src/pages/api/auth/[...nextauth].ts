import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// https://www.youtube.com/watch?v=w2h54xz6Ndw

const handler = NextAuth({
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
            console.log(credentials?.email)
            return {
                id: 1,
                email: "test",
                password: "test"
            }
        }
    })],
});

export default handler
export { handler as GET, handler as POST }
