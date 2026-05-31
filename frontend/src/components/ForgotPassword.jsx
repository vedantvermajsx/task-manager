import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import AuthApi from "../api/AuthApi";
import PasswordRequest from "../models/PasswordRequest";

const MotionBox = motion(Box);

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const isEmailValid = (e) => /\S+@\S+\.\S+/.test(e);
  const isEmailFormValid = email && isEmailValid(email);


  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!isEmailFormValid) return;

    setLoading(true);
    setError("");

    try {
      await AuthApi.sendOtp(new PasswordRequest(email));
      setStep(2);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError("Failed to send OTP");
    }

    setLoading(false);
  };

  // STEP 2: VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) return;

    setLoading(true);
    setError("");

    try {
      const data = await AuthApi.verifyOtp(new PasswordRequest(email, otp));
      if (data.success) {
        setToken(data.token);
      }
      setStep(3);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError("Invalid OTP");
    }

    setLoading(false);
  };

  // STEP 3: RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await AuthApi.updatePassword(new PasswordRequest(email, null, password, token));
      setStep(4);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError("Password update failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <MotionBox className="w-full max-w-md z-10">

        <div className="glass-card p-12 text-center">

          <AnimatePresence mode="wait">

            {/* STEP 1 - EMAIL */}
            {step === 1 && (
              <motion.div key="step1">
                <Heading mb={4}>Reset Password</Heading>

                {error && (
                  <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSendOtp}>
                  <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    isDisabled={!isEmailFormValid || loading}
                    width="full"
                  >
                    {loading ? <Spinner size="sm" /> : "Send OTP"}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* STEP 2 - OTP */}
            {step === 2 && (
              <motion.div key="step2">
                <Heading mb={4}>Verify OTP</Heading>

                {error && (
                  <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleVerifyOtp}>
                  <FormControl mb={4}>
                    <FormLabel>OTP</FormLabel>
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                  </FormControl>

                  <Button type="submit" width="full" isDisabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Verify OTP"}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* STEP 3 - PASSWORD */}
            {step === 3 && (
              <motion.div key="step3">
                <Heading mb={4}>Set New Password</Heading>

                {error && (
                  <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleResetPassword}>
                  <FormControl mb={3}>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormControl>

                  <Button type="submit" width="full" isDisabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Update Password"}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* STEP 4 - SUCCESS */}
            {step === 4 && (
              <motion.div key="step4">
                <Heading color="green.400" mb={4}>
                  Password Updated
                </Heading>

                <Text mb={6}>
                  You can now login with your new password.
                </Text>

                <Button
                  width="full"
                  onClick={() => {
                    setStep(1);
                    setEmail("");
                    setOtp("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Back to Start
                </Button>
              </motion.div>
            )}

          </AnimatePresence>

          <div className="mt-10 border-t pt-6">
            <Link to="/" className="text-sm flex items-center justify-center gap-2">
              <FiArrowLeft /> Return
            </Link>
          </div>

        </div>
      </MotionBox>
    </div>
  );
}