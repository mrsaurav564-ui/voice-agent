²"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Shield, Save } from "lucide-react"

export default function ProfilePage() {
    const { data: session } = useSession()

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                    {session?.user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{session?.user?.name || "Student"}</h2>
                    <p className="text-muted-foreground">{session?.user?.email || "student@quizgenz.com"}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass-panel border-white/5 bg-white/5">
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <User className="w-4 h-4" /> Username
                            </label>
                            <Input defaultValue={session?.user?.name || ""} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Shield className="w-4 h-4" /> Password
                            </label>
                            <Input type="password" placeholder="Change password" />
                        </div>
                        <Button className="w-full bg-violet-600 hover:bg-violet-500">
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </CardContent>
                </Card>

                <Card className="glass-panel border-white/5 bg-gradient-to-br from-violet-900/20 to-pink-900/20">
                    <CardHeader>
                        <CardTitle>Your Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-white/5">
                            <span>Total Score</span>
                            <span className="text-2xl font-bold text-violet-300">12,450</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg bg-white/5">
                            <span>Global Rank</span>
                            <span className="text-2xl font-bold text-pink-300">#42</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg bg-white/5">
                            <span>Quizzes Played</span>
                            <span className="text-2xl font-bold text-teal-300">15</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
²*cascade0826file:///c:/quiz/src/app/%28student%29/profile/page.tsx