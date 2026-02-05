‘import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export default async function ScoresPage() {
    const results = await prisma.result.findMany({
        orderBy: { score: "desc" },
        include: {
            user: true,
            quiz: true
        }
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Student Scores</h2>

            <Card className="glass-panel border-white/5 bg-white/5">
                <CardContent className="p-0">
                    <div className="grid grid-cols-4 p-4 font-bold border-b border-white/10 text-gray-400 text-sm uppercase">
                        <div>User</div>
                        <div>Quiz</div>
                        <div>Score</div>
                        <div>Date</div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {results.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No scores recorded yet.</div>
                        ) : (
                            results.map((result: { id: string; user: { username: string | null }; quiz: { title: string }; score: number; completedAt: Date }) => (
                                <div key={result.id} className="grid grid-cols-4 p-4 items-center hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center text-xs font-bold text-violet-300">
                                            {result.user.username?.[0].toUpperCase()}
                                        </div>
                                        <span className="font-medium">{result.user.username}</span>
                                    </div>
                                    <div className="text-gray-300">{result.quiz.title}</div>
                                    <div className="font-mono text-emerald-400 font-bold">{result.score}</div>
                                    <div className="text-xs text-gray-500">{new Date(result.completedAt || Date.now()).toLocaleDateString()}</div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
×	 *cascade08×	Å
Å
‘ *cascade08"(29a58513d80350ba05bca571d452fa4ed459392829file:///c:/quiz/src/app/%28admin%29/admin/scores/page.tsx:file:///c:/quiz