þ"use client"

import { SessionProvider } from "next-auth/react"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
þ*cascade082,file:///c:/quiz/src/components/Providers.tsx