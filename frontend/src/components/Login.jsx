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
    Spinner,
} from "@chakra-ui/react";
import MyToaster from "./MyToaster.jsx";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthApi from "../api/AuthApi.js";
import LoginRequest from '../models/LoginRequest.js';

const MotionBox = motion(Box);

export default function Login() {
    const navigate = useNavigate();

    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
    const isFormValid = form.email && isEmailValid(form.email) && form.password.length >= 6;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid(form.email)) {
            MyToaster.warning("Please enter a valid email");
            return;
        }
        if (form.password.length < 6) {
            MyToaster.warning("Please enter a password of at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const request = new LoginRequest(form.email, form.password);
            const data = await AuthApi.login(request);
            if (data.success) {
                MyToaster.success(data.message);
                navigate("/");
            } else {
                MyToaster.warning(data.message);
            }
        } catch (err) {
            MyToaster.error(err?.response?.data?.message || err.message || "Login failed");
        } finally {
            setLoading(false);
        }
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
                            Welcome Back
                        </Heading>
                        <Text className="text-white/80 mt-2 text-xs font-bold uppercase tracking-[0.2em]">
                            Taskly
                        </Text>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative max-w-sm mx-auto">
                        <FormControl>
                            <FormLabel className="!text-white/70 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5">
                                Gmail / Email
                            </FormLabel>
                            <Input
                                name="email"
                                type="email"
                                placeholder="name@gmail.com"
                                value={form.email}
                                onChange={handleChange}
                                size="lg"
                                h="50px"
                                className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/40 !rounded-xl focus:!border-brand-500"
                                _placeholder={{ color: "whiteAlpha.400" }}
                                _focus={{ borderColor: "brand.500", boxShadow: "none" }}
                                color="white"
                                fontSize="sm"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel className="!text-white/70 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5">
                                Password
                            </FormLabel>
                            <InputGroup size="lg">
                                <Input
                                    name="password"
                                    type={showPwd ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    h="50px"
                                    className="!bg-white/10 !border-white/20 !text-white placeholder:!text-white/40 !rounded-xl focus:!border-brand-500"
                                    _placeholder={{ color: "whiteAlpha.400" }}
                                    _focus={{ borderColor: "brand.500", boxShadow: "none" }}
                                    color="white"
                                    fontSize="sm"
                                />
                                <InputRightElement width="4rem" h="60px">
                                    <Button
                                        h="2rem"
                                        mb="5px"
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

                        <div className="flex justify-end pr-2">
                            <Link
                                to="/forgot-password"
                                className="text-white/60 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <AnimatePresence>
                            <motion.div
                                initial={{ height: "auto", opacity: 1 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            >
                                <Button
                                    type="submit"
                                    width="full"
                                    size="lg"
                                    h="55px"
                                    bg={"white"}
                                    _hover={{
                                        bg: isFormValid ? "whiteAlpha.900" : "white"
                                    }}
                                    _active={{ transform: "translateY(0)" }}
                                    _disabled={{
                                        opacity: 0.3,
                                        bg: "whiteAlpha.400"
                                    }}
                                    color="black"
                                    borderRadius="xl"
                                    fontWeight="900"
                                    fontSize="sm"
                                    textTransform="uppercase"
                                    letterSpacing="0.3em"
                                    transition="all 0.3s ease"
                                    isDisabled={loading}
                                >
                                    {loading ? <Spinner size="sm" thickness="4px" color="black" /> : "Sign In"}
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </form>

                    <div className="mt-12 relative">
                        <Divider borderColor="whiteAlpha.300" />
                        <p className="text-center text-white/40 text-[9px] mt-8 font-black uppercase tracking-[0.2em]">
                            New here?{" "}
                            <Link
                                to="/register"
                                className="text-white hover:text-brand-400 transition-colors ml-1"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </MotionBox>
        </div>
    );
}
