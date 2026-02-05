™import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        // admin check
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { roundId, content, options, answer, points, timeLimit } = body

        if (!roundId || !content || !answer || !options) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const question = await prisma.question.create({
            data: {
                roundId,
                content,
                options: JSON.stringify(options), // Expecting array of strings
                answer,
                points: points || 10,
                timeLimit: timeLimit || 30
            }
        })

        return NextResponse.json(question)
    } catch (error) {
        console.error("Create Question Error:", error)
        return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Given ID is missing" }, { status: 400 })
        }

        await prisma.question.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete question" }, { status: 500 })
    }
}
™*cascade08"(29a58513d80350ba05bca571d452fa4ed45939282.file:///c:/quiz/src/app/api/questions/route.ts:file:///c:/quiz