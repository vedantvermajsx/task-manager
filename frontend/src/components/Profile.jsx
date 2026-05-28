import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Flex,
  Avatar,
  Heading,
  Text,
  Button,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiActivity, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const MotionBox = motion(Box);

export default function Profile() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);



  const [stats, setStats] = useState({
    created: 0,
    completed: 0,
    failed: 0,
  });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("t-tasks") || "[]");
    setStats({
      created: tasks.length,
      completed: tasks.filter(t => t.status === "completed").length,
      failed: tasks.filter(t => t.status === "failed").length,
    });
  }, []);

  const name = user?.username || 'Guest';
  const email = user?.email || 'Guest@gmail.com';
  const avatar = user?.avatar || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.GmWaVMo5nh1zRRlhUtYoSAHaG4%3Fr%3D0%26pid%3DApi&f=1&ipt=d905f5d456b4da1504cb5e5a724cbebcd83ba6190ace8c6668fdbf9d936777dc&ipo=images';

  return (
    <div className="min-h-screen text-white bg-transparent relative">
      {/* Navbar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem 4rem"
        className="glass sticky top-0 z-50 border-b border-white/10"
      >
        <Button
          variant="ghost"
          color="whiteAlpha.700"
          _hover={{ color: "white", bg: "whiteAlpha.100" }}
          leftIcon={<FiArrowLeft />}
          onClick={() => navigate("/")}
          fontSize="xs"
          fontWeight="900"
          textTransform="uppercase"
          letterSpacing="0.2em"
        >
          Back
        </Button>
        <Heading as="h2" size="sm" letterSpacing="0.2em" className="text-white font-black uppercase">
          Profile
        </Heading>
        <Box w="80px" /> {/* Spacer */}
      </Flex>

      <Container maxW={"4xl"} py={24}>
        <Stack spacing={16}>
          {/* Hero Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-[3.5rem] border-none custom-clip flex flex-col items-center text-center"
          >
            <Avatar
              size="2xl"
              name={name}
              src={avatar}
              border="2px solid rgba(255,255,255,0.3)"
              p={1}
              mb={8}
            />
            <Heading size="2xl" letterSpacing="-0.04em" fontWeight={900} mb={2} color="white">
              {name}
            </Heading>
            <Heading size="lg" letterSpacing="-0.04em" fontWeight={600} mb={2} color="white">
              {email}
            </Heading>

            <Text color="brand.400" fontWeight={900} fontSize="xs" textTransform="uppercase" letterSpacing="0.4em">
              Lead System Architect
            </Text>

            <Divider borderColor="whiteAlpha.300" my={10} maxW="100px" />

            <Text color="whiteAlpha.800" fontSize="md" maxW="md" lineHeight="1.8" fontWeight="500">
              Overseeing the core infrastructure and task orchestration for the T-Manager network.
              Dedicated to absolute efficiency and geometric precision.
            </Text>
          </MotionBox>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] border-none"
            >
              <Stat>
                <StatLabel color="whiteAlpha.800" mb={4}>
                  <Flex align="center" gap={3}>
                    <FiActivity size={14} />
                    <Text fontSize="10px" fontWeight={900} textTransform="uppercase" letterSpacing="0.2em">Assigned</Text>
                  </Flex>
                </StatLabel>
                <StatNumber fontSize="6xl" fontWeight={900} color="white">{stats.created}</StatNumber>
                <StatHelpText color="whiteAlpha.600" fontSize="xs">Lifetime directives</StatHelpText>
              </Stat>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 rounded-[2.5rem] border-none shadow-[0_0_40px_-10px_rgba(72,187,120,0.2)]"
            >
              <Stat>
                <StatLabel color="green.400" mb={4}>
                  <Flex align="center" gap={3}>
                    <FiCheckCircle size={14} />
                    <Text fontSize="10px" fontWeight={900} textTransform="uppercase" letterSpacing="0.2em">Resolved</Text>
                  </Flex>
                </StatLabel>
                <StatNumber fontSize="6xl" fontWeight={900} color="green.400">{stats.completed}</StatNumber>
                <StatHelpText color="whiteAlpha.600" fontSize="xs">Successful executions</StatHelpText>
              </Stat>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-10 rounded-[2.5rem] border-none shadow-[0_0_40px_-10px_rgba(245,101,101,0.2)]"
            >
              <Stat>
                <StatLabel color="red.400" mb={4}>
                  <Flex align="center" gap={3}>
                    <FiXCircle size={14} />
                    <Text fontSize="10px" fontWeight={900} textTransform="uppercase" letterSpacing="0.2em">Aborted</Text>
                  </Flex>
                </StatLabel>
                <StatNumber fontSize="6xl" fontWeight={900} color="red.400">{stats.failed}</StatNumber>
                <StatHelpText color="whiteAlpha.600" fontSize="xs">System failures</StatHelpText>
              </Stat>
            </MotionBox>
          </SimpleGrid>

          {/* Action Footer */}
          <Flex justify="center" pt={10}>
            <Button
              variant="outline"
              borderColor="whiteAlpha.300"
              _hover={{ bg: "whiteAlpha.100", borderColor: "white" }}
              color="whiteAlpha.700"
              px={12} h="60px"
              borderRadius="2xl"
              fontSize="xs"
              fontWeight="900"
              textTransform="uppercase"
              letterSpacing="0.3em"
              onClick={() => navigate("/")}
            >
              Terminate Session
            </Button>
          </Flex>
        </Stack>
      </Container>
    </div>
  );
}
