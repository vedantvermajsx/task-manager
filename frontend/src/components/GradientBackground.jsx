import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { isDesktop } from 'react-device-detect';
import { Box } from '@chakra-ui/react';

export default function GradientBackground({ showGradient }) {
  if (isDesktop && showGradient) {
    return (
      <div className="fixed inset-0 -z-10 bg-[#212121]">
        <ShaderGradientCanvas
          style={{
            width: '100%',
            height: '100%',
          }}
          lazyLoad={undefined}
          fov={undefined}
          pixelDensity={1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="plane"
            wireframe={false}
            shader="defaults"
            uTime={10}
            uSpeed={0.3}
            uStrength={1.5}
            uDensity={1.5}
            uFrequency={0}
            uAmplitude={0}
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            color1="#242880"
            color2="#8d7dca"
            color3="#212121"
            reflection={0.1}

            cAzimuthAngle={180}
            cPolarAngle={80}
            cDistance={2.8}
            cameraZoom={2.1}

            lightType="3d"
            brightness={1}
            envPreset="city"
            grain="on"

            toggleAxis={false}
            zoomOut={false}
            hoverState=""

            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>
    )
  } else {
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
        filter="blur(5px) brightness(0.3)"
        boxShadow="0 0 30px rgba(0,0,0,0.35)"
        zIndex={-1}

      />
    )
  }
}

