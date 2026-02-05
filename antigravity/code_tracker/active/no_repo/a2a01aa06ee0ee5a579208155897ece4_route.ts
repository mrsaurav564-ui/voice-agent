®import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
    try {
        const quizzes = await prisma.quiz.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                rounds: {
                    include: { questions: true }
                }
            }
        })
        return NextResponse.json(quizzes)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        // TODO: Strict Admin Check
        // if (!session || session.user.role !== 'ADMIN') {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        // }

        const body = await req.json()
        const { title, description } = body

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 })
        }

        const quiz = await prisma.quiz.create({
            data: {
                title,
                description,
                isActive: false // Draft by default
            }
        })

        return NextResponse.json(quiz)
    } catch (error) {
        console.error("Create Quiz Error:", error)
        return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 })
    }
}
®*cascade082,file:///c:/quiz/src/app/api/quizzes/route.ts