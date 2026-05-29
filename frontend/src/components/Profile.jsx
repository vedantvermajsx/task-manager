import { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Stack,
  Flex,
  Avatar,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Stat,
  StatNumber,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiXCircle,
  FiClipboard,
  FiLogOut,
} from "react-icons/fi";
import AuthApi from "../api/AuthApi";

import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate();


  const logout = async () => {
    try {
      const response = await AuthApi.logout();
      if (response.success) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };


  const { user } = useContext(AuthContext);

  const [totalTasks, setTotalTask] = useState(0);
  const [completedTasks, setCompletedTask] = useState(0);
  const [failedTasks, setFailedTask] = useState(0);


  useEffect(() => {
    const fetchProfile = async () => {
      setTotalTask(user.totalTasks);
      setCompletedTask(user.completedTasks);
      setFailedTask(totalTasks - completedTasks);

    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <Flex
        minH="100vh"
        bg="#0a0a0a"
        align="center"
        justify="center"
        color="white"
      >
        <Text fontSize="lg" color="whiteAlpha.700">
          Loading profile...
        </Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg="#0a0a0a" color="white" py={10} px={4}>
      <Container maxW="6xl">
        {/* Navbar */}
        <Flex justify="space-between" align="center" mb={10}>
          <Button
            leftIcon={<FiArrowLeft />}
            onClick={() => navigate("/")}
            bg="whiteAlpha.100"
            color="white"
            _hover={{
              bg: "whiteAlpha.200",
            }}
            rounded="xl"
          >
            Back
          </Button>

          <Button
            leftIcon={<FiLogOut />}
            onClick={logout}
            bg="red.500"
            color="white"
            _hover={{
              bg: "red.400",
            }}
            rounded="xl"
          >
            Logout
          </Button>
        </Flex>

        {/* Profile Card */}
        <Box
          bg="#111111"
          border="1px solid"
          borderColor="whiteAlpha.100"
          rounded="3xl"
          p={{ base: 8, md: 12 }}
          mb={10}
          boxShadow="0 0 40px rgba(0,0,0,0.5)"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={10}
          >
            <Avatar
              size="2xl"
              src={user?.avatar}
              name={user?.username}
              border="3px solid rgba(255,255,255,0.08)"
            />

            <Box flex="1">
              <Stack spacing={4}>
                <Badge
                  colorScheme="gray"
                  w="fit-content"
                  px={4}
                  py={1}
                  rounded="full"
                  fontSize="0.75rem"
                  textTransform="capitalize"
                >
                  {user?.role || "User"}
                </Badge>

                <Heading size="2xl" fontWeight="800" color="white">
                  {user?.username || "Guest"}
                </Heading>

                <Text color="whiteAlpha.700" fontSize="lg">
                  {user?.email || "No Email"}
                </Text>

                {user?.bio && (
                  <Text
                    color="whiteAlpha.800"
                    lineHeight="1.8"
                    maxW="700px"
                  >
                    {user.bio}
                  </Text>
                )}
              </Stack>
            </Box>
          </Flex>
        </Box>

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            icon={FiClipboard}
            color="#3b82f6"
          />

          <StatCard
            title="Completed"
            value={completedTasks}
            icon={FiCheckCircle}
            color="#22c55e"
          />

          <StatCard
            title="Failed"
            value={failedTasks}
            icon={FiXCircle}
            color="#ef4444"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <Box
      bg="#111111"
      border="1px solid"
      borderColor="whiteAlpha.100"
      rounded="2xl"
      p={7}
      boxShadow="0 0 30px rgba(0,0,0,0.35)"
      transition="0.2s ease"
      _hover={{
        borderColor: "whiteAlpha.300",
      }}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text color="whiteAlpha.700" fontWeight="600">
          {title}
        </Text>

        <Flex
          w="50px"
          h="50px"
          align="center"
          justify="center"
          rounded="xl"
          bg={`${color}20`}
        >
          <Icon as={icon} color={color} boxSize={5} />
        </Flex>
      </Flex>

      <Stat p={0}>
        <StatNumber fontSize="5xl" fontWeight="800" color="white">
          {value}
        </StatNumber>
      </Stat>
    </Box>
  );
}