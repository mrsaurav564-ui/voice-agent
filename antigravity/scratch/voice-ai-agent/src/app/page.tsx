
'use client';

import { useState, useRef, useEffect } from 'react';
import { AudioRecorder } from '@/components/AudioRecorder';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioRecorded = async (blob: Blob) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('audio', blob);

    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      // Add user message
      setMessages((prev) => [...prev, { role: 'user', text: data.transcript }]);

      // Add assistant message
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);

      // Play audio
      if (data.audio) {
        if (audioRef.current) {
          audioRef.current.src = data.audio;
          audioRef.current.play();
        }
      }

    } catch (error) {
      console.error('Conversation failed', error);
      alert('Failed to process conversation.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-black text-white selection:bg-indigo-500/30">

      {/* Header */}
      <div className="z-10 w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Voice AI Agent
        </h1>
        <p className="text-gray-500 text-sm">Powered by Deepgram, OpenAI & ElevenLabs</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-2xl my-8 overflow-hidden relative flex flex-col gap-4 p-4">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-center text-gray-600 mt-20 italic">
              Start a conversation by tapping the microphone...
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl max-w-[85%] border ${msg.role === 'user'
                  ? 'bg-zinc-900 border-zinc-800 self-end ml-auto text-right'
                  : 'bg-indigo-950/20 border-indigo-500/20 self-start text-indigo-100 shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-indigo-500/20'
                }`}
            >
              <p className="text-sm opacity-80 mb-1 text-xs uppercase tracking-wider font-semibold">
                {msg.role}
              </p>
              <div className="leading-relaxed">{msg.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
        <AudioRecorder onAudioRecorded={handleAudioRecorded} isProcessing={isProcessing} />
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} className="hidden" />
    </main>
  );
}
