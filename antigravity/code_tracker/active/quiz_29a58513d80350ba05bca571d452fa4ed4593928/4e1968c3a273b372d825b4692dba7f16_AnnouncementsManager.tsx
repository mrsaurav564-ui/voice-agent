Ò"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Trash2 } from "lucide-react"

export default function AnnouncementsManager({ initialAnnouncements }: { initialAnnouncements: any[] }) {
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [announcements, setAnnouncements] = useState(initialAnnouncements)
    const router = useRouter()

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content })
            })
            if (res.ok) {
                const newMsg = await res.json()
                // Optimistically add or just refresh
                setContent("")
                setAnnouncements([newMsg, ...announcements])
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this?")) return
        await fetch(`/api/announcements?id=${id}`, { method: "DELETE" })
        setAnnouncements(announcements.filter(a => a.id !== id))
        router.refresh()
    }

    return (
        <div className="space-y-8">
            <Card className="glass-panel border-white/5 bg-white/5">
                <CardContent className="p-6">
                    <form onSubmit={handlePost} className="flex gap-4">
                        <Input
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type your announcement here..."
                            className="flex-1"
                        />
                        <Button type="submit" disabled={loading} className="bg-pink-600 hover:bg-pink-500">
                            <Send className="w-4 h-4 mr-2" /> Post
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {announcements.map((msg) => (
                    <div key={msg.id} className="glass-panel border-white/5 bg-white/5 p-4 flex justify-between items-center rounded-xl">
                        <div>
                            <p className="font-medium">{msg.content}</p>
                            <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(msg.id)} className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                {announcements.length === 0 && <p className="text-center text-gray-500">No announcements yet.</p>}
            </div>
        </div>
    )
}
Ò*cascade08"(29a58513d80350ba05bca571d452fa4ed45939282Pfile:///c:/quiz/src/app/%28admin%29/admin/announcements/AnnouncementsManager.tsx:file:///c:/quiz