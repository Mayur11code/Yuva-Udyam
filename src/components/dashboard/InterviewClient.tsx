'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { startAIInterview } from '@/src/app/actions/jobs/InterviewEngine';
import { evaluateInterview } from '@/src/app/actions/jobs/EvaluateResponse';

export default function InterviewClient({ jobId }: { jobId: string }) {

  const MAX_ROUNDS = 3;

  const [round, setRound] = useState(1);
  const [question, setQuestion] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const recognitionRef = useRef<any>(null);
  const roundRef = useRef(1);

  /* INIT SPEECH RECOGNITION */
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      recognition.stop();
      handleAIResponse(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  /* START FIRST QUESTION */
  useEffect(() => {
    async function init() {
      const q = await startAIInterview("user_2026_forge", jobId);
      setQuestion(q);
      setLoading(false);
      speak(q);
    }
    init();
  }, [jobId]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => {
      if (roundRef.current < MAX_ROUNDS) {
        recognitionRef.current?.start();
        setIsListening(true);
      } else {
        handleFinalEvaluation();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleAIResponse = async (answer: string) => {
    setLoading(true);

    const res = await fetch("/api/interview/followup", {
      method: "POST",
      body: JSON.stringify({
        jobId,
        answer,
        previousQuestion: question,
      }),
    });

    const data = await res.json();

    setQuestion(data.nextQuestion);
    setTranscript("");

    roundRef.current += 1;
    setRound(roundRef.current);

    speak(data.nextQuestion);
    setLoading(false);
  };

  const handleFinalEvaluation = async () => {
    setIsEvaluating(true);

    const res = await evaluateInterview(
      "user_2026_forge",
      jobId,
      transcript,
      question
    );

    if (res.success) {
      setResult(res.evaluation);
    }

    setIsEvaluating(false);
  };

  const handleMicToggle = () => {
    if (!recognitionRef.current) return;

    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  if (loading && !question)
    return (
      <div className="h-screen flex items-center justify-center bg-[#0B0E14]">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-8">
      <div className="max-w-3xl mx-auto space-y-10">

        {!result ? (
          <>
            <header className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                <BrainCircuit className="text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold">
                Live AI Screening — Round {round}/{MAX_ROUNDS}
              </h1>
            </header>

            <Card className="bg-[#151921] border-slate-800 p-10 space-y-8">

              <p className="text-2xl font-medium leading-relaxed text-slate-200">
                "{question}"
              </p>

              <div className="min-h-[150px] p-6 bg-slate-950 rounded-xl border border-slate-800 italic text-slate-500">
                {transcript || "Listening for your response..."}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleMicToggle}
                  className={`flex-1 h-14 font-bold ${
                    isListening ? 'bg-rose-600' : 'bg-blue-600'
                  }`}
                >
                  {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                  {isListening ? "Stop Speaking" : "Start Speaking"}
                </Button>
              </div>
            </Card>
          </>
        ) : (
          <Card className="bg-[#151921] border-slate-800 p-10 space-y-8">
            <div className="text-center">
              <div className="text-5xl font-black text-blue-500">
                {result.score}%
              </div>
              <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">
                Final Performance Score
              </p>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
