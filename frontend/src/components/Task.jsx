import {
    Box,
    Text,
    Flex,
    Badge,
    Button,
    VStack,
    HStack,
    Spinner,
    Input,
    Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import { FiTrash2, FiCheckCircle, FiCircle, FiEdit2, FiSave, FiX, FiAlertTriangle } from "react-icons/fi";

const Task = ({
    id,
    title,
    description,
    completed,
    createdAt,
    onDelete,
    onToggle,
    onEdit
}) => {

    const [deleting, setDeleting] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editTitle, setEditTitle] = useState(title);
    const [editDesc, setEditDesc] = useState(description);

    const [mountTime] = useState(() => Date.now());
    const isFailed = createdAt && !completed
        ? (mountTime - new Date(createdAt).getTime()) / (1000 * 60 * 60) >= 24
        : false;

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

    const handleSave = async () => {
        setSaving(true);
        if (onEdit) {
            await onEdit(id, { title: editTitle, description: editDesc });
        }
        setSaving(false);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(title);
        setEditDesc(description);
        setEditing(false);
    };

    return (
        <Box
            bg={isFailed ? "rgba(239, 68, 68, 0.06)" : "whiteAlpha.50"}
            border="1px solid"
            borderColor={isFailed ? "red.800" : "whiteAlpha.100"}
            borderRadius={{ base: "xl", md: "2xl" }}
            p={{ base: 4, md: 6 }}
            transition="0.2s ease"
            mb={4}
            opacity={isFailed ? 0.75 : 1}
        >
            <Flex
                justify="space-between"
                align={{ base: "stretch", md: "start" }}
                gap={4}
                direction={{ base: "column", md: "row" }}
            >
                {}
                <VStack align="start" spacing={3} flex={1}>
                    <HStack spacing={3} w="full">
                        {editing ? (
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                color="white"
                                bg="whiteAlpha.100"
                                border="none"
                                _focus={{ ring: 2, ringColor: "purple.400" }}
                            />
                        ) : (
                            <Text
                                fontSize={{ base: "md", md: "xl" }}
                                fontWeight="bold"
                                color="white"
                                textDecoration={completed ? "line-through" : isFailed ? "line-through" : "none"}
                                opacity={completed ? 0.6 : isFailed ? 0.5 : 1}
                            >
                                {title}
                            </Text>
                        )}

                        {!editing && (
                            <Badge
                                colorScheme={completed ? "green" : isFailed ? "red" : "purple"}
                                borderRadius="full"
                                px={3}
                                py={1}
                                textTransform="uppercase"
                                fontSize="0.7rem"
                                letterSpacing="0.08em"
                            >
                                {completed ? "Completed" : isFailed ? "Failed" : "Pending"}
                            </Badge>
                        )}
                    </HStack>

                    {editing ? (
                        <Textarea
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            color="white"
                            bg="whiteAlpha.100"
                            border="none"
                            _focus={{ ring: 2, ringColor: "purple.400" }}
                            resize="vertical"
                        />
                    ) : (
                        <Text
                            color="whiteAlpha.700"
                            fontSize="sm"
                            lineHeight="tall"
                        >
                            {description}
                        </Text>
                    )}

                    {isFailed && (
                        <HStack spacing={2} mt={1}>
                            <FiAlertTriangle color="#ef4444" size={14} />
                            <Text color="red.400" fontSize="xs" fontWeight="600" letterSpacing="0.05em">
                                Expired — 24h deadline passed without completion
                            </Text>
                        </HStack>
                    )}
                </VStack>

                {}
                <HStack spacing={{ base: 2, md: 3 }} flexWrap="wrap">
                    {editing ? (
                        <>
                            <Button
                                leftIcon={<FiSave />}
                                onClick={handleSave}
                                bg="purple.500"
                                color="white"
                                borderRadius="xl"
                                _hover={{ bg: "purple.400" }}
                            >
                                {saving ? <Spinner size="sm" thickness="4px" color="black" /> : "Save"}
                            </Button>
                            <Button
                                leftIcon={<FiX />}
                                onClick={handleCancel}
                                bg="gray.600"
                                color="white"
                                borderRadius="xl"
                                _hover={{ bg: "gray.500" }}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                leftIcon={<FiEdit2 />}
                                onClick={() => setEditing(true)}
                                bg="blue.500"
                                color="white"
                                borderRadius="xl"
                                size={{ base: "sm", md: "md" }}
                                _hover={{ bg: "blue.400" }}
                                isDisabled={isFailed}
                                opacity={isFailed ? 0.4 : 1}
                                cursor={isFailed ? "not-allowed" : "pointer"}
                            >
                                Edit
                            </Button>
                            <Button
                                leftIcon={
                                    completed ? <FiCircle /> : <FiCheckCircle />
                                }
                                onClick={() => handleToggle(id)}
                                bg={completed ? "orange.400" : "green.400"}
                                color="white"
                                borderRadius="xl"
                                size={{ base: "sm", md: "md" }}
                                _hover={{
                                    opacity: 0.9,
                                }}
                                isDisabled={isFailed}
                                opacity={isFailed ? 0.4 : 1}
                                cursor={isFailed ? "not-allowed" : "pointer"}
                            >
                                {toggling ? <Spinner size="sm" thickness="4px" color="black" /> : completed ? "Undo" : "Done"}
                            </Button>
                            <Button
                                leftIcon={<FiTrash2 />}
                                onClick={() => handleDelete(id)}
                                bg="red.500"
                                color="white"
                                borderRadius="xl"
                                size={{ base: "sm", md: "md" }}
                                _hover={{
                                    bg: "red.400",
                                }}
                                isDisabled={isFailed}
                                opacity={isFailed ? 0.4 : 1}
                                cursor={isFailed ? "not-allowed" : "pointer"}
                            >
                                {deleting ? <Spinner size="sm" thickness="4px" color="black" /> : "Delete"}
                            </Button>
                        </>
                    )}
                </HStack>
            </Flex>
        </Box>
    );
};

export default Task;