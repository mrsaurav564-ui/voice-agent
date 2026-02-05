÷"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AIAssistant({ context }: { context?: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")

    const handleAskAI = async () => {
        setLoading(true)
        setResponse("")

        // Simulation of Gemini API call
        setTimeout(() => {
            setResponse("This is a simulated explanation from Gemini. In a real implementation, this would call the Google Generative AI SDK with the question context to provide a detailed, study-buddy style explanation! ðŸ§ âœ¨")
            setLoading(false)
        }, 1500)
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30"
            >
                <Sparkles className="w-6 h-6" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
                    >
                        <Card className="glass-panel border-white/20 bg-black/60 backdrop-blur-xl">
                            <div className="flex justify-between items-center p-4 border-b border-white/10">
                                <h3 className="font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                    Gemini Assistant
                                </h3>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <CardContent className="p-4 space-y-4">
                                {response ? (
                                    <div className="text-sm text-gray-200 leading-relaxed bg-white/5 p-3 rounded-lg animate-in fade-in">
                                        {response}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400 py-6">
                                        <p className="text-sm mb-4">Stuck? I can explain this question or give you a hint!</p>
                                        <Button
                                            onClick={handleAskAI}
                                            disabled={loading}
                                            className="bg-white/10 hover:bg-white/20 text-white border border-white/10 w-full"
                                        >
                                            {loading ? "Thinking..." : "Explain This ðŸ¤”"}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
÷*cascade082.file:///c:/quiz/src/components/AIAssistant.tsx