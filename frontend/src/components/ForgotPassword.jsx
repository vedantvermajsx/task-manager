import React, { useState } from "react";
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

const MotionBox = motion(Box);

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const isEmailValid = (e) => /\S+@\S+\.\S+/.test(e);
  const isFormValid = email && isEmailValid(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative">
      {/* Decorative Clipped Shapes */}
      <div className="absolute top-[20%] left-[-5%] w-[30%] h-[30%] bg-pink-500/5 blur-[80px] clip-shape rotate-45" />

      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-12 shadow-2xl relative overflow-hidden custom-clip border-none text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-20 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="request"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center"
              >
                <Heading as="h1" size="xl" letterSpacing="-0.03em" className="text-white font-black mt-4 mb-6">
                  Reset System
                </Heading>
                <Text className="text-white/80 mb-10 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
                  Enter credentials to initiate recovery
                </Text>

                {error && (
                  <Alert status="error" borderRadius="xl" mb={6} variant="subtle" bg="red.900/20" color="red.200" fontSize="sm">
                    <AlertIcon color="red.400" />
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xs mx-auto">
                  <FormControl>
                    <FormLabel className="!text-white/80 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5">
                      Gmail / Email
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      h="60px"
                      className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/40 !rounded-xl focus:!border-brand-500 text-center"
                      _placeholder={{ color: "whiteAlpha.400" }}
                      _focus={{ borderColor: "brand.500", boxShadow: "none" }}
                      fontSize="sm"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    width="full"
                    size="lg"
                    h="65px"
                    bg={"white"}
                    _hover={{
                      bg: isFormValid ? "whiteAlpha.900" : "white"
                    }}
                    _active={{ transform: "translateY(0)" }}
                    _disabled={{
                      opacity: 0.3,
                      cursor: "not-allowed",
                      bg: "whiteAlpha.400"
                    }}
                    color="black"
                    borderRadius="xl"
                    fontWeight="900"
                    fontSize="sm"
                    textTransform="uppercase"
                    letterSpacing="0.3em"
                    transition="all 0.3s ease"
                    isDisabled={!isFormValid || loading}
                  >
                    {loading ? <Spinner size="sm" thickness="4px" color="black" /> : "Send Code"}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center"
              >
                <Heading as="h1" size="xl" letterSpacing="-0.03em" className="text-green-400 font-black mb-6">
                  Transmitted
                </Heading>
                <Text className="text-white/80 mb-10 text-xs font-bold uppercase tracking-widest">
                  Recovery link sent to <br /><span className="text-white">{email}</span>
                </Text>

                <Button
                  width="full"
                  size="lg"
                  h="60px"
                  variant="outline"
                  borderColor="whiteAlpha.100"
                  color="whiteAlpha.600"
                  borderRadius="xl"
                  _hover={{ bg: "whiteAlpha.100", color: "white", borderColor: "whiteAlpha.300" }}
                  onClick={() => { setSent(false); setEmail(""); }}
                  fontSize="xs"
                  fontWeight="900"
                  textTransform="uppercase"
                  letterSpacing="0.2em"
                  transition="all 0.3s"
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 pt-8 border-t border-white/10 relative">
            <Link
              to="/"
              className="text-white/60 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all inline-flex items-center gap-2"
            >
              <FiArrowLeft size={12} /> Return to System
            </Link>
          </div>
        </div>
      </MotionBox>
    </div>
  );
}
