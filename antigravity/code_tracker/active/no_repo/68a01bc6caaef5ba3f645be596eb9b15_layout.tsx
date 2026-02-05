á"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, Users, Trophy, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/quizzes", label: "Quizzes", icon: Trophy },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen bg-transparent">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-64 glass-panel border-r border-white/10 m-4 rounded-2xl flex flex-col fixed inset-y-0"
            >
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        Admin Portal
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Control Center üõ†Ô∏è</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-white/10 shadow-lg shadow-violet-500/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-pink-500/10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <Icon size={20} className={cn(isActive && "text-violet-400")} />
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-8">
                {children}
            </main>
        </div>
    )
}
á*cascade082.file:///c:/quiz/src/app/%28admin%29/layout.tsx