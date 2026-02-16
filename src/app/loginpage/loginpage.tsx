import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const OTPLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { requestOTP, authWithOTP, otpId } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRequestOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await requestOTP(email);
      setStep(2);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (code.length !== 8) {
      setError('Please enter the complete 8-digit code');
      return;
    }

    setLoading(true);

    try {
      await authWithOTP(otpId, code);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      await requestOTP(email);
      alert('New code sent to your email!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to resend code.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - YUVA UDYAM Job Portal</title>
        <meta
          name="description"
          content="Login to YUVA UDYAM job portal using OTP authentication"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />

        <div className="flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step === 1 ? (
                    <Mail className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-white" />
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {step === 1 ? 'Welcome Back' : 'Verify Code'}
                </h1>
                <p className="text-gray-600">
                  {step === 1
                    ? 'Enter your email to receive a login code'
                    : 'Enter the 8-digit code sent to your email'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleRequestOTP} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Sending Code...</span>
                    ) : (
                      <>
                        <span>Request OTP</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Register here
                    </Link>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCode(
                          e.target.value.replace(/\D/g, '').slice(0, 8)
                        )
                      }
                      placeholder="00000000"
                      maxLength={8}
                      required
                      className="mt-1 text-center text-2xl tracking-widest"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Enter the 8-digit code sent to {email}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || code.length !== 8}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <span>Verify & Login</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50"
                    >
                      Resend Code
                    </button>

                    <div className="text-sm text-gray-600">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setCode('');
                          setError('');
                        }}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Change Email
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OTPLoginPage;
