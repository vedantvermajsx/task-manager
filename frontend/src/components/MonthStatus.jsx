import { useEffect, useState, useMemo } from "react";
import { Box, Heading, Spinner, Flex } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import TaskApi from "../api/TaskApi";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function MonthStatus({ allTasks, loading: externalLoading, isStatic = false }) {
  const [data, setData] = useState([]);
  const [internalTasks, setInternalTasks] = useState([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (isStatic) {
      const fetchStaticTasks = async () => {
        setInternalLoading(true);
        try {
          const response = await TaskApi.getAllTasks();
          if (response.success) {
            setInternalTasks(response.ResponseTasks || []);
          }
        } catch (err) {
          MyToaster.error(err?.response?.data?.message || err.message || "Failed to fetch tasks", "error");
        } finally {
          setInternalLoading(false);
        }
      };

      fetchStaticTasks();
    }
  }, [isStatic]);

  useEffect(() => {
    if (isStatic) return;

    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 60000); 

    return () => clearInterval(intervalId);
  }, [isStatic]);

  const tasksToUse = isStatic ? internalTasks : allTasks;
  const loading = isStatic ? internalLoading : externalLoading;

  const calculatedData = useMemo(() => {
    const monthDataMap = MONTHS.reduce((acc, month) => {
      acc[month] = { name: month, Total: 0, Completed: 0, Failed: 0 };
      return acc;
    }, {});

    const currentNow = Date.now();

    tasksToUse.forEach(task => {
      if (task.createdAt) {
        const date = new Date(task.createdAt);
        const month = MONTHS[date.getMonth()];
        const hoursElapsed = (currentNow - date.getTime()) / (1000 * 60 * 60);
        if (monthDataMap[month]) {
          monthDataMap[month].Total += 1;
          if (task.completed) {
            monthDataMap[month].Completed += 1;
          } else if (hoursElapsed >= 24) {
            monthDataMap[month].Failed += 1;
          }
        }
      }
    });

    return Object.values(monthDataMap);
  }, [tasksToUse, isStatic]);

  useEffect(() => {
    setData(calculatedData);
  }, [calculatedData]);

  return (
    <Box
      bg="whiteAlpha.50"
      p={6}
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      w="full"
      mt={8}
      h="400px"
    >
      <Heading size="md" mb={6} color="white" letterSpacing="0.05em">
        Monthly Task Overview
      </Heading>

      {loading ? (
        <Flex h="full" w="full" align="center" justify="center">
          <Spinner color="purple.400" size="xl" />
        </Flex>
      ) : (
        <Box h="300px" w="full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#ffffff70"
                tick={{ fill: '#ffffff70', fontSize: 12 }}
              />
              <YAxis
                stroke="#ffffff70"
                tick={{ fill: '#ffffff70', fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                contentStyle={{
                  backgroundColor: '#0a0a1a',
                  borderColor: '#ffffff20',
                  color: 'white',
                  borderRadius: '8px'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar
                dataKey="Total"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar
                dataKey="Completed"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar
                dataKey="Failed"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
}

export default MonthStatus;
