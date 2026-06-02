import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { isDesktop } from 'react-device-detect';

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
      <div className="fixed inset-0 -z-10 bg-[#212121]">
        <img src="https://res.cloudinary.com/druwykigf/image/upload/v1780377969/profile/b4tpxrncpdd0m3xoh3am.avif" alt="" />
      </div>
    )
  }
}

