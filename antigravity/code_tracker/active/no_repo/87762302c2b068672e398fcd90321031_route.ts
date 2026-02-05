èimport { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { quizId, title, type, order } = body

        if (!quizId || !title || !type) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        const round = await prisma.round.create({
            data: {
                quizId,
                title,
                type,
                order: order || 1
            }
        })

        return NextResponse.json(round)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create round" }, { status: 500 })
    }
}
è*cascade082+file:///c:/quiz/src/app/api/rounds/route.ts