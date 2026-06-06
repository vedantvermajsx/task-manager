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
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, px } from "framer-motion";
import AuthApi from "../api/AuthApi.js";
import RegisterRequest from "../models/ResisterRequest.js";
import MyToaster from "./MyToaster.jsx";

const MotionBox = motion(Box);

export default function Register() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = form.name.length >= 2 && isEmailValid(form.email) && form.password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      if (form.name.length < 2) {
        MyToaster.warning("Name must be at least 2 characters long", "error");
      }
      if (!isEmailValid(form.name)) {
        MyToaster.warning("Enter correct name");
      }
      if (!isEmailValid) {
        MyToaster.warning("Enter correct email address");
      }
      if (form.password.length < 8) {
        MyToaster.warning("Password must be at least 8 characters long");
      }
      return;
    }

    setLoading(true);

    try {
      const request = new RegisterRequest(form.name, form.email, form.password);
      const data = await AuthApi.register(request);

      if (data.success) {
        MyToaster.success(data.message || "Registeration successful");
        navigate("/login");
      } else {
        MyToaster.warning(data.message || "Registeration failed");
      }
    } catch (err) {
      MyToaster.error(err?.response?.data?.message || err.message || "Registeration failed");
    } finally {
      setLoading(false);
    }
  };


  const inputStyles = {
    h: "60px",
    bg: "whiteAlpha.200",
    borderColor: "whiteAlpha.300",
    borderRadius: "xl",
    color: "white",
    _placeholder: { color: "whiteAlpha.500" },
    _focus: { borderColor: "brand.500", boxShadow: "none" },
    transition: "all 0.2s",
    fontSize: "sm"
  };

  const labelStyles = {
    className: "!text-white/80 !text-[9px] !font-black !uppercase !tracking-[0.2em] ml-1 mb-1.5"
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden relative">
      {/* Decorative Clipped Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[100px] clip-abstract rotate-180" />

      <MotionBox
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg z-10"
      >
        <div className="glass-card p-16 shadow-2xl relative overflow-hidden custom-clip border-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none" />

          <div className="text-center mb-10 relative flex flex-col items-center">
            <Heading as="h1" size="lg" letterSpacing="-0.03em" className="text-white font-black">
              Create Account
            </Heading>
            <Text className="text-white/80 mt-2 text-xs font-bold uppercase tracking-[0.2em]">
              Join Taskly
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative max-w-sm mx-auto">
            <FormControl>
              <FormLabel {...labelStyles}>Full Name</FormLabel>
              <Input
                name="name"
                placeholder="Ex. John Doe"
                value={form.name}
                onChange={handleChange}
                {...inputStyles}
                h={"50px"}
              />
            </FormControl>

            <FormControl>
              <FormLabel {...labelStyles}>Gmail / Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="name@gmail.com"
                value={form.email}
                onChange={handleChange}
                {...inputStyles}
                h={"50px"}
              />
            </FormControl>

            <FormControl>
              <FormLabel {...labelStyles}>Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  {...inputStyles}
                  h={"50px"}
                />
                <InputRightElement width="4rem" h="60px">
                  <Button
                    h="1.5rem"
                    mb="5px"
                    size="xs"
                    variant="unstyled"
                    onClick={() => setShowPwd((v) => !v)}
                    color="whiteAlpha.700"
                    _hover={{ color: "white" }}
                    fontWeight="black"
                    textTransform="uppercase"
                  >
                    {showPwd ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <AnimatePresence>
              {(
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
                    {loading ? <Spinner size="sm" thickness="4px" color="black" /> : "Register"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-14 pt-8 border-t border-white/10 relative">
            <p className="text-center text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">
              Already a user?{" "}
              <Link
                to="/"
                className="text-white hover:text-brand-400 transition-colors ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </MotionBox>
    </div>
  );
}
