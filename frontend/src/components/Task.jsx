import {
    Box,
    Text,
    Flex,
    Badge,
    Button,
    VStack,
    HStack, Spinner
} from "@chakra-ui/react";
import { useState } from "react";
import { FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";

const Task = ({
    id,
    title,
    description,
    completed,
    onDelete,
    onToggle,
}) => {

    const [deleting, setDeleting] = useState(false);
    const [toggling, setToggling] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        await onDelete(id);
        setDeleting(false);
    };

    const handleToggle = async () => {
        setToggling(true);
        await onToggle(id);
        setToggling(false);
    };

    return (
        <Box
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.100"
            borderRadius="2xl"
            p={6}
            transition="0.2s ease"
            mb={4}
        >
            <Flex justify="space-between" align="start" gap={4}>
                {/* Left Content */}
                <VStack align="start" spacing={3} flex={1}>
                    <HStack spacing={3}>
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="white"
                            textDecoration={completed ? "line-through" : "none"}
                            opacity={completed ? 0.6 : 1}
                        >
                            {title}
                        </Text>

                        <Badge
                            colorScheme={completed ? "green" : "purple"}
                            borderRadius="full"
                            px={3}
                            py={1}
                            textTransform="uppercase"
                            fontSize="0.7rem"
                            letterSpacing="0.08em"
                        >
                            {completed ? "Completed" : "Pending"}
                        </Badge>
                    </HStack>

                    <Text
                        color="whiteAlpha.700"
                        fontSize="sm"
                        lineHeight="tall"
                    >
                        {description}
                    </Text>
                </VStack>

                {/* Actions */}
                <HStack spacing={3}>
                    <Button
                        leftIcon={
                            completed ? <FiCircle /> : <FiCheckCircle />
                        }
                        onClick={() => handleToggle(id)}
                        bg={completed ? "orange.400" : "green.400"}
                        color="white"
                        borderRadius="xl"
                        _hover={{
                            opacity: 0.9,
                        }}
                    >
                        {toggling ? <Spinner size="sm" thickness="4px" color="black" /> : completed ? "Undo" : "Done"}
                    </Button>

                    <Button
                        leftIcon={<FiTrash2 />}
                        onClick={() => handleDelete(id)}
                        bg="red.500"
                        color="white"
                        borderRadius="xl"
                        _hover={{
                            bg: "red.400",
                        }}
                    >
                        {deleting ? <Spinner size="sm" thickness="4px" color="black" /> : "Delete"}
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
};

export default Task;