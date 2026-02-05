Ñ("use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

import { getSession } from "next-auth/react"
import Link from "next/link"

export default function LoginPage() {
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
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Invalid vibes. Check your credentials.")
            } else {
                // Check role for redirect
                const session = await getSession()
                if (session?.user?.role === "ADMIN") {
                    router.push("/admin")
                } else {
                    router.push("/dashboard")
                }
                router.refresh()
            }
        } catch (err) {
            setError("Something went wrong. L.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="glass-panel border-white/10 bg-black/20 backdrop-blur-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                            Quiz Portal
                        </CardTitle>
                        <p className="text-sm text-gray-400">Enter the matrix ü´¶</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500/50"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500/50"
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
                                className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-violet-500/20"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Let's Go üöÄ"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-semibold hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
‰ *cascade08‰≤*cascade08≤Ö	 *cascade08Ö	°
*cascade08°
±
 *cascade08±
¥
*cascade08¥
∂
 *cascade08∂
«
*cascade08«
»
 *cascade08»
…
*cascade08…
À
 *cascade08À
Õ
*cascade08Õ
œ
 *cascade08œ
“
*cascade08“
”
 *cascade08”
Ù
*cascade08Ù
˝
 *cascade08˝
Ü*cascade08Üá *cascade08áé*cascade08éë *cascade08ëí*cascade08í≤# *cascade08≤#è'*cascade08è'Ñ( *cascade0821file:///c:/quiz/src/app/%28auth%29/login/page.tsx