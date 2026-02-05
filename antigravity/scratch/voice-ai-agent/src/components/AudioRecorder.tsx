
'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface AudioRecorderProps {
    onAudioRecorded: (audioBlob: Blob) => void;
    isProcessing: boolean;
}

export function AudioRecorder({ onAudioRecorded, isProcessing }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                onAudioRecorded(blob);
                // Stop all tracks
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone. Please allow permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={clsx(
                    "relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 shadow-xl",
                    isRecording ? "bg-red-500 hover:bg-red-600 ring-4 ring-red-500/30" : "bg-indigo-600 hover:bg-indigo-500 ring-4 ring-indigo-500/30",
                    isProcessing && "opacity-50 cursor-not-allowed grayscale"
                )}
            >
                {isProcessing ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : isRecording ? (
                    <>
                        <span className="absolute w-full h-full rounded-full animate-ping bg-red-500 opacity-20"></span>
                        <Square className="w-8 h-8 text-white fill-current" />
                    </>
                ) : (
                    <Mic className="w-8 h-8 text-white" />
                )}
            </motion.button>
            <p className="text-gray-400 text-sm font-medium">
                {isRecording ? "Listening..." : isProcessing ? "Thinking..." : "Tap to Speak"}
            </p>
        </div>
    );
}
