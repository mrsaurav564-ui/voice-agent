‚import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    try {
        const announcements = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { sender: { select: { username: true } } }
        })
        return NextResponse.json(announcements)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { content } = await req.json()
        if (!content) return NextResponse.json({ error: "Content is required" }, { status: 400 })

        const announcement = await prisma.message.create({
            data: {
                content,
                senderId: session.user.id
            }
        })

        return NextResponse.json(announcement)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
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
        if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 })

        await prisma.message.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
    }
}
‚*cascade08"(29a58513d80350ba05bca571d452fa4ed459392822file:///c:/quiz/src/app/api/announcements/route.ts:file:///c:/quiz