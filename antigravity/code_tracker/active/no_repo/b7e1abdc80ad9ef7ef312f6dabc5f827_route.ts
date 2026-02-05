†
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return NextResponse.json(
                { message: "Username and password are required" },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "Username already exists" },
                { status: 409 }
            )
        }

        const user = await prisma.user.create({
            data: {
                username,
                password, // Note: In production, hash this password!
                role: "STUDENT",
            },
        })

        return NextResponse.json(
            { message: "User created successfully", userId: user.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("Signup error:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
†
*cascade0820file:///c:/quiz/src/app/api/auth/signup/route.ts