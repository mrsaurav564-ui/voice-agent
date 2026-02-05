Ìimport { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Crown } from "lucide-react"

export default function LeaderboardPage() {
    const leaders = [
        { name: "QuizMaster99", score: 15400, rank: 1 },
        { name: "Brainiac_X", score: 14200, rank: 2 },
        { name: "LunaStar", score: 13800, rank: 3 },
        { name: "JohnDoe", score: 12100, rank: 4 },
        { name: "JaneSmith", score: 11500, rank: 5 },
    ]

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent inline-flex items-center gap-3">
                    <Trophy className="w-10 h-10 text-yellow-400" /> Leaderboard
                </h1>
                <p className="text-gray-400">The Hall of Fame üèÜ</p>
            </div>

            <div className="space-y-4">
                {leaders.map((player) => (
                    <Card
                        key={player.rank}
                        className={`
              glass-panel border-0 transition-all hover:scale-[1.02]
              ${player.rank === 1 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30' :
                                player.rank === 2 ? 'bg-white/10' :
                                    player.rank === 3 ? 'bg-orange-900/20' : 'bg-white/5'}
            `}
                    >
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-6">
                                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg
                  ${player.rank === 1 ? 'bg-yellow-500 text-black' :
                                        player.rank === 2 ? 'bg-gray-300 text-black' :
                                            player.rank === 3 ? 'bg-orange-600 text-white' : 'bg-white/10 text-gray-400'}
                `}>
                                    {player.rank <= 3 ? <Crown className="w-6 h-6" /> : player.rank}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{player.name}</h3>
                                    <p className="text-sm text-gray-400">Grandmaster</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-2xl font-mono font-bold text-emerald-400">{player.score.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">Points</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
Ì*cascade082:file:///c:/quiz/src/app/%28student%29/leaderboard/page.tsx