'use client'

import React, { useState, useEffect, use } from 'react'; // Use 'use' to unwrap
import { Mic, MicOff, CheckCircle, Loader2, BrainCircuit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { startAIInterview } from '@/src/app/actions/jobs/InterviewEngine';
import { evaluateInterview } from '@/src/app/actions/jobs/EvaluateResponse';
import { toast } from "sonner";

export default function InterviewPage({ searchParams }: { searchParams: Promise<{ jobId: string }> }) {
  // FIX: Unwrap searchParams using React.use()
  const resolvedParams = use(searchParams);
  const jobId = resolvedParams.jobId;


  
  const [question, setQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const q = await startAIInterview("user_2026_forge", jobId);
      setQuestion(q);
      setLoading(false);
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(q));
    }
    init();
  }, [jobId]);

const handleMicToggle = () => {
  if (!('webkitSpeechRecognition' in window)) return;

  const recognition = new (window as any).webkitSpeechRecognition();
  
  // CRITICAL CONFIG
  recognition.continuous = true; // Keep listening even after pauses
  recognition.interimResults = true; 
  recognition.lang = 'en-IN'; // Set to Indian English for better local accent parsing

  if (!isListening) {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      // Logic to grab the latest transcript
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        console.log("FORGE_DEBUG: Final Sentence:", finalTranscript);
        setTranscript((prev) => prev + " " + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("FORGE_DEBUG: Error:", event.error);
      
      if (event.error === 'no-speech') {
        // Instead of giving up, we let the user know we're still waiting
        toast.warning("Listening... please speak clearly.", { duration: 2000 });
        // Don't set isListening to false here so they can try again
      }
      
      if (event.error === 'audio-capture') {
        toast.error("No microphone found. Check system settings.");
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      console.log("FORGE_DEBUG: Session ended.");
      // In an interview, we only want to stop if the user clicks 'Stop'
      // but we'll reset state here to be safe.
      setIsListening(false);
    };
  } else {
    recognition.stop();
    setIsListening(false);
  }
};

  const handleSubmit = async () => {
    setIsEvaluating(true);
    const toastId = toast.loading("Gemini is grading your performance...");
    
    const res = await evaluateInterview("user_2026_forge", jobId, transcript, question);
    
    if (res.success) {
      setResult(res.evaluation);
      toast.success("Evaluation Complete!", { id: toastId });
    } else {
      toast.error("Evaluation failed.", { id: toastId });
    }
    setIsEvaluating(false);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0B0E14]"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-8">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {!result ? (
          <>
            <header className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20"><BrainCircuit className="text-blue-500" /></div>
              <h1 className="text-2xl font-bold">Live AI Screening</h1>
            </header>

            <Card className="bg-[#151921] border-slate-800 p-10 space-y-8">
              <p className="text-2xl font-medium leading-relaxed text-slate-200">"{question}"</p>
              
              <div className="min-h-[150px] p-6 bg-slate-950 rounded-xl border border-slate-800 italic text-slate-500">
                {transcript || "Speak clearly into your microphone..."}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleMicToggle} className={`flex-1 h-14 font-bold ${isListening ? 'bg-rose-600' : 'bg-blue-600'}`}>
                  {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />} {isListening ? "Stop" : "Start Speaking"}
                </Button>
                <Button 
                  disabled={!transcript || isEvaluating} 
                  onClick={handleSubmit}
                  className="h-14 px-10 bg-emerald-600 hover:bg-emerald-500 font-bold"
                >
                  {isEvaluating ? <Loader2 className="animate-spin" /> : <CheckCircle className="mr-2" />} Submit
                </Button>
              </div>
            </Card>
          </>
        ) : (
          /* EVALUATION VIEW */
          <Card className="bg-[#151921] border-slate-800 p-10 space-y-8 animate-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
              <div className="text-5xl font-black text-blue-500">{result.score}%</div>
              <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Performance Score</p>
            </div>
            
            <div className="p-6 bg-blue-600/5 rounded-xl border border-blue-500/20">
              <p className="text-slate-300 italic text-center">"{result.feedback}"</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Strengths</span>
                <p className="text-sm mt-1 text-slate-400">{result.strengths[0]}</p>
              </div>
              <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                <span className="text-[10px] font-bold text-rose-500 uppercase">Gaps</span>
                <p className="text-sm mt-1 text-slate-400">{result.weaknesses[0]}</p>
              </div>
            </div>
            
            <Button className="w-full h-12 bg-slate-800 hover:bg-slate-700 font-bold" onClick={() => window.location.href='/user/dashboard'}>
              Return to Dashboard
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}