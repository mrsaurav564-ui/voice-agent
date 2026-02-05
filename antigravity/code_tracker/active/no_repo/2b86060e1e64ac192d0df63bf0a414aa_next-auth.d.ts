”import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            role: string
        } & DefaultSession["user"]
    }

    interface User {
        role: string
    }
}
”*cascade082(file:///c:/quiz/src/types/next-auth.d.ts