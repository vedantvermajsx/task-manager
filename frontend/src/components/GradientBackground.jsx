import { Box } from '@chakra-ui/react';

export default function GradientBackground() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundImage={'https://res.cloudinary.com/druwykigf/image/upload/v1780377969/profile/b4tpxrncpdd0m3xoh3am.avif'}

      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      filter="blur(0px) brightness(0.7)"
      boxShadow="0 0 30px rgba(0,0,0,0.35)"
      zIndex={-1}

    />
  )
}