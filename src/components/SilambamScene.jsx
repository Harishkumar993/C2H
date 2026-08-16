import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Trail, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────
   Silambam Staff  — long golden cylinder with
   glowing tips and trailing particles
───────────────────────────────────────────── */
function SilambamStaff() {
  const groupRef = useRef()
  const tipRef   = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Spinning combat move — diagonal twirl
    groupRef.current.rotation.z = t * 1.4
    groupRef.current.rotation.x = Math.sin(t * 0.7) * 0.4
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.15
  })

  return (
    <group ref={groupRef}>
      {/* Main shaft */}
      <Trail
        width={0.18}
        length={10}
        color={new THREE.Color('#D4A017')}
        attenuation={(t) => t * t}
      >
        <group ref={tipRef}>
          {/* Staff body */}
          <mesh>
            <cylinderGeometry args={[0.045, 0.045, 4.8, 14]} />
            <meshStandardMaterial
              color="#7A5010"
              roughness={0.25}
              metalness={0.7}
              emissive="#3A2008"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Top gold ferrule */}
          <mesh position={[0, 2.45, 0]}>
            <cylinderGeometry args={[0.09, 0.05, 0.28, 14]} />
            <meshStandardMaterial color="#D4A017" metalness={0.95} roughness={0.05} emissive="#D4A017" emissiveIntensity={0.4} />
          </mesh>
          {/* Top tip spike */}
          <mesh position={[0, 2.72, 0]}>
            <coneGeometry args={[0.055, 0.28, 14]} />
            <meshStandardMaterial color="#F0C040" metalness={1} roughness={0.02} emissive="#F0C040" emissiveIntensity={0.6} />
          </mesh>
          {/* Bottom gold ferrule */}
          <mesh position={[0, -2.45, 0]}>
            <cylinderGeometry args={[0.05, 0.09, 0.28, 14]} />
            <meshStandardMaterial color="#D4A017" metalness={0.95} roughness={0.05} emissive="#D4A017" emissiveIntensity={0.4} />
          </mesh>
          {/* Bottom tip spike */}
          <mesh position={[0, -2.72, 0]}>
            <coneGeometry args={[0.055, 0.28, 14]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#F0C040" metalness={1} roughness={0.02} emissive="#F0C040" emissiveIntensity={0.6} />
          </mesh>
          {/* Center grip band */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.062, 0.062, 0.18, 14]} />
            <meshStandardMaterial color="#D4A017" metalness={0.9} roughness={0.08} emissive="#C09010" emissiveIntensity={0.3} />
          </mesh>
        </group>
      </Trail>

      {/* Glowing tip light */}
      <pointLight position={[0, 2.8, 0]} color="#F0C040" intensity={3} distance={4} decay={2} />
      <pointLight position={[0, -2.8, 0]} color="#D4A017" intensity={2} distance={3} decay={2} />
    </group>
  )
}

/* ─────────────────────────────────────────────
   Warrior Body — geometric figure in fighting
   stance holding the silambam staff
───────────────────────────────────────────── */
function WarriorFigure() {
  const bodyRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    bodyRef.current.rotation.y = Math.sin(t * 0.3) * 0.25
    bodyRef.current.position.y = Math.sin(t * 0.6) * 0.06
  })

  const mat = (color, emissive = '#000', ei = 0) => (
    <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} emissive={emissive} emissiveIntensity={ei} />
  )

  return (
    <group ref={bodyRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        {mat('#B8936A')}
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.92, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.2, 10]} />
        {mat('#B8936A')}
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.45, 0]}>
        <boxGeometry args={[0.42, 0.7, 0.22]} />
        {mat('#1A1A2E')}
      </mesh>

      {/* Dhoti / waist */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 0.35, 12]} />
        {mat('#8B1A1A')}
      </mesh>

      {/* Right Arm — raised high (holding staff top) */}
      <group position={[0.3, 1.55, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.5, 10]} />
          {mat('#B8936A')}
        </mesh>
        {/* Forearm */}
        <mesh position={[0.14, -0.62, 0]} rotation={[0, 0, -0.6]}>
          <cylinderGeometry args={[0.052, 0.045, 0.44, 10]} />
          {mat('#B8936A')}
        </mesh>
        {/* Gold wristband */}
        <mesh position={[0.28, -0.82, 0]}>
          <torusGeometry args={[0.072, 0.018, 8, 16]} />
          <meshStandardMaterial color="#D4A017" metalness={0.95} roughness={0.05} emissive="#D4A017" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Left Arm — extended strike position */}
      <group position={[-0.3, 1.5, 0]} rotation={[0, 0, Math.PI / 3.5]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.5, 10]} />
          {mat('#B8936A')}
        </mesh>
        <mesh position={[-0.18, -0.6, 0]} rotation={[0, 0, 0.7]}>
          <cylinderGeometry args={[0.052, 0.045, 0.44, 10]} />
          {mat('#B8936A')}
        </mesh>
        <mesh position={[-0.35, -0.78, 0]}>
          <torusGeometry args={[0.072, 0.018, 8, 16]} />
          <meshStandardMaterial color="#D4A017" metalness={0.95} roughness={0.05} emissive="#D4A017" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Right Leg — forward lunging stance */}
      <group position={[0.18, 0.72, 0]} rotation={[0, 0, 0.15]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.1, 0.085, 0.75, 10]} />
          {mat('#1A1A2E')}
        </mesh>
        {/* Shin */}
        <mesh position={[0.12, -0.95, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.082, 0.07, 0.65, 10]} />
          {mat('#1A1A2E')}
        </mesh>
        {/* Ankle band */}
        <mesh position={[0.22, -1.28, 0]}>
          <torusGeometry args={[0.09, 0.018, 8, 16]} />
          <meshStandardMaterial color="#D4A017" metalness={0.95} roughness={0.05} emissive="#D4A017" emissiveIntensity={0.25} />
        </mesh>
      </group>

      {/* Left Leg — back stance */}
      <group position={[-0.18, 0.72, 0]} rotation={[0, 0, -0.15]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.1, 0.085, 0.75, 10]} />
          {mat('#1A1A2E')}
        </mesh>
        <mesh position={[-0.1, -0.93, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.082, 0.07, 0.65, 10]} />
          {mat('#1A1A2E')}
        </mesh>
        <mesh position={[-0.2, -1.26, 0]}>
          <torusGeometry args={[0.09, 0.018, 8, 16]} />
          <meshStandardMaterial color="#D4A017" metalness={0.95} roughness={0.05} emissive="#D4A017" emissiveIntensity={0.25} />
        </mesh>
      </group>

      {/* Warrior glow aura */}
      <pointLight position={[0, 1, 0]} color="#8B0000" intensity={1.5} distance={3} decay={2} />
    </group>
  )
}

/* ─────────────────────────────────────────────
   Orbit Rings — glowing rings around warrior
   (inspired by silambam circle training pattern)
───────────────────────────────────────────── */
function OrbitRings() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    r1.current.rotation.z = t * 0.35
    r1.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1
    r2.current.rotation.z = -t * 0.22
    r2.current.rotation.x = Math.PI / 3
    r3.current.rotation.y = t * 0.18
    r3.current.rotation.x = Math.PI / 4
  })

  return (
    <>
      {/* Ring 1 */}
      <mesh ref={r1}>
        <torusGeometry args={[2.8, 0.015, 8, 80]} />
        <meshBasicMaterial color="#D4A017" transparent opacity={0.25} />
      </mesh>
      {/* Ring 2 */}
      <mesh ref={r2}>
        <torusGeometry args={[3.5, 0.01, 8, 80]} />
        <meshBasicMaterial color="#8B0000" transparent opacity={0.18} />
      </mesh>
      {/* Ring 3 */}
      <mesh ref={r3}>
        <torusGeometry args={[4.2, 0.008, 8, 80]} />
        <meshBasicMaterial color="#D4A017" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

/* ─────────────────────────────────────────────
   Energy Sparks — combat strike spark effect
───────────────────────────────────────────── */
function CombatSparks() {
  return (
    <Sparkles
      count={60}
      scale={7}
      size={2.5}
      speed={0.5}
      color="#D4A017"
      opacity={0.55}
    />
  )
}

/* ─────────────────────────────────────────────
   Main Scene Export
───────────────────────────────────────────── */
export default function SilambamScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFF5D6" />
      <pointLight position={[-4, 4, -3]} color="#8B0000" intensity={2} distance={12} decay={2} />
      <pointLight position={[4, -3, 4]} color="#D4A017" intensity={1.5} distance={10} decay={2} />

      {/* Background stars */}
      <Stars radius={80} depth={60} count={1200} factor={3} saturation={0} fade speed={0.4} />

      {/* Combat spark particles */}
      <CombatSparks />

      {/* Orbit rings */}
      <OrbitRings />

      {/* Warrior holding staff */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group position={[0, 0.4, 0]}>
          <WarriorFigure />
          {/* Staff in warrior's hands — diagonal combat position */}
          <group position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 5]}>
            <SilambamStaff />
          </group>
        </group>
      </Float>
    </Canvas>
  )
}
