import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles, Trail } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────────────
   Global scroll tracker (outside React — zero lag)
────────────────────────────────────────────────────── */
const scrollData = { progress: 0, velocity: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const max = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const next = window.scrollY / max
    scrollData.velocity = (next - scrollData.progress) * 10
    scrollData.progress = Math.min(Math.max(next, 0), 1)
  }, { passive: true })
}

const lerp = (a, b, t) => a + (b - a) * t

/* ──────────────────────────────────────────────────────
   8 Module-Mapped Silambam Poses for the Tamil King
   [staffRotZ, staffRotX, kingRotY, camZ, kingScale, kingX, kingY, staffY]
────────────────────────────────────────────────────── */
const MODULE_POSES = [
  /* 1. Hero (0%): Sovereign Ready Stance */          [0,              0,             0,     5.8, 1.0,  1.7, -0.4, 1.35],
  /* 2. About (14%): Mel Kambu (High Strike) */       [Math.PI / 3.2, -Math.PI / 5,   0.28,  5.0, 1.08, 1.5, -0.3, 1.45],
  /* 3. Training (28%): Guard Stance (Horizontal) */  [Math.PI / 2,    Math.PI / 8,  -0.32,  4.5, 1.15, 1.3, -0.2, 1.30],
  /* 4. Weapons (42%): Keezh Kambu (Low Sweep) */     [-Math.PI / 3.8, Math.PI / 5,   0.42,  4.0, 1.22, 1.1, -0.5, 1.10],
  /* 5. Masters (57%): Vel Stance (Power Thrust) */   [-Math.PI / 2.4,-Math.PI / 7,   0.12,  3.6, 1.30, 0.8, -0.2, 1.40],
  /* 6. Events (71%): Surul Strike (Whirlwind) */     [Math.PI / 1.7,  Math.PI / 3.5,-0.38,  3.3, 1.36, 0.6, -0.1, 1.50],
  /* 7. Women (85%): Radiant Protection Stance */     [Math.PI / 5.5, -Math.PI / 4,   0.22,  3.0, 1.40, 0.4,  0.0, 1.60],
  /* 8. Join/Footer (100%): Sovereign Victory */      [0,             -Math.PI / 10,  0,     2.7, 1.45, 0.0,  0.1, 1.80],
]

/* ──────────────────────────────────────────────────────
   Exact Reference Tamil King (Red Turban, Bare Chest, Red/White Veshti)
────────────────────────────────────────────────────── */
function TamilKingExactRef() {
  const { camera } = useThree()
  const kingRef   = useRef()
  const staffRef  = useRef()
  const current   = useRef([...MODULE_POSES[0]])
  const spinAngle = useRef(0)

  useFrame(({ clock }) => {
    const t  = clock.getElapsedTime()
    const sp = scrollData.progress

    // Smooth interpolation across 8 module poses
    const stepCount = MODULE_POSES.length - 1
    const rawStep   = sp * stepCount
    const i0        = Math.min(Math.floor(rawStep), stepCount)
    const i1        = Math.min(i0 + 1, stepCount)
    const frac      = rawStep - i0
    const target    = MODULE_POSES[i0].map((v, idx) => lerp(v, MODULE_POSES[i1][idx], frac))

    // Smooth lerp pose transition
    current.current = current.current.map((v, idx) => lerp(v, target[idx], 0.045))
    const [srZ, srX, brY, camZ, bScale, bX, bY, stY] = current.current

    // Staff motion
    spinAngle.current += 0.015 + Math.abs(scrollData.velocity) * 0.06
    if (staffRef.current) {
      staffRef.current.rotation.z = srZ + Math.sin(t * 0.8) * 0.04
      staffRef.current.rotation.x = srX + Math.cos(t * 0.6) * 0.03
      staffRef.current.rotation.y = spinAngle.current
      staffRef.current.position.y = stY + Math.sin(t * 0.9) * 0.03
    }

    // King body motion
    if (kingRef.current) {
      kingRef.current.rotation.y  = brY + Math.sin(t * 0.28) * 0.06
      kingRef.current.position.y  = lerp(kingRef.current.position.y, bY + Math.sin(t * 0.6) * 0.04, 0.05)
      kingRef.current.position.x  = lerp(kingRef.current.position.x, bX, 0.045)
      kingRef.current.scale.setScalar(lerp(kingRef.current.scale.x, bScale, 0.045))
    }

    // Camera zoom-in
    camera.position.z = lerp(camera.position.z, camZ, 0.04)
    camera.position.y = lerp(camera.position.y, sp * 0.35, 0.035)
  })

  /* Exact Color Palette matching User Reference Image */
  const skinMat = {
    color: '#A06D46',
    roughness: 0.65,
    metalness: 0.05,
    clearcoat: 0.1,
  }
  const redTurban = {
    color: '#C02626',
    roughness: 0.75,
    metalness: 0.05,
  }
  const goldTrim = {
    color: '#E5B826',
    metalness: 0.95,
    roughness: 0.1,
    emissive: '#B8860B',
    emissiveIntensity: 0.3,
  }
  const whiteVeshti = {
    color: '#EAEAEA',
    roughness: 0.8,
    metalness: 0.02,
  }
  const redSash = {
    color: '#C02626',
    roughness: 0.7,
    metalness: 0.05,
  }
  const redShoes = {
    color: '#A01D1D',
    roughness: 0.5,
    metalness: 0.2,
  }
  const staffWood = {
    color: '#D4A017',
    metalness: 0.8,
    roughness: 0.2,
    emissive: '#B8860B',
    emissiveIntensity: 0.3,
  }

  const M = (props) => <meshStandardMaterial {...props} />

  return (
    <group ref={kingRef} position={[1.7, -0.4, 0]}>

      {/* ════════════════════════════════════════════════
         1. HEAD, FACE & RED ROYAL TURBAN (Matches Reference Image)
      ════════════════════════════════════════════════ */}
      <group position={[0, 2.35, 0]}>
        {/* Cranium / Head */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.21, 32, 32]} />
          <M {...skinMat} />
        </mesh>
        {/* Jaw & Chin */}
        <mesh position={[0, -0.11, 0.04]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.1, 0.2, 16]} />
          <M {...skinMat} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, -0.04, 0.21]} rotation={[-0.15, 0, 0]}>
          <coneGeometry args={[0.03, 0.11, 8]} />
          <M {...skinMat} />
        </mesh>
        {/* Classic Tamil Curled Mustache */}
        <mesh position={[0, -0.11, 0.20]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.02, 0.04, 16]} rotation={[0, 0, Math.PI / 2]} />
          <M color="#1A0D00" roughness={0.9} />
        </mesh>

        {/* ── RED TURBAN WITH GOLD TRIM (Reference Image) ── */}
        {/* Turban Main Wrap */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.235, 24, 24]} />
          <M {...redTurban} />
        </mesh>
        {/* Turban Front Fold Ring */}
        <mesh position={[0, 0.08, 0.04]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.22, 0.05, 12, 24]} />
          <M {...redTurban} />
        </mesh>
        {/* Turban Gold Front Border Trim */}
        <mesh position={[0, 0.06, 0.16]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.18, 0.015, 8, 24]} />
          <M {...goldTrim} />
        </mesh>
        {/* Turban Top Crest Node */}
        <mesh position={[0, 0.32, 0]}>
          <coneGeometry args={[0.08, 0.14, 16]} />
          <M {...redTurban} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.03, 10, 10]} />
          <M {...goldTrim} />
        </mesh>
      </group>

      {/* ════════════════════════════════════════════════
         2. BARE MUSCULAR CHEST & GOLD CHAINS (Reference Image)
      ════════════════════════════════════════════════ */}
      {/* Neck */}
      <mesh position={[0, 2.02, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.2, 16]} />
        <M {...skinMat} />
      </mesh>

      {/* Gold Chain Necklace (Aaram) */}
      <mesh position={[0, 1.94, 0.03]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.14, 0.016, 10, 24]} />
        <M {...goldTrim} />
      </mesh>
      <mesh position={[0, 1.84, 0.06]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[0.17, 0.014, 10, 24]} />
        <M {...goldTrim} />
      </mesh>

      {/* Bare Chest Pectorals */}
      <group position={[0, 1.55, 0]}>
        <mesh position={[0.12, 0.08, 0.06]}>
          <sphereGeometry args={[0.155, 20, 20]} />
          <M {...skinMat} />
        </mesh>
        <mesh position={[-0.12, 0.08, 0.06]}>
          <sphereGeometry args={[0.155, 20, 20]} />
          <M {...skinMat} />
        </mesh>
        {/* Muscular Abdominals */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.23, 0.20, 0.42, 20]} />
          <M {...skinMat} />
        </mesh>
      </group>

      {/* ════════════════════════════════════════════════
         3. BICEPS WITH GOLD VANKI ARMLETS (Reference Image)
      ════════════════════════════════════════════════ */}
      {/* Right Arm */}
      <group position={[0.31, 1.56, 0]} rotation={[0, 0, -Math.PI / 4.5]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.065, 0.38, 12, 20]} />
          <M {...skinMat} />
        </mesh>
        {/* Gold Bicep Armlet (Vanki) */}
        <mesh position={[0, -0.14, 0]}>
          <torusGeometry args={[0.072, 0.018, 10, 20]} />
          <M {...goldTrim} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.14, -0.66, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.054, 0.36, 12, 20]} />
          <M {...skinMat} />
        </mesh>
        {/* Gold Wrist Cuff */}
        <mesh position={[0.26, -0.86, 0]}>
          <torusGeometry args={[0.07, 0.018, 10, 20]} />
          <M {...goldTrim} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group position={[-0.31, 1.52, 0]} rotation={[0, 0, Math.PI / 3.2]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.065, 0.38, 12, 20]} />
          <M {...skinMat} />
        </mesh>
        {/* Gold Bicep Armlet (Vanki) */}
        <mesh position={[0, -0.14, 0]}>
          <torusGeometry args={[0.072, 0.018, 10, 20]} />
          <M {...goldTrim} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.15, -0.64, 0]} rotation={[0, 0, 0.6]}>
          <capsuleGeometry args={[0.054, 0.36, 12, 20]} />
          <M {...skinMat} />
        </mesh>
        <mesh position={[-0.32, -0.82, 0]}>
          <torusGeometry args={[0.07, 0.018, 10, 20]} />
          <M {...goldTrim} />
        </mesh>
      </group>

      {/* ════════════════════════════════════════════════
         4. DUAL-COLOR WHITE & RED/GOLD VESHTI (Reference Image)
      ════════════════════════════════════════════════ */}
      {/* Red Tied Waistband & Sash */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
        <M {...redSash} />
      </mesh>
      {/* Gold Border on Waistband */}
      <mesh position={[0, 1.20, 0]}>
        <torusGeometry args={[0.242, 0.015, 8, 24]} />
        <M {...goldTrim} />
      </mesh>
      {/* Front Tied Knot & Draped Sash (Reference Image) */}
      <mesh position={[0, 0.98, 0.22]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.45, 12]} />
        <M {...redSash} />
      </mesh>

      {/* White Silk Dhoti Upper Skirt */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.22, 0.32, 0.4, 20]} />
        <M {...whiteVeshti} />
      </mesh>

      {/* Right Leg (White Veshti + Red Trim) */}
      <group position={[0.18, 0.72, 0]} rotation={[0, 0, 0.12]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.105, 0.58, 12, 20]} />
          <M {...whiteVeshti} />
        </mesh>
        <mesh position={[0.11, -1.02, 0]} rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.08, 0.52, 12, 20]} />
          <M {...skinMat} />
        </mesh>
        {/* Red Royal Shoes (Reference Image) */}
        <mesh position={[0.19, -1.34, 0.04]}>
          <boxGeometry args={[0.1, 0.08, 0.2]} />
          <M {...redShoes} />
        </mesh>
      </group>

      {/* Left Leg (White Veshti + Red Trim) */}
      <group position={[-0.18, 0.72, 0]} rotation={[0, 0, -0.12]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.105, 0.58, 12, 20]} />
          <M {...whiteVeshti} />
        </mesh>
        <mesh position={[-0.11, -1.0, 0]} rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.08, 0.52, 12, 20]} />
          <M {...skinMat} />
        </mesh>
        {/* Red Royal Shoes */}
        <mesh position={[-0.19, -1.32, 0.04]}>
          <boxGeometry args={[0.1, 0.08, 0.2]} />
          <M {...redShoes} />
        </mesh>
      </group>

      {/* ════════════════════════════════════════════════
         5. SILAMBAM STICK WITH GOLDEN ENERGY TRAIL
      ════════════════════════════════════════════════ */}
      <group ref={staffRef} position={[0, 1.35, 0]}>
        <Trail
          width={0.18}
          length={12}
          color={new THREE.Color('#FFD700')}
          attenuation={(t) => t * t}
        >
          <group>
            {/* Long Golden Silambam Shaft */}
            <mesh>
              <cylinderGeometry args={[0.042, 0.042, 5.4, 16]} />
              <M {...staffWood} />
            </mesh>

            {/* Top Gold Tip */}
            <mesh position={[0, 2.75, 0]}>
              <cylinderGeometry args={[0.08, 0.045, 0.28, 16]} />
              <M {...goldTrim} />
            </mesh>
            <mesh position={[0, 3.0, 0]}>
              <coneGeometry args={[0.055, 0.28, 16]} />
              <M {...goldTrim} />
            </mesh>

            {/* Bottom Gold Tip */}
            <mesh position={[0, -2.75, 0]}>
              <cylinderGeometry args={[0.045, 0.08, 0.28, 16]} />
              <M {...goldTrim} />
            </mesh>
            <mesh position={[0, -3.0, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.055, 0.28, 16]} />
              <M {...goldTrim} />
            </mesh>
          </group>
        </Trail>

        {/* Glowing Tip Lights */}
        <pointLight position={[0, 3.1, 0]}  color="#FFD700" intensity={5.5} distance={6} decay={2} />
        <pointLight position={[0, -3.1, 0]} color="#E5B826" intensity={4.0} distance={5} decay={2} />
      </group>

      {/* Character Ambient Lighting Aura */}
      <pointLight position={[0, 1.5, 0]}  color="#C02626" intensity={2.5} distance={6} decay={2} />
      <pointLight position={[0, -0.4, 0]} color="#E5B826" intensity={1.5} distance={5} decay={2} />
    </group>
  )
}

/* ──────────────────────────────────────────────────────
   Fixed Canvas Component
────────────────────────────────────────────────────── */
export default function GlobalWarriorBg() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lighting matching user's image mood */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFF5D6" />
        <pointLight position={[-6, 6, -3]} color="#C02626" intensity={3.0} distance={22} decay={2} />
        <pointLight position={[4, -2, 4]}  color="#E5B826" intensity={2.5} distance={18} decay={2} />

        {/* Stars */}
        <Stars radius={100} depth={60} count={700} factor={2} saturation={0} fade speed={0.3} />

        {/* Energy Sparkles */}
        <Sparkles count={55} scale={12} size={2.5} speed={0.3} color="#FFD700" opacity={0.35} />

        {/* Exact Tamil King Character */}
        <TamilKingExactRef />
      </Canvas>
    </div>
  )
}
