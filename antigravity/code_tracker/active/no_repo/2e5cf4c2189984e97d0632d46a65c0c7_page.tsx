¿%"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function SignupPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            router.push("/login?message=Account created! Please login.")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="glass-panel border-white/10 bg-black/20 backdrop-blur-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                            Join the Squad
                        </CardTitle>
                        <p className="text-sm text-gray-400">Create your legacy âš¡</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    placeholder="Choose a Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-teal-500/50"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    placeholder="Secret Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500/50"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white border-0 shadow-lg shadow-teal-500/20"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Sign Up ðŸŒŸ"}
                            </Button>

                            <div className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?{" "}
                                <Link href="/login" className="text-teal-400 hover:underline">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
¿%*cascade0822file:///c:/quiz/src/app/%28auth%29/signup/page.tsx