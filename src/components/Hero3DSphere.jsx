import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function CrystalOrb() {
  const icoRef = useRef()
  const innerRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Smooth rotation
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.25
      icoRef.current.rotation.y = t * 0.35
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5
      innerRef.current.rotation.z = t * 0.2
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.3
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.4) * 0.15
    }
  })

  return (
    <group>
      {/* Outer Wireframe Icosahedron (Cyan & Gold/Copper) */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.9, 2]} />
        <meshBasicMaterial
          color="#00F2FE"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Secondary Geometry Shell */}
      <mesh rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#FF6B35"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner Glowing Plasma Sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial
          color="#00F2FE"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Core Energy Center */}
      <mesh>
        <sphereGeometry args={[0.65, 24, 24]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Ring 1 — Neon Cyan */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.6, 0.018, 16, 100]} />
        <meshBasicMaterial color="#00F2FE" transparent opacity={0.4} />
      </mesh>

      {/* Orbiting Ring 2 — Electric Copper */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.1, 0.014, 16, 100]} />
        <meshBasicMaterial color="#FF6B35" transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Ring 3 — Outer Cyan Accent */}
      <mesh rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[3.6, 0.008, 16, 100]} />
        <meshBasicMaterial color="#4FACFE" transparent opacity={0.2} />
      </mesh>

      {/* Particle Sparkles */}
      <Sparkles count={80} scale={6} size={3} speed={0.4} color="#00F2FE" opacity={0.6} />
      <Sparkles count={50} scale={8} size={2.5} speed={0.3} color="#FF6B35" opacity={0.5} />

      {/* Lights */}
      <pointLight color="#00F2FE" intensity={4} distance={8} decay={2} />
      <pointLight position={[2, -2, 2]} color="#FF6B35" intensity={3} distance={7} decay={2} />
    </group>
  )
}

export default function Hero3DSphere() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFF5D6" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <CrystalOrb />
        </Float>
      </Canvas>
    </div>
  )
}
