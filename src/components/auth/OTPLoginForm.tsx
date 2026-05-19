'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "./AuthCard";
import EmailStep from "./EmailStep";
import CodeStep from "./CodeStep";

const OTP_LENGTH = 8;

export default function OTPLoginForm() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [otpId, setOtpId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestOTP = async () => {
    setError("");
    setLoading(true);

    // try {
    //   const res = await fetch("/api/auth/request-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email }),
    //   });

    try {
      const res = {ok: true, json: async () => ({message: "dummy-otp-id", otpId: "dummy-otp-id"})};
    

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setOtpId(data.otpId);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (code.length !== OTP_LENGTH) {
      setError("Enter complete 8-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpId, code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title={step === 1 ? "Login" : "Verify Code"} error={error}>
      {step === 1 ? (
        <EmailStep
          email={email}
          setEmail={setEmail}
          loading={loading}
          onSubmit={requestOTP}
        />
      ) : (
        <CodeStep
          email={email}
          code={code}
          setCode={setCode}
          loading={loading}
          onVerify={verifyOTP}
          onResend={requestOTP}
          onBack={() => {
            setStep(1);
            setCode("");
            setError("");
          }}
        />
      )}
    </AuthCard>
  );
}
