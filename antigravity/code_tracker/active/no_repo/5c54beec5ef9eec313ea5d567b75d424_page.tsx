ðimport { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import QuizGame from "./QuizGame"

export default async function PlayPage({ params }: { params: Promise<{ quizId: string }> }) {
    const { quizId } = await params

    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            rounds: {
                orderBy: { order: "asc" },
                include: {
                    questions: true
                }
            }
        }
    })

    if (!quiz) return notFound()

    // Transform data for the game engine if needed, or pass as is
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50">
            <QuizGame quiz={quiz} />
        </div>
    )
}
ð*cascade082@file:///c:/quiz/src/app/%28student%29/play/%5BquizId%5D/page.tsx