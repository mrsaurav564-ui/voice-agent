ª"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, ShieldAlert, Globe } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage global application configurations.</p>
            </div>

            <div className="grid gap-6">
                {/* General Settings */}
                <Card className="glass-panel border-white/5 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-teal-400" /> General
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Site Name</label>
                            <Input defaultValue="GenZ Quiz Portal" className="bg-black/20 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Admin Contact Email</label>
                            <Input defaultValue="admin@quiz.com" className="bg-black/20 border-white/10" />
                        </div>
                        <Button className="bg-violet-600 hover:bg-violet-500">
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="glass-panel border-red-500/20 bg-red-500/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <ShieldAlert className="w-5 h-5" /> Danger Zone
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                            <div>
                                <h4 className="font-medium text-red-200">Maintenance Mode</h4>
                                <p className="text-xs text-red-300/60">Disable access for all students immediately.</p>
                            </div>
                            <Button variant="destructive" size="sm">Enable</Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                            <div>
                                <h4 className="font-medium text-red-200">Reset Leaderboards</h4>
                                <p className="text-xs text-red-300/60">Wipe all student scores permanently.</p>
                            </div>
                            <Button variant="destructive" size="sm">Reset All</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
ª*cascade08"(29a58513d80350ba05bca571d452fa4ed45939282;file:///c:/quiz/src/app/%28admin%29/admin/settings/page.tsx:file:///c:/quiz