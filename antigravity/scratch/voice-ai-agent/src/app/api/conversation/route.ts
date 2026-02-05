
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';
import { GoogleGenAI } from "@google/genai";

// Initialize Clients
const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ElevenLabs Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel - Standard friendly voice

async function textToSpeech(text: string): Promise<ArrayBuffer> {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'xi-api-key': ELEVENLABS_API_KEY!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
            },
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ElevenLabs API Failed: ${errorText}`);
    }

    return await response.arrayBuffer();
}

export async function POST(req: NextRequest) {
    try {
        console.log('--- Request Started (Gemini 3 Powered) ---');
        const formData = await req.formData();
        const audioFile = formData.get('audio') as File;

        if (!audioFile) {
            console.error('Error: No audio file provided');
            return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
        }

        // 1. Transcribe Audio (Deepgram)
        console.log('Step 1: Deepgram Transcription...');
        const buffer = Buffer.from(await audioFile.arrayBuffer());
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            buffer,
            {
                model: 'nova-2',
                smart_format: true,
            }
        );

        if (error) {
            console.error('Deepgram Error:', JSON.stringify(error, null, 2));
            return NextResponse.json({ error: `Deepgram Error: ${error.message || 'Unknown error'}` }, { status: 500 });
        }

        const transcript = result?.results?.channels[0]?.alternatives[0]?.transcript;
        console.log('Transcript:', transcript);

        if (!transcript) {
            console.warn('Warning: No speech detected in audio');
            return NextResponse.json({ message: 'No speech detected' });
        }

        // 2. Generate Response (Google Gemini 3)
        console.log('Step 2: Gemini Generation...');
        let replyText = "I'm having trouble thinking right now.";
        try {
            // User's requested implementation
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `You are a helpful and friendly Voice AI assistant. 
            Your goal is to have a natural spoken conversation.
            Keep your responses concise, conversational, and under 2 sentences.
            
            User said: "${transcript}"`,
            });

            replyText = response.text || "No response text"; // Access .text property as per user snippet
            console.log('Gemini Reply:', replyText);

        } catch (geminiError: any) {
            console.error('Gemini Error:', geminiError);
            return NextResponse.json({ error: `Gemini Error: ${geminiError.message}` }, { status: 500 });
        }

        // 3. Generate Audio (ElevenLabs)
        console.log('Step 3: ElevenLabs TTS...');
        try {
            const audioBuffer = await textToSpeech(replyText);
            const audioBase64 = Buffer.from(audioBuffer).toString('base64');
            console.log('Step 3: ElevenLabs Success');

            return NextResponse.json({
                transcript,
                reply: replyText,
                audio: `data:audio/mpeg;base64,${audioBase64}`,
            });
        } catch (elevenLabsError: any) {
            console.error('ElevenLabs Error:', elevenLabsError);
            return NextResponse.json({ error: `ElevenLabs Error: ${elevenLabsError.message}` }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Global Processing Error:', error);
        return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
    }
}
