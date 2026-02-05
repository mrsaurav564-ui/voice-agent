ÍN"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Trash2, Plus, Clock, Star, Sparkles } from "lucide-react"

export default function QuestionManager({ roundId, initialQuestions }: { roundId: string, initialQuestions: any[] }) {
    const router = useRouter()
    const [questions, setQuestions] = useState(initialQuestions)
    const [isAdding, setIsAdding] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [formData, setFormData] = useState({
        content: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
        points: 10,
        timeLimit: 30
    })

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this question?")) return

        await fetch(`/api/questions?id=${id}`, { method: "DELETE" })
        setQuestions(questions.filter(q => q.id !== id))
        router.refresh()
    }

    const handleAIGenerate = async () => {
        if (!formData.content) {
            alert("Please provide a question first!")
            return
        }
        setAiLoading(true)
        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: formData.content })
            })
            if (res.ok) {
                const data = await res.json()
                setFormData(prev => ({
                    ...prev,
                    optionA: data.options[0],
                    optionB: data.options[1],
                    optionC: data.options[2],
                    optionD: data.options[3],
                    answer: data.answer
                }))
            }
        } catch (error) {
            console.error(error)
            alert("AI nap time. Try again later.")
        } finally {
            setAiLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const options = [formData.optionA, formData.optionB, formData.optionC, formData.optionD]

        if (!options.includes(formData.answer)) {
            alert("Answer must match one of the options exactly!")
            return
        }

        const res = await fetch("/api/questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                roundId,
                content: formData.content,
                options,
                answer: formData.answer,
                points: Number(formData.points),
                timeLimit: Number(formData.timeLimit)
            })
        })

        if (res.ok) {
            const newQuestion = await res.json()
            setQuestions([...questions, newQuestion])
            setIsAdding(false)
            setFormData({
                content: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                answer: "",
                points: 10,
                timeLimit: 30
            })
            router.refresh()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Quiz
                </Button>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-gradient-to-r from-violet-600 to-pink-600 border-0">
                    <Plus className="w-4 h-4 mr-2" /> {isAdding ? "Cancel" : "Add Question"}
                </Button>
            </div>

            {isAdding && (
                <Card className="glass-panel border-white/10 bg-white/5 animate-in slide-in-from-top-4">
                    <CardHeader><CardTitle>New Question</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Question Text</label>
                                <div className="flex gap-2">
                                    <Input name="content" value={formData.content} onChange={handleChange} required placeholder="What is the capital of France?" className="flex-1" />
                                    <Button type="button" onClick={handleAIGenerate} disabled={aiLoading} className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0">
                                        {aiLoading ? (
                                            <Sparkles className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Sparkles className="w-4 h-4 mr-2" />
                                        )}
                                        {aiLoading ? "Generating..." : "Auto-Fill"}
                                    </Button>
                                </div>
                                <p className="text-xs text-blue-300 mt-1">âœ¨ Type a question and let AI generate the options!</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm">Option A</label><Input name="optionA" value={formData.optionA} onChange={handleChange} required /></div>
                                <div><label className="text-sm">Option B</label><Input name="optionB" value={formData.optionB} onChange={handleChange} required /></div>
                                <div><label className="text-sm">Option C</label><Input name="optionC" value={formData.optionC} onChange={handleChange} required /></div>
                                <div><label className="text-sm">Option D</label><Input name="optionD" value={formData.optionD} onChange={handleChange} required /></div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Correct Answer (Must match text identically)</label>
                                <div className="relative">
                                    <Input name="answer" value={formData.answer} onChange={handleChange} required placeholder="Paste the correct answer here" />
                                    {formData.answer && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-xs font-bold">MATCHED</div>}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="text-sm font-medium">Points</label>
                                    <Input type="number" name="points" value={formData.points} onChange={handleChange} />
                                </div>
                                <div className="w-1/2">
                                    <label className="text-sm font-medium">Time Limit (s)</label>
                                    <Input type="number" name="timeLimit" value={formData.timeLimit} onChange={handleChange} />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-500">Save Question</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {questions.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 glass-panel rounded-xl">No defined questions yet.</div>
                ) : (
                    questions.map((q, i) => (
                        <Card key={q.id} className="glass-panel border-white/5 bg-white/5 hover:bg-white/10">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                        <p className="font-medium">{q.content}</p>
                                    </div>
                                    <div className="flex gap-4 text-xs text-gray-400 pl-8">
                                        <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {q.points} pts</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {q.timeLimit} s</span>
                                        <span className="text-green-400">Ans: {q.answer}</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(q.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
Ã *cascade08ÃÍ*cascade08ÍÝ *cascade08Ý””´	 *cascade08´	Ë*cascade08Ëõ$ *cascade08õ$·%·%³& *cascade08³&Æ&*cascade08Æ&Ê& *cascade08Ê&é,*cascade08é,Ã4 *cascade08Ã4ƒ5*cascade08ƒ5ž6 *cascade08ž6ê7*cascade08ê7ÍN *cascade08"(29a58513d80350ba05bca571d452fa4ed459392822file:///c:/quiz/src/components/QuestionManager.tsx:file:///c:/quiz