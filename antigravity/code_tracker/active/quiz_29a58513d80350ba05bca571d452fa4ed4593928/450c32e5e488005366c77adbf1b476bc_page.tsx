Ø
import { prisma } from "@/lib/prisma"
import QuestionManager from "@/components/QuestionManager"

export default async function RoundPage({ params }: { params: Promise<{ id: string, roundId: string }> }) {
    const { roundId } = await params

    const round = await prisma.round.findUnique({
        where: { id: roundId },
        include: { questions: true }
    })

    if (!round) return <div>Round not found</div>

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{round.title}</h2>
                <p className="text-muted-foreground uppercase text-xs tracking-wider">{round.type} Round</p>
            </div>

            <QuestionManager roundId={round.id} initialQuestions={round.questions} />
        </div>
    )
}
F *cascade08FG*cascade08GØ *cascade08"(29a58513d80350ba05bca571d452fa4ed45939282Xfile:///c:/quiz/src/app/%28admin%29/admin/quizzes/%5Bid%5D/rounds/%5BroundId%5D/page.tsx:file:///c:/quiz