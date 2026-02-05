¼import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { quizId, score } = await req.json()

        const result = await prisma.result.create({
            data: {
                userId: session.user.id,
                quizId,
                score
            }
        })

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: "Failed to save result" }, { status: 500 })
    }
}
¼*cascade082,file:///c:/quiz/src/app/api/results/route.ts