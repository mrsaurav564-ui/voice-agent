Œimport Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Clock, PlayCircle, Edit } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function QuizzesPage() {
    const quizzes = await prisma.quiz.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { rounds: true } } }
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
                    <p className="text-muted-foreground">Manage your quiz events.</p>
                </div>
                <Link href="/admin/quizzes/new">
                    <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 border-0">
                        <Plus className="mr-2 h-4 w-4" /> Create Quiz
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {quizzes.length === 0 ? (
                    <div className="col-span-full text-center py-12 glass-panel rounded-xl">
                        <p className="text-muted-foreground">No quizzes found. Create one to get started!</p>
                    </div>
                ) : (
                    quizzes.map((quiz) => (
                        <Card key={quiz.id} className="glass-panel border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 text-left">
                                <CardTitle className="text-xl font-bold truncate pr-4">{quiz.title}</CardTitle>
                                <div className={`px-2 py-1 rounded-full text-xs font-bold ${quiz.isActive ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                                    }`}>
                                    {quiz.isActive ? "LIVE" : "DRAFT"}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                    {quiz.description || "No description provided."}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <PlayCircle className="w-4 h-4" /> {quiz._count.rounds} Rounds
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/admin/quizzes/${quiz.id}`} className="w-full">
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/10">
                                            <Edit className="w-4 h-4 mr-2" /> Manage
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
Œ*cascade082:file:///c:/quiz/src/app/%28admin%29/admin/quizzes/page.tsx