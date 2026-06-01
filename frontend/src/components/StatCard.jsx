import { Box, Flex, Icon, Stat, StatNumber, Text } from "@chakra-ui/react";

function StatCard({ title, value, icon, color }) {
  return (
    <Box
      border="1px solid"
      borderColor="whiteAlpha.100"
      rounded="2xl"
      p={7}
      boxShadow="0 0 30px rgba(0,0,0,0.35)"
      transition="0.2s ease"
      _hover={{
        borderColor: "whiteAlpha.300",
      }}

      opacity="0.5"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text color="whiteAlpha.900" fontWeight="600">
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

export default StatCard;