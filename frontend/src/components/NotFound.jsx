import {
    Box,
    Button,
    Heading,
    Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative bg-[#050510]">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 blur-[100px] clip-abstract" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-500/5 blur-[100px] clip-shape" />

            <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md z-10 text-center"
            >
                <div className="glass-card p-12 shadow-2xl relative overflow-hidden custom-clip border-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

                    <Heading
                        as="h1"
                        size="6xl"
                        letterSpacing="-0.05em"
                        className="text-white font-black mb-4"
                    >
                        404
                    </Heading>
                    <Heading
                        as="h2"
                        size="lg"
                        letterSpacing="-0.03em"
                        className="text-white font-bold mb-2"
                    >
                        Page Not Found
                    </Heading>
                    <Text className="text-white/70 mb-8 text-sm">
                        The page you're looking for doesn't exist or has been moved.
                    </Text>

                    <Button
                        onClick={() => navigate("/")}
                        width="full"
                        size="lg"
                        h="60px"
                        bg="white"
                        _hover={{ bg: "whiteAlpha.900" }}
                        color="black"
                        borderRadius="xl"
                        fontWeight="900"
                        fontSize="sm"
                        textTransform="uppercase"
                        letterSpacing="0.3em"
                        transition="all 0.3s ease"
                    >
                        Go Back Home
                    </Button>
                </div>
            </MotionBox>
        </div>
    );
}
