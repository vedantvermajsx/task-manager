import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Heading,
  Divider,
  Alert,
  AlertIcon,
  Spinner,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import AuthApi from "../api/AuthApi";
import PasswordRequest from "../models/PasswordRequest";
import MyToaster from "./MyToaster";

const MotionBox = motion(Box);

const stepTitles = ["Reset Password", "Verify OTP", "Set New Password", "Success"];
const totalSteps = 3;
const OTP_LENGTH = 8;

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const isEmailValid = (e) => /\S+@\S+\.\S+/.test(e);
  const isEmailFormValid = email && isEmailValid(email);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!isEmailFormValid) {
      MyToaster.warning("Please enter a valid email", "error");
      return;
    }

    setLoading(true);

    try {

      const response = await AuthApi.sendOtp(new PasswordRequest(email));
      if (response.success) {
        MyToaster.success("OTP sent successfully", "success");
        setStep(2);
      } else {
        MyToaster.warning(response.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      MyToaster.error(err?.message || "Failed to send OTP", "error");
    }

    setLoading(false);
  };

  // STEP 2: VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== OTP_LENGTH) {
      MyToaster.warning("Please enter a valid OTP", "error");
      return;
    }

    setLoading(true);

    try {
      const data = await AuthApi.verifyOtp(new PasswordRequest(email, otp));
      if (data.success) {
        setToken(data.token);
        setStep(3);
        MyToaster.success("OTP verified successfully", "success");
      } else {
        MyToaster.warning(data.message || "Failed to verify OTP", "error");
      }
    } catch (err) {
      MyToaster.error(err?.message || "Invalid OTP", "error");
    }

    setLoading(false);
  };

  // STEP 3: RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || password !== confirmPassword) {
      MyToaster.warning("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await AuthApi.updatePassword(new PasswordRequest(email, null, password, token));

      if (response.success) {
        setStep(4);
        MyToaster.success("Password updated successfully", "success");
      } else {
        MyToaster.warning(response.message || "Failed to update password", "error");
      }
    } catch (err) {
      MyToaster.error(err?.message || "Password update failed", "error");
    }

    setLoading(false);
  };

  const resetForm = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 blur-[100px] clip-abstract" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-500/5 blur-[100px] clip-shape" />

      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-12 shadow-2xl relative overflow-hidden custom-clip border-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

          <div className="text-center mb-8 relative flex flex-col items-center">
            <Heading
              as="h1"
              size="xl"
              letterSpacing="-0.03em"
              className="text-white font-black"
            >
              {stepTitles[step - 1]}
            </Heading>
            <Text className="text-white/80 mt-2 text-xs font-bold uppercase tracking-[0.2em]">
              T Dashboard
            </Text>
          </div>

          {step <= totalSteps && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${s < step
                      ? "bg-green-500 text-black"
                      : s === step
                        ? "bg-white text-black scale-110"
                        : "bg-white/20 text-white/60"
                      }`}
                  >
                    {s < step ? <FiCheckCircle size={14} /> : s}
                  </div>
                  {s < totalSteps && (
                    <div
                      className={`w-12 h-0.5 mx-1 ${s < step ? "bg-green-500" : "bg-white/20"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {error && (
            <Alert
              status="error"
              borderRadius="xl"
              mb={6}
              variant="subtle"
              bg="red.900/20"
              color="red.200"
              fontSize="sm"
            >
              <AlertIcon color="red.400" />
              {error}
            </Alert>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1 - EMAIL */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSendOtp}
                className="space-y-6 relative max-w-sm mx-auto"
              >
                <FormControl>
                  <FormLabel className="!text-white/70 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5">
                    Email Address
                  </FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    size="lg"
                    h="60px"
                    className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/40 !rounded-xl focus:!border-brand-500"
                    _placeholder={{ color: "whiteAlpha.400" }}
                    _focus={{ borderColor: "brand.500", boxShadow: "none" }}
                    color="white"
                    fontSize="sm"
                    autoComplete="email"
                  />
                </FormControl>


                <MyButton loading={loading} text="Send OTP" onClick={handleSendOtp} />

              </motion.form>
            )}

            {/* STEP 2 - OTP */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleVerifyOtp}
                className="space-y-6 relative max-w-sm mx-auto"
              >
                <FormControl>
                  <FormLabel className="!text-white/70 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5">
                    One-Time Password
                  </FormLabel>
                  <div className="flex justify-center w-full">
                    <PinInput
                      value={otp}
                      onChange={setOtp}
                      otp
                      manageFocus
                      size="sm"
                    >
                      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                        <PinInputField
                          key={index}
                          w="36px"
                          h="36px"
                          bg="whiteAlpha.100"
                          mr={2}
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          color="white"
                          rounded="md"
                          textAlign="center"
                          fontSize="lg"
                          fontWeight="bold"
                          _placeholder={{ color: "whiteAlpha.400" }}
                          _focus={{
                            borderColor: "brand.500",
                            boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.3)",
                          }}
                          autoComplete="one-time-code"
                        />
                      ))}
                    </PinInput>
                  </div>
                </FormControl>


                <MyButton loading={loading} text="Verify OTP" onClick={handleVerifyOtp} />

              </motion.form>
            )}

            {/* STEP 3 - PASSWORD */}
            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleResetPassword}
                className="space-y-6 relative max-w-sm mx-auto"
              >
                <FormControl>
                  <FormLabel className="!text-white/70 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5">
                    New Password
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      h="60px"
                      className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/40 !rounded-xl focus:!border-brand-500"
                      _placeholder={{ color: "whiteAlpha.400" }}
                      _focus={{ borderColor: "brand.500", boxShadow: "none" }}
                      color="white"
                      fontSize="sm"
                      autoComplete="new-password"
                    />
                    <InputRightElement width="4rem" h="60px">
                      <Button
                        h="1.5rem"
                        size="xs"
                        variant="unstyled"
                        onClick={() => setShowPwd((v) => !v)}
                        color="whiteAlpha.700"
                        _hover={{ color: "white" }}
                        fontWeight="black"
                        textTransform="uppercase"
                        letterSpacing="widest"
                      >
                        {showPwd ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel className="!text-white/70 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5">
                    Confirm Password
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showConfirmPwd ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      h="60px"
                      className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/40 !rounded-xl focus:!border-brand-500"
                      _placeholder={{ color: "whiteAlpha.400" }}
                      _focus={{ borderColor: "brand.500", boxShadow: "none" }}
                      color="white"
                      fontSize="sm"
                      autoComplete="new-password"
                    />
                    <InputRightElement width="4rem" h="60px">
                      <Button
                        h="1.5rem"
                        size="xs"
                        variant="unstyled"
                        onClick={() => setShowConfirmPwd((v) => !v)}
                        color="whiteAlpha.700"
                        _hover={{ color: "white" }}
                        fontWeight="black"
                        textTransform="uppercase"
                        letterSpacing="widest"
                      >
                        {showConfirmPwd ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>


                <MyButton loading={loading} text="Update Password" onClick={handleResetPassword} />

              </motion.form>
            )}

            {/* STEP 4 - SUCCESS */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <FiCheckCircle size={48} className="text-green-400" />
                </div>
                <Heading color="green.400" mb={4} size="lg">
                  Password Updated!
                </Heading>
                <Text className="text-white/70 mb-8">
                  You can now log in with your new password.
                </Text>
                <MyButton loading={loading} text="Back to Login" onClick={resetForm} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 relative">
            <Divider borderColor="whiteAlpha.300" />
            <p className="text-center text-white/40 text-[9px] mt-8 font-black uppercase tracking-[0.2em]">
              <Link
                to="/"
                className="text-white/60 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
              >
                <FiArrowLeft /> Return to Login
              </Link>
            </p>
          </div>

        </div>
      </MotionBox>
    </div>
  );
}

function MyButton({ loading, text, onClick }) {
  return (
    <Button
      width="full"
      size="lg"
      h="65px"
      bg="white"
      _hover={{ bg: "whiteAlpha.900" }}
      color="black"
      borderRadius="xl"
      fontWeight="900"
      fontSize="sm"
      textTransform="uppercase"
      letterSpacing="0.3em"
      onClick={onClick}
      isDisabled={loading}
    >
      {loading ? (
        <Spinner size="sm" thickness="4px" color="black" />
      ) : (
        text
      )}
    </Button>
  );
}