üimport { prisma } from "@/lib/prisma"
import AnnouncementsManager from "./AnnouncementsManager"
import { Megaphone } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AnnouncementsPage() {
    const announcements = await prisma.message.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Megaphone className="w-8 h-8 text-pink-500" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
                    <p className="text-muted-foreground">Broadcast updates to all students.</p>
                </div>
            </div>

            <AnnouncementsManager initialAnnouncements={announcements} />
        </div>
    )
}
	 *cascade08	*cascade08 *cascade08*cascade08 *cascade08*cascade08 *cascade08*cascade08  *cascade08 !*cascade08!. *cascade08./*cascade08/1 *cascade0812*cascade0825 *cascade0856*cascade086; *cascade08;<*cascade08<? *cascade08?@*cascade08@I *cascade08IJ*cascade08JK *cascade08KN*cascade08NO *cascade08OP*cascade08PQ *cascade08QT*cascade08TX *cascade08X[*cascade08[\ *cascade08\^*cascade08^Ž *cascade08Ž”*cascade08”• *cascade08•—*cascade08—™ *cascade08™›*cascade08›œ *cascade08œ *cascade08 £ *cascade08£¤*cascade08¤¥ *cascade08¥ª*cascade08ª« *cascade08«¬*cascade08¬­ *cascade08­®*cascade08®° *cascade08°±*cascade08±² *cascade08²¶*cascade08¶Æ *cascade08ÆÌ*cascade08Ìƒ *cascade08ƒ„*cascade08„Ž *cascade08Ž*cascade08“ *cascade08“•*cascade08•— *cascade08—˜*cascade08˜™ *cascade08™*cascade08  *cascade08 ¢*cascade08¢² *cascade08²³*cascade08³µ *cascade08µ¸*cascade08¸¿ *cascade08¿À*cascade08ÀÁ *cascade08ÁÃ*cascade08ÃÄ *cascade08ÄÇ*cascade08ÇÈ *cascade08ÈÉ*cascade08ÉÊ *cascade08ÊÌ*cascade08ÌÕ *cascade08ÕÖ*cascade08Ö¤ *cascade08¤¥*cascade08¥ª *cascade08ª«*cascade08«° *cascade08°²*cascade08²· *cascade08·¸*cascade08¸¹ *cascade08¹º*cascade08º» *cascade08»¼*cascade08¼½ *cascade08½¾*cascade08¾À *cascade08ÀÁ*cascade08ÁÓ *cascade08ÓÔ*cascade08ÔÜ *cascade08ÜÝ*cascade08Ýü *cascade08"(29a58513d80350ba05bca571d452fa4ed45939282@file:///c:/quiz/src/app/%28admin%29/admin/announcements/page.tsx:file:///c:/quiz