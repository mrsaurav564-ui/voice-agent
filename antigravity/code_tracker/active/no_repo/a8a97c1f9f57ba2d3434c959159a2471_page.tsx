Ï$import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Plus, Trash2, Edit, Play } from "lucide-react"
import AddRoundButton from "@/components/AddRoundButton"

export default async function QuizDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const quiz = await prisma.quiz.findUnique({
        where: { id },
        include: {
            rounds: {
                orderBy: { order: "asc" },
                include: { _count: { select: { questions: true } } }
            }
        }
    })

    if (!quiz) return notFound()

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/quizzes">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">{quiz.title}</h2>
                        <p className="text-muted-foreground max-w-xl">{quiz.description}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                    <Button className="bg-green-600 hover:bg-green-500 text-white border-0">
                        <Play className="w-4 h-4 mr-2" /> Launch Quiz
                    </Button>
                </div>
            </div>

            {/* Rounds Section */}
            <div className="grid gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Rounds ({quiz.rounds.length})</h3>
                    <AddRoundButton quizId={quiz.id} />
                </div>

                {quiz.rounds.length === 0 ? (
                    <div className="text-center py-12 glass-panel rounded-xl border-dashed border-2 border-white/10">
                        <p className="text-muted-foreground">No rounds yet. Let's add some chaos! üå∂Ô∏è</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {quiz.rounds.map((round: { id: string; order: number; title: string; type: string; _count: { questions: number } }) => (
                            <Card key={round.id} className="glass-panel border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center font-bold text-violet-400">
                                            {round.order}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{round.title}</h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="bg-white/10 px-2 py-0.5 rounded text-xs uppercase">{round.type}</span>
                                                <span>{round._count.questions} questions</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={`/admin/quizzes/${id}/rounds/${round.id}`}>
                                            <Button variant="ghost" size="sm">Edit Questions</Button>
                                        </Link>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
æ *cascade08æ¯*cascade08¯æ *cascade08æ∆*cascade08∆‘ *cascade08‘’*cascade08’⁄ *cascade08⁄˚*cascade08˚º *cascade08ºƒ*cascade08ƒÀ *cascade08ÀÕ*cascade08Õœ *cascade08œ—*cascade08—“ *cascade08“ÿ*cascade08ÿ⁄ *cascade08⁄€*cascade08€¢ *cascade08¢§ *cascade08§π*cascade08π∫ *cascade08∫—*cascade08—“ *cascade08“˝*cascade08˝© *cascade08©é *cascade08é ≥  *cascade08≥ Ω *cascade08Ω ≈  *cascade08≈ ˆ *cascade08ˆ Ï$ *cascade082Cfile:///c:/quiz/src/app/%28admin%29/admin/quizzes/%5Bid%5D/page.tsx