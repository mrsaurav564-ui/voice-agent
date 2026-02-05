ƒ"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Save, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AddRoundButton({ quizId }: { quizId: string }) {
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await fetch("/api/rounds", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quizId,
                    title,
                    type: "GENERAL", // Default for now
                    order: 99 // simplistic order handling
                })
            })
            setTitle("")
            setIsAdding(false)
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (!isAdding) {
        return (
            <Button size="sm" variant="glass" onClick={() => setIsAdding(true)}>
                <Plus className="w-4 h-4 mr-2" /> Add Round
            </Button>
        )
    }

    return (
        <Card className="glass-panel border-white/10 bg-white/5 mb-4 animate-in fade-in zoom-in-95">
            <CardContent className="p-4">
                <form onSubmit={handleAdd} className="flex gap-2">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Round Title (e.g., General Knowledge)"
                        className="bg-black/20 border-white/10"
                        autoFocus
                        required
                    />
                    <Button type="submit" disabled={loading} className="bg-violet-600 hover:bg-violet-500">
                        <Save className="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>
                        <X className="w-4 h-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
ƒ*cascade08"(29a58513d80350ba05bca571d452fa4ed459392821file:///c:/quiz/src/components/AddRoundButton.tsx:file:///c:/quiz