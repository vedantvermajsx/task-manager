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
import { useState, useEffect } from "react";
import TaskApi from "../api/TaskApi";
import MonthStatus from "./MonthStatus";

import TaskRequest from "../models/TaskRequest.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useContext } from "react";
import AuthApi from "../api/AuthApi.js";
import MyToaster from "./MyToaster";
import { formatDate, getTodayDate } from "../utils/dateUtils.js";

export default function Home() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [allTasksLoading, setAllTasksLoading] = useState(true);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksCount, setTasksCount] = useState(0);

  const today = getTodayDate();
  const selected = formatDate(selectedDate);

  const isPastDate = selected < today;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await TaskApi.getAllTasks();
        if (response.success) {
          setAllTasks(response.ResponseTasks || []);
        } else {
          MyToaster.warning(response.message || "Failed to fetch tasks");
        }
      } catch (err) {
        MyToaster.error(err?.response?.data?.message || err.message || "Failed to fetch tasks");
      } finally {
        setAllTasksLoading(false);
      }
    };

    fetchAll();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim() || !taskDescription.trim()) return;

    try {
      const newTask = new TaskRequest(
        taskTitle.trim(),
        taskDescription.trim(),
        false,
        selectedDate
      );


      setAdding(true);
      const response = await TaskApi.createTask(newTask);


      if (response.success) {
        const createdTask = response.ResponseTask;
        setTasks((prev) => [...prev, createdTask]);
        setAllTasks((prev) => [...prev, createdTask]);
        setTasksCount((prev) => prev + 1);
        setTaskTitle("");
        setTaskDescription("");
        MyToaster.success("Task added successfully");

        setUser(prev => ({ ...prev, tasksCount: prev.tasksCount + 1 }));
      } else {
        MyToaster.error(response.message || "Failed to add task");
      }
    } catch (error) {
      MyToaster.error(error?.response?.data?.message || error.message || "Failed to add task");
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
        MyToaster.success("Logout successful");

        window.location.href = "/";
      }
    } catch (error) {
      MyToaster.error(error?.response?.data?.message || error.message || "Failed to logout");
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#050510] relative">
      { }
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        px={{ base: 4, md: 8, lg: "4rem" }}
        py={{ base: 3, md: "1.5rem" }}
        className="sticky top-0 z-50 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl"
      >
        <Flex align="center" gap={3} onClick={() => navigate("/")} cursor="pointer">
          <Heading as="h2" size="sm" letterSpacing="0.2em" className="text-white font-black uppercase">
            Task Manager
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

      <Container maxW={"7xl"} py={{ base: 6, md: 16 }} px={{ base: 4, md: 6 }}>
        <Flex
          gap={{ base: 6, md: 10 }}
          align="start"
          direction={{ base: "column-reverse", lg: "row" }}
        >

          { }
          <Box flex="2" w={{ base: "100%", lg: "auto" }}>
            <VStack spacing={{ base: 6, md: 10 }} align="stretch">

              { }
              <Box>
                <Heading
                  size={{ base: "lg", md: "xl", lg: "2xl" }}
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
                  What's on your mind?
                </Text>
              </Box>

              { }
              <Box
                bg="whiteAlpha.50"
                p={{ base: 3, md: 4 }}
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
                      h={{ base: "45px", md: "55px" }}
                      borderRadius="xl"
                      fontSize={{ base: "sm", md: "md" }}
                      color="white"
                      isDisabled={isPastDate}
                    />

                    <Input
                      type="text"
                      placeholder="Enter task description..."
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      bg="transparent"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      h={{ base: "45px", md: "55px" }}
                      borderRadius="xl"
                      fontSize={{ base: "sm", md: "md" }}
                      color="white"
                      isDisabled={isPastDate}
                    />

                    <Button
                      type="submit"
                      leftIcon={<FiPlus />}
                      w="full"
                      h={{ base: "45px", md: "55px" }}
                      fontSize={{ base: "xs", md: "sm" }}
                      bg={isPastDate ? "whiteAlpha.300" : "white"}
                      color={isPastDate ? "whiteAlpha.500" : "black"}
                      borderRadius="xl"
                      isDisabled={isPastDate}
                      _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                      title={isPastDate ? "Cannot add tasks for past dates" : ""}
                    >
                      {adding ? (
                        <Spinner size="sm" thickness="4px" color="black" />
                      ) : isPastDate ? (
                        "Cannot add task for past date"
                      ) : (
                        "Add Task"
                      )}
                    </Button>
                  </VStack>
                </form>
              </Box>

              { }
              <TaskList
                selectedDate={selectedDate}
                setTasks={setTasks}
                tasks={tasks}
                tasksCount={tasksCount}
                setTasksCount={setTasksCount}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
              />

              { }
              <MonthStatus allTasks={allTasks} loading={allTasksLoading} />

            </VStack>
          </Box>

          { }
          <Box
            flex="1"
            w={{ base: "100%", lg: "auto" }}
            position={{ base: "relative", lg: "sticky" }}
            top={{ base: "0", lg: "100px" }}
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(255,255,255,0.08)"
            p={{ base: 4, md: 5 }}
            borderRadius="24px"
            backdropFilter="blur(20px)"
          >
            <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 5 }} color="blue">
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
