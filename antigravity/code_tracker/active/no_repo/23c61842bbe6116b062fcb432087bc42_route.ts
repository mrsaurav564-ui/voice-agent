£import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
£*cascade082;file:///c:/quiz/src/app/api/auth/%5B...nextauth%5D/route.ts