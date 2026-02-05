¸D"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Timer, CheckCircle, XCircle, Trophy } from "lucide-react"
import confetti from "canvas-confetti"

type Question = {
    id: string
    content: string
    options: string // JSON string
    answer: string
    points: number
    timeLimit: number
}

type Round = {
    id: string
    title: string
    questions: Question[]
}

type QuizData = {
    id: string
    title: string
    rounds: Round[]
}

export default function QuizGame({ quiz }: { quiz: QuizData }) {
    const router = useRouter()

    // Flatten questions from all rounds for a linear single-player flow
    // (Or we could handle round transitions specifically)
    const allQuestions = quiz.rounds.flatMap(r => r.questions)

    const [currentQIndex, setCurrentQIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(30)
    const [gameState, setGameState] = useState<"start" | "playing" | "result">("start")
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)

    const currentQuestion = allQuestions[currentQIndex]
    const options = currentQuestion ? JSON.parse(currentQuestion.options) as string[] : []

    // Timer Effect
    useEffect(() => {
        if (gameState === "playing" && timer > 0 && !isAnswered) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        } else if (timer === 0 && !isAnswered) {
            handleAnswerTimeOut()
        }
    }, [gameState, timer, isAnswered])

    const handleStart = () => {
        setGameState("playing")
        setTimer(allQuestions[0]?.timeLimit || 30)
    }

    const handleAnswer = (option: string) => {
        if (isAnswered) return

        setSelectedOption(option)
        setIsAnswered(true)

        const isCorrect = option === currentQuestion.answer
        if (isCorrect) {
            setScore(prev => prev + currentQuestion.points)
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
        }

        setTimeout(() => {
            handleNext()
        }, 2000)
    }

    const handleAnswerTimeOut = () => {
        setIsAnswered(true)
        setTimeout(() => {
            handleNext()
        }, 2000)
    }

    const handleNext = () => {
        if (currentQIndex < allQuestions.length - 1) {
            setCurrentQIndex(prev => prev + 1)
            setTimer(allQuestions[currentQIndex + 1].timeLimit || 30)
            setSelectedOption(null)
            setIsAnswered(false)
        } else {
            finishGame()
        }
    }

    const finishGame = async () => {
        setGameState("result")
        confetti({ particleCount: 200, spread: 100 })

        // Save result
        try {
            await fetch("/api/results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quizId: quiz.id,
                    score: score
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    if (gameState === "start") {
        return (
            <Card className="glass-panel max-w-lg w-full text-center p-8">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        {quiz.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        {allQuestions.length} Questions â€¢ Gen Z Mode ON ðŸ”¥
                    </p>
                    <Button
                        onClick={handleStart}
                        size="lg"
                        className="w-full text-xl font-bold bg-white text-black hover:bg-gray-200"
                    >
                        Start Quiz ðŸš€
                    </Button>
                </CardContent>
            </Card>
        )
    }

    if (gameState === "result") {
        return (
            <Card className="glass-panel max-w-lg w-full text-center p-8">
                <CardHeader>
                    <Trophy className="w-20 h-20 mx-auto text-yellow-400 mb-4" />
                    <CardTitle className="text-3xl font-bold">Quiz Completed!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-5xl font-bold text-violet-400">{score}</div>
                    <p className="text-gray-400">Total Score</p>
                    <Button onClick={() => router.push("/dashboard")} className="w-full">
                        Back to Dashboard
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="w-full max-w-2xl px-4">
            {/* Game UI */}
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-bold text-gray-400">
                    Q{currentQIndex + 1} / {allQuestions.length}
                </div>
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timer < 10 ? "text-red-500" : "text-white"}`}>
                    <Timer className="w-5 h-5" /> {timer}s
                </div>
                <div className="text-sm font-bold text-violet-400">
                    Score: {score}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="glass-panel border-white/10 bg-white/5 mb-6">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold leading-relaxed">{currentQuestion.content}</h2>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                        {options.map((option, idx) => {
                            const isSelected = selectedOption === option
                            const isCorrect = option === currentQuestion.answer

                            let variantClass = "glass-panel bg-white/5 hover:bg-white/10 border-white/10"

                            if (isAnswered) {
                                if (isCorrect) variantClass = "bg-green-500/20 border-green-500 text-green-300"
                                else if (isSelected) variantClass = "bg-red-500/20 border-red-500 text-red-300"
                                else variantClass = "opacity-50"
                            }

                            return (
                                <motion.button
                                    key={idx}
                                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                    onClick={() => handleAnswer(option)}
                                    disabled={isAnswered}
                                    className={`p-6 rounded-xl text-left font-semibold transition-all ${variantClass}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
¸D*cascade082Dfile:///c:/quiz/src/app/%28student%29/play/%5BquizId%5D/QuizGame.tsx