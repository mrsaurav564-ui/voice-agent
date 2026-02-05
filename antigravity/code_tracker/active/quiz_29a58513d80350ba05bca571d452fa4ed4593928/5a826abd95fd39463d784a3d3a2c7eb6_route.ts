ﬂimport { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: Request) {
    try {
        const { question } = await req.json()
        console.log("AI Request received for:", question)

        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing in server environment")
            return NextResponse.json({ error: "Server missing API Key" }, { status: 500 })
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        console.log("Gemini model initialized. Sending prompt...")

        const prompt = `
            You are a trivia expert. 
            Question: "${question}"
            
            Generate 4 multiple choice options (A, B, C, D) and identify the correct answer.
            The "answer" field must be an exact string match to one of the options.
            
            Return ONLY valid JSON in this format, no code blocks:
            {
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": "Option 3"
            }
        `

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        console.log("Gemini Raw Response:", text)

        // Cleanup potential markdown formatting
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim()

        try {
            const data = JSON.parse(cleanJson)
            console.log("Parsed Data:", data)
            return NextResponse.json(data)
        } catch (e) {
            console.error("JSON Parse Error:", e)
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 })
        }

    } catch (error) {
        console.error("Gemini API Error:", error)
        return NextResponse.json({ error: "Failed to generate options", details: String(error) }, { status: 500 })
    }
}
, *cascade08,»*cascade08»∞ *cascade08∞Î*cascade08Îˆ *cascade08ˆ˜*cascade08˜¯ *cascade08¯ç*cascade08çé *cascade08éè*cascade08èê *cascade08êï*cascade08ïñ *cascade08ñó*cascade08ó° *cascade08°£*cascade08£• *cascade08•¶*cascade08¶ß *cascade08ß®*cascade08®¨ *cascade08¨≠*cascade08≠Æ *cascade08Æ∞*cascade08∞≤ *cascade08≤ƒ*cascade08ƒ≈ *cascade08≈∆ *cascade08∆» *cascade08» *cascade08 À *cascade08ÀÃ *cascade08ÃÕ*cascade08ÕŒ *cascade08Œœ *cascade08œ–*cascade08–— *cascade08—“ *cascade08“‘ *cascade08‘’*cascade08’ÿ *cascade08ÿŸ *cascade08Ÿ⁄ *cascade08⁄‹*cascade08‹› *cascade08›ﬁ*cascade08ﬁ‡*cascade08‡‚ *cascade08‚„ *cascade08„Â*cascade08ÂÙ *cascade08Ùı *cascade08ı¯*cascade08¯˘ *cascade08˘˚*cascade08˚¸ *cascade08¸˝*cascade08˝˛ *cascade08˛ˇ*cascade08ˇÄ *cascade08ÄÅ*cascade08ÅÇ *cascade08Çê*cascade08êí *cascade08íö*cascade08öõ *cascade08õü*cascade08ü° *cascade08°¢*cascade08¢£ *cascade08£•*cascade08•® *cascade08®©*cascade08©™ *cascade08™¿*cascade08¿À *cascade08ÀÃ*cascade08Ã‹ *cascade08‹›*cascade08›ﬁ *cascade08ﬁ‡*cascade08‡· *cascade08·„*cascade08„‰ *cascade08‰Â*cascade08ÂÊ *cascade08ÊÁ*cascade08ÁÈ *cascade08ÈÏ*cascade08ÏÌ *cascade08ÌÓ*cascade08ÓÔ *cascade08ÔÛ*cascade08ÛÙ *cascade08Ùı*cascade08ıˆ *cascade08ˆ¯*cascade08¯˘ *cascade08˘˙*cascade08˙˚ *cascade08˚¸*cascade08¸˛ *cascade08˛Ä*cascade08ÄÜ *cascade08Üâ*cascade08âä *cascade08äé*cascade08éè *cascade08èô*cascade08ô›*cascade08›Ì *cascade08ÌÔ*cascade08Ô *cascade08Ò*cascade08Òˆ *cascade08ˆ˜*cascade08˜Ö *cascade08ÖÜ*cascade08Üá *cascade08áà*cascade08àâ *cascade08âä*cascade08äå *cascade08åç*cascade08çé *cascade08éè*cascade08èê *cascade08êñ*cascade08ñó *cascade08óù*cascade08ùû *cascade08û†*cascade08†° *cascade08°≠*cascade08≠¥ *cascade08¥µ*cascade08µ∂ *cascade08∂π*cascade08π¡ *cascade08¡Œ*cascade08Œﬂ *cascade08ﬂ·*cascade08·‚ *cascade08‚Á*cascade08ÁË *cascade08ËÚ*cascade08ÚÛ *cascade08ÛÙ*cascade08Ùı *cascade08ıˆ*cascade08ˆ¯ *cascade08¯˘*cascade08˘˙ *cascade08˙˝*cascade08˝˛ *cascade08˛Ä*cascade08ÄÇ *cascade08ÇÑ*cascade08ÑÜ *cascade08Üà*cascade08àâ *cascade08âã*cascade08ãå *cascade08åé*cascade08éè *cascade08èí*cascade08íì *cascade08ìõ*cascade08õú *cascade08úù*cascade08ù† *cascade08†°*cascade08°® *cascade08®©*cascade08©Æ *cascade08ÆØ*cascade08ØΩ *cascade08Ω¿*cascade08¿¡ *cascade08¡â *cascade08âº*cascade08ºÕ *cascade08Õ‡*cascade08‡Ñ *cascade08Ñ±*cascade08±≥ *cascade08≥∑*cascade08∑ﬂ *cascade08ﬂï*cascade08ï¶ *cascade08¶ß *cascade08ßø*cascade08øﬂ *cascade08"(29a58513d80350ba05bca571d452fa4ed459392820file:///c:/quiz/src/app/api/ai/generate/route.ts:file:///c:/quiz