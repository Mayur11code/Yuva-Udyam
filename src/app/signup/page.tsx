import SignupForm from "@/src/components/auth/SignUpForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/3 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-serif font-black text-3xl text-white">
            Yuva <span className="text-cyan-400 italic">Udyam</span>
          </span>
          <p className="text-white/30 text-sm font-mono mt-2">Create your free account</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
