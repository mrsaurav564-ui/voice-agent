è"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { motion } from "framer-motion"

export default function NewQuizPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const title = formData.get("title") as string
        const description = formData.get("description") as string

        try {
            const res = await fetch("/api/quizzes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            })

            if (res.ok) {
                const quiz = await res.json()
                router.push(`/admin/quizzes/${quiz.id}`)
                router.refresh()
            } else {
                alert("Failed to create quiz")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">Create New Quiz</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="glass-panel border-white/5 bg-white/5">
                    <CardHeader>
                        <CardTitle>Quiz Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input name="title" placeholder="e.g. Science Trivia 2024" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Input name="description" placeholder="Briefly describe what this quiz is about..." />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={() => router.back()}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-violet-600 to-pink-600 text-white border-0"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {loading ? "Creating..." : "Create Quiz"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
è*cascade082>file:///c:/quiz/src/app/%28admin%29/admin/quizzes/new/page.tsx