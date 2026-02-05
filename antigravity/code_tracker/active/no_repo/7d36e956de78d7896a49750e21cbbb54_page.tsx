∂=import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, TrendingUp, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function StudentDashboardPage() {
    const quizzes = await prisma.quiz.findMany({
        where: { isActive: true },
        include: { _count: { select: { rounds: true } } },
        orderBy: { createdAt: "desc" }
    })

    // Mock progress data
    const recentResults = [
        { quiz: "General Knowledge", score: 850, rank: 3, date: "2 mins ago" },
        { quiz: "Tech Trivia", score: 420, rank: 12, date: "1 hour ago" },
    ]

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <section className="relative overflow-hidden rounded-3xl glass-panel p-8 md:p-12">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">
                        Ready to Play?
                    </h1>

                    {/* Latest Announcement */}
                    <div className="bg-white/10 border border-white/10 rounded-lg p-4 mb-6 max-w-xl backdrop-blur-md">
                        <div className="flex items-center gap-2 text-pink-300 font-bold text-sm mb-1">
                            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                            NEWS UPDATE
                        </div>
                        <p className="text-gray-200 text-sm">
                            Stay tuned for the Grand Finale Quiz this Friday at 8 PM! üèÜ
                        </p>
                    </div>

                    <p className="text-lg text-gray-300 max-w-xl mb-6">
                        Compete with friends, climb the leaderboard, and prove your genius.
                    </p>
                    <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform hover:scale-105">
                        Join Random Game üé≤
                    </Button>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl -ml-10 -mb-10 animate-pulse delay-700" />
            </section>

            <div className="grid gap-8 md:grid-cols-12">
                {/* Available Quizzes */}
                <div className="md:col-span-8 space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="w-2 h-8 bg-teal-400 rounded-full" /> Trending Quizzes
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {quizzes.length === 0 ? (
                            <div className="col-span-full p-8 text-center text-gray-500 glass-panel rounded-xl">
                                No active quizzes right now. Ask your admin to drop one! üê¢
                            </div>
                        ) : (
                            quizzes.map((quiz: { id: string; title: string; description: string | null }) => (
                                <Card key={quiz.id} className="group glass-panel border-white/5 bg-white/5 hover:bg-white/10 transition-all hover:-translate-y-1">
                                    <CardHeader>
                                        <CardTitle className="truncate">{quiz.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-gray-400 line-clamp-2 h-10">
                                            {quiz.description || "Jump in and show what you've got!"}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> 20 mins
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" /> 1.2k plays
                                            </span>
                                        </div>
                                        <Link href={`/play/${quiz.id}`} className="block">
                                            <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 border-0 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-shadow">
                                                <Play className="w-4 h-4 mr-2 group-hover:fill-current" /> Play Now
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar: Stats & Activity */}
                <div className="md:col-span-4 space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="w-2 h-8 bg-purple-400 rounded-full" /> Recent Activity
                    </h2>

                    <Card className="glass-panel border-white/5 bg-white/5">
                        <CardContent className="p-0">
                            {recentResults.map((result, i) => (
                                <div key={i} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold">{result.quiz}</h4>
                                        <span className="text-xs text-gray-500">{result.date}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-emerald-400 font-mono">{result.score} pts</span>
                                        <span className="text-purple-400 text-xs">Rank #{result.rank}</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-panel border-white/5 bg-gradient-to-br from-purple-900/20 to-blue-900/20 overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg">Weekly Rank</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-center py-4 text-purple-200">
                                #42
                            </div>
                            <p className="text-xs text-center text-purple-300">Top 15% of players</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
«	 *cascade08«	€*cascade08€Õ *cascade08Õà*cascade08à∂= *cascade0828file:///c:/quiz/src/app/%28student%29/dashboard/page.tsx