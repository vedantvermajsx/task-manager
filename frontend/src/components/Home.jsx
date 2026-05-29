import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  VStack, Spinner
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import TaskList from "./TaskList";
import { useState } from "react";
import TaskApi from "../api/TaskApi";
import TaskRequest from "../models/TaskRequest.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useContext } from "react";
import AuthApi from "../api/AuthApi.js";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);


  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim() || !taskDescription.trim()) return;

    try {
      const newTask = new TaskRequest(
        taskTitle.trim(),
        taskDescription.trim()
      );

      setAdding(true);
      const response = await TaskApi.createTask(newTask);

      if (response.success) {
        setTasks((prev) => [...prev, response.ResponseTask]);

        setTaskTitle("");
        setTaskDescription("");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setAdding(false);
    }
  };

  const name = user?.username || 'Guest';
  const avatar = user?.avatar || '';


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

  return (
    <div className="min-h-screen text-white bg-[#050510] relative">
      {/* Navbar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem 4rem"
        className="sticky top-0 z-50 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl"
      >
        <Flex align="center" gap={3} onClick={() => navigate("/")} cursor="pointer">
          <Heading as="h2" size="sm" letterSpacing="0.2em" className="text-white font-black uppercase">
            T-Manager
          </Heading>
        </Flex>

        <Stack direction={"row"} spacing={6} align="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                name={name}
                src={avatar}
                border="1px solid rgba(255,255,255,0.4)"
              />
            </MenuButton>
            <MenuList
              bg="#0a0a1a"
              borderColor="whiteAlpha.300"
              color="white"
              boxShadow="2xl"
              p={4}
              borderRadius="2xl"
            >
              <MenuItem bg="transparent" borderRadius="xl" _hover={{ bg: "whiteAlpha.200" }} fontWeight={700} fontSize="xs" textTransform="uppercase" letterSpacing="widest" px={6} py={3} onClick={() => navigate("/profile")}>Profile</MenuItem>
              <Box h="1px" bg="whiteAlpha.100" my={2} mx={2} />
              <MenuItem bg="transparent" borderRadius="xl" _hover={{ bg: "whiteAlpha.200", color: "red.400" }} fontWeight={700} fontSize="xs" textTransform="uppercase" letterSpacing="widest" px={6} py={3} onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>


      <Container maxW={"7xl"} py={16}>
        <Flex gap={10} align="start">

          {/* LEFT SIDE */}
          <Box flex="2">
            <VStack spacing={10} align="stretch">

              {/* Header */}
              <Box>
                <Heading
                  size="2xl"
                  letterSpacing="-0.04em"
                  fontWeight={900}
                  color="white"
                >
                  Welcome, {name}
                </Heading>

                <Text
                  color="whiteAlpha.700"
                  mt={2}
                  fontSize="sm"
                  fontWeight={800}
                  textTransform="uppercase"
                  letterSpacing="0.2em"
                >
                  Directive Monitoring Interface
                </Text>
              </Box>

              {/* Add Task */}
              <Box
                bg="whiteAlpha.50"
                p={4}
                borderRadius="2xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
              >
                <form onSubmit={addTask}>
                  <VStack spacing={4}>

                    <Input
                      type="text"
                      placeholder="Enter task title..."
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      bg="transparent"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      h="55px"
                      borderRadius="xl"
                      color="white"
                    />

                    <Input
                      type="text"
                      placeholder="Enter task description..."
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      bg="transparent"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      h="55px"
                      borderRadius="xl"
                      color="white"
                    />

                    <Button
                      type="submit"
                      leftIcon={<FiPlus />}
                      w="full"
                      h="55px"
                      bg="white"
                      color="black"
                      borderRadius="xl"
                    >
                      {adding ? (
                        <Spinner size="sm" thickness="4px" color="black" />
                      ) : (
                        "Add Task"
                      )}
                    </Button>
                  </VStack>
                </form>
              </Box>

              {/* TASKS */}
              <TaskList
                selectedDate={selectedDate}
                setTasks={setTasks}
                tasks={tasks}
              />

            </VStack>
          </Box>

          {/* RIGHT SIDE CALENDAR */}
          <Box
            flex="1"
            position="sticky"
            top="100px"
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(255,255,255,0.08)"
            p={5}
            borderRadius="24px"
            backdropFilter="blur(20px)"
          >
            <Heading size="md" mb={5} color="blue">
              Calendar
            </Heading>

            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
            />

            <Text
              mt={5}
              color="whiteAlpha.700"
              fontSize="sm"
            >
              Selected Date:
            </Text>

            <Text color="white" fontWeight="bold">
              {selectedDate.toDateString()}
            </Text>
          </Box>

        </Flex>
      </Container>


    </div>
  );
}
