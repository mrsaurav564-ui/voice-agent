Êimport { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2 } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function StudentsPage() {
    const students = await prisma.user.findMany({
        where: { role: "STUDENT" },
        include: { _count: { select: { results: true } } },
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Students</h2>

            <div className="grid gap-4">
                {students.length === 0 ? (
                    <div className="text-center py-12 glass-panel rounded-xl">
                        <p className="text-gray-500">No students yet. It's lonely here üï∏Ô∏è</p>
                    </div>
                ) : (
                    students.map((student) => (
                        <Card key={student.id} className="glass-panel border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center font-bold text-black">
                                        {student.username?.[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{student.username}</h4>
                                        <p className="text-xs text-gray-400">Joined {new Date(student.createdAt).toLocaleDateString()} ‚Ä¢ {student._count.results} games played</p>
                                    </div>
                                </div>

                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
Ê*cascade08"(29a58513d80350ba05bca571d452fa4ed45939282;file:///c:/quiz/src/app/%28admin%29/admin/students/page.tsx:file:///c:/quiz