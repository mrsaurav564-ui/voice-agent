´,"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, Brain, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboard() {
    const stats = [
        { label: "Total Students", value: "1,204", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Active Quizzes", value: "12", icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        { label: "Questions Bank", value: "850+", icon: Brain, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "Live Rounds", value: "3", icon: Zap, color: "text-red-400", bg: "bg-red-500/10" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of the quiz ecosystem.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="glass-panel border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.label}
                                    </CardTitle>
                                    <div className={`p-2 rounded-full ${stat.bg}`}>
                                        <Icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +20.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 glass-panel border-white/5 bg-white/5">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Student_{100 + i} joined "Science Quiz"
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            2 minutes ago
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-green-400">
                                        +100 pts
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 glass-panel border-white/5 bg-white/5">
                    <CardHeader>
                        <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Leaderboard Mock */}
                            <div className="flex items-center justify-between p-2 rounded bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">1</div>
                                    <span>CoolKid99</span>
                                </div>
                                <span className="font-mono text-purple-300">9,250</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-400/20 flex items-center justify-center text-gray-300 font-bold">2</div>
                                    <span>QuizMaster</span>
                                </div>
                                <span className="font-mono text-purple-300">8,940</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
´,*cascade0822file:///c:/quiz/src/app/%28admin%29/admin/page.tsx