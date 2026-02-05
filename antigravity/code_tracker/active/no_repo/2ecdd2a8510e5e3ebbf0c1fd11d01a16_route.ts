èimport { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: {
                rounds: {
                    orderBy: { order: "asc" },
                    include: {
                        questions: true // Fetch questions for the game
                    }
                }
            }
        })

        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
        }

        return NextResponse.json(quiz)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 })
    }
}
è*cascade0825file:///c:/quiz/src/app/api/quizzes/%5Bid%5D/route.ts