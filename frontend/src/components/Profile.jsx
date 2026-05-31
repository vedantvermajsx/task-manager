import { useState, useEffect, useContext, useRef } from "react";
import {
  Box, Container, Stack, Flex, Avatar,
  Heading,
  Text, Button, SimpleGrid, Stat,
  StatNumber, Badge, Icon,
  Input, Textarea, HStack, Spinner
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiXCircle,
  FiClipboard,
  FiLogOut,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera
} from "react-icons/fi";
import AuthApi from "../api/AuthApi";

import { AuthContext } from "../contexts/AuthContext";
import MonthStatus from "./MonthStatus";

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


  const { user, setUser } = useContext(AuthContext);

  const [totalTasks, setTotalTask] = useState(0);
  const [completedTasks, setCompletedTask] = useState(0);
  const [failedTasks, setFailedTask] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);



  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setTotalTask(user.totalTasks || 0);
        setCompletedTask(user.completedTasks || 0);
        setFailedTask((user.totalTasks || 0) - (user.completedTasks || 0));

        setEditUsername(user.username || "");
        setEditDescription(user.description || "");
        setEditAvatarUrl(user.avatar || "");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const data = await AuthApi.updateProfilePic(user._id || user.id, file);

      if (data.success) {
        setEditAvatarUrl(data.url);
      }
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setIsUploading(false);
    }

  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      const response = await AuthApi.updateUser(user._id || user.id, {
        username: editUsername,
        bio: editDescription,
      });

      if (response.success) {
        const updated = response.user || {
          ...user,
          username: editUsername,
          description: editDescription,
          avatar: editAvatarUrl,
        };

        setUser(updated);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSaving(false);
    }
  };

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
            position="relative"
          >
            {!isEditing && (
              <Button
                position="absolute"
                top={-5}
                right={-5}
                leftIcon={<FiEdit2 />}
                onClick={() => setIsEditing(true)}
                bg="whiteAlpha.100"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                rounded="xl"
                size="sm"
                zIndex={5}
              >
                edit profile
              </Button>
            )}

            <Box position="relative">
              <Avatar
                size="2xl"
                src={isEditing ? editAvatarUrl : user?.avatar}
                name={user?.username}
                border="3px solid rgba(255,255,255,0.08)"
                opacity={isUploading ? 0.5 : 1}
              />
              {isUploading && (
                <Flex
                  position="absolute"
                  top={0}
                  left={0}
                  w="100%"
                  h="100%"
                  align="center"
                  justify="center"
                >
                  <Spinner color="blue.500" thickness="4px" />
                </Flex>
              )}
              {isEditing && !isUploading && (
                <>
                  <Flex
                    position="absolute"
                    bottom={0}
                    right={0}
                    bg="blue.500"
                    p={2}
                    rounded="full"
                    cursor="pointer"
                    onClick={() => fileInputRef.current?.click()}
                    _hover={{ bg: "blue.400" }}
                    border="2px solid #111111"
                  >
                    <Icon as={FiCamera} color="white" />
                  </Flex>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </>
              )}
            </Box>

            <Box flex="1" w="full">
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

                {isEditing ? (
                  <Stack spacing={3}>
                    <Input
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      bg="whiteAlpha.100"
                      color="white"
                      border="none"
                      _focus={{ ring: 2, ringColor: "blue.400" }}
                      placeholder="Username"
                    />
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      bg="whiteAlpha.100"
                      color="white"
                      border="none"
                      _focus={{ ring: 2, ringColor: "blue.400" }}
                      placeholder="Bio (optional)"
                      resize="vertical"
                    />
                    <HStack spacing={3}>
                      <Button
                        leftIcon={<FiSave />}
                        onClick={handleSaveProfile}
                        bg="blue.500"
                        color="white"
                        _hover={{ bg: "blue.400" }}
                        rounded="xl"
                        size="sm"
                      >
                        {isSaving ? <Spinner size="sm" /> : "Save"}
                      </Button>
                      <Button
                        leftIcon={<FiX />}
                        onClick={() => {
                          setEditUsername(user?.username || "");
                          setEditDescription(user?.description || "");
                          setEditAvatarUrl(user?.avatar || "");
                          setIsEditing(false);
                        }}
                        bg="whiteAlpha.100"
                        color="white"
                        _hover={{ bg: "whiteAlpha.200" }}
                        rounded="xl"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </Stack>
                ) : (
                  <>
                    <Heading size="2xl" fontWeight="800" color="white">
                      {user?.username || "Guest"}
                    </Heading>

                    <Text color="whiteAlpha.700" fontSize="lg">
                      {user?.email || "No Email"}
                    </Text>

                    <Box bg="whiteAlpha.100" p={4} rounded="xl">

                      <Text
                        color={user?.description ? "whiteAlpha.800" : "whiteAlpha.500"}
                        lineHeight="1.8"
                        maxW="700px"
                        fontStyle={user?.description ? "normal" : "italic"}
                      >
                        {user?.description || "No bio added yet"}
                      </Text>
                    </Box>
                  </>
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

        <MonthStatus />
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