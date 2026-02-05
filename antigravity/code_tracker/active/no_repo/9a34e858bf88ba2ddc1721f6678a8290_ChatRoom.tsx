ò-"use client"

import { useState, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
    user: string
    content: string
    timestamp: string
}

export default function ChatRoom({ room, username }: { room: string, username: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Only connect if open
        if (!isOpen) return

        const newSocket = io()
        setSocket(newSocket)

        newSocket.on("connect", () => {
            newSocket.emit("join_chat", room)
        })

        newSocket.on("receive_message", (msg: Message) => {
            setMessages((prev) => [...prev, msg])
        })

        return () => {
            newSocket.disconnect()
        }
    }, [isOpen, room])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || !socket) return

        const msg = {
            user: username,
            content: input,
            timestamp: new Date().toLocaleTimeString(),
            room
        }

        // Optimistic update? Or wait for server echo? 
        // Usually socket.io echoes to others, but we can emit to server and server emits back to all including sender.
        socket.emit("send_message", msg)
        setInput("")
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-24 z-50 p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30"
            >
                <MessageSquare className="w-6 h-6" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 left-6 md:left-auto md:w-96 z-40 h-96 flex flex-col"
                    >
                        <div className="glass-panel border-white/20 bg-black/80 backdrop-blur-xl flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                                <h3 className="font-bold text-white">Live Chat</h3>
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {messages.length === 0 && (
                                    <p className="text-center text-gray-500 text-sm mt-10">No messages yet. Say hi! ðŸ‘‹</p>
                                )}
                                {messages.map((msg, i) => {
                                    const isMe = msg.user === username
                                    return (
                                        <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                                            <div className={`
                        max-w-[80%] rounded-2xl px-4 py-2 text-sm
                        ${isMe ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-br-none" : "bg-white/10 text-gray-200 rounded-bl-none"}
                      `}>
                                                {msg.content}
                                            </div>
                                            <span className="text-[10px] text-gray-500 mt-1 px-1">
                                                {isMe ? "You" : msg.user} â€¢ {msg.timestamp}
                                            </span>
                                        </div>
                                    )
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={sendMessage} className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-500"
                                />
                                <Button type="submit" size="icon" className="bg-white/10 hover:bg-white/20">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
ò-*cascade082+file:///c:/quiz/src/components/ChatRoom.tsx