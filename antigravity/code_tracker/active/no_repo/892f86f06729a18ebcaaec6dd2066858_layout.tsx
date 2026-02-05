ñ"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Trophy, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import ChatRoom from "@/components/ChatRoom"

const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/profile", label: "Profile", icon: User },
]

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen pb-20 md:pb-0">
            {/* Top Navbar for Desktop */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 bg-black/20 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    QuizGenZ
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-white",
                                pathname === item.href ? "text-teal-400" : "text-gray-400"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/api/auth/signout" className="text-red-400 hover:text-red-300">
                        <LogOut className="w-5 h-5" />
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 px-4 max-w-7xl mx-auto">
                {children}
            </main>

            {/* Mobile Bottom Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/10 bg-black/80 backdrop-blur-xl flex justify-around p-4 z-50">
                {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1",
                                pathname === item.href ? "text-teal-400" : "text-gray-500"
                            )}
                        >
                            <Icon size={24} />
                            <span className="text-[10px]">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Global Chat */}
            <div className="fixed z-50">
                <ChatRoom room="general" username="Student" />
            </div>
        </div>
    )
}
‚ *cascade08‚ê*cascade08ê€ *cascade08€¸*cascade08¸ñ *cascade0820file:///c:/quiz/src/app/%28student%29/layout.tsx