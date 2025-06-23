import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Plane } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import * as THREE from 'three'

// Restaurant Table Component
const RestaurantTable = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Table Top */}
      <Box ref={meshRef} args={[2, 0.1, 1]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      {/* Table Legs */}
      {[[-0.8, 0, -0.4], [0.8, 0, -0.4], [-0.8, 0, 0.4], [0.8, 0, 0.4]].map((pos, i) => (
        <Box key={i} args={[0.1, 0.8, 0.1]} position={pos}>
          <meshStandardMaterial color="#654321" />
        </Box>
      ))}
    </group>
  )
}

// Chair Component
const Chair = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Seat */}
      <Box args={[0.5, 0.1, 0.5]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      {/* Backrest */}
      <Box args={[0.5, 0.6, 0.1]} position={[0, 0.7, -0.2]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      {/* Legs */}
      {[[-0.2, 0, -0.2], [0.2, 0, -0.2], [-0.2, 0, 0.2], [0.2, 0, 0.2]].map((pos, i) => (
        <Box key={i} args={[0.05, 0.4, 0.05]} position={pos}>
          <meshStandardMaterial color="#654321" />
        </Box>
      ))}
    </group>
  )
}

// Kitchen Counter Component
const KitchenCounter = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <Box args={[4, 1, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#C0C0C0" />
      </Box>
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="#FF6B35"
        anchorX="center"
        anchorY="middle"
      >
        MILANO KITCHEN
      </Text>
    </group>
  )
}

// Floating Food Item
const FloatingFood = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.2]} position={position}>
      <meshStandardMaterial color={color} />
    </Sphere>
  )
}

// 3D Scene Component
const RestaurantScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2C2C2C" />
      </Plane>

      {/* Restaurant Tables */}
      <RestaurantTable position={[-3, 0, -2]} />
      <RestaurantTable position={[3, 0, -2]} />
      <RestaurantTable position={[-3, 0, 2]} />
      <RestaurantTable position={[3, 0, 2]} />

      {/* Chairs */}
      <Chair position={[-3, 0, -3]} />
      <Chair position={[-3, 0, -1]} />
      <Chair position={[3, 0, -3]} />
      <Chair position={[3, 0, -1]} />
      <Chair position={[-3, 0, 1]} />
      <Chair position={[-3, 0, 3]} />
      <Chair position={[3, 0, 1]} />
      <Chair position={[3, 0, 3]} />

      {/* Kitchen Counter */}
      <KitchenCounter position={[0, 0, -6]} />

      {/* Floating Food Items */}
      <FloatingFood position={[-5, 2, 0]} color="#FF6B35" />
      <FloatingFood position={[5, 2.5, 0]} color="#FFD700" />
      <FloatingFood position={[0, 3, 3]} color="#FF4500" />
      <FloatingFood position={[-2, 2.8, -4]} color="#32CD32" />
      <FloatingFood position={[2, 2.3, -4]} color="#FF69B4" />

      {/* Milano Sign */}
      <Text
        position={[0, 4, -6]}
        fontSize={1}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlayfairDisplay-Bold.woff"
      >
        MILANO CAFE
      </Text>

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

const Virtual = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6">
            {t('virtual.title')}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('virtual.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl overflow-hidden"
          style={{ height: '70vh' }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="loading-spinner mx-auto mb-4"></div>
                <p className="text-white">3D muhit yuklanmoqda...</p>
              </div>
            </div>
          )}
          
          <Canvas
            camera={{ position: [8, 6, 8], fov: 60 }}
            onCreated={() => setIsLoading(false)}
          >
            <Suspense fallback={null}>
              <RestaurantScene />
            </Suspense>
          </Canvas>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🖱️</div>
            <h3 className="text-white font-bold mb-2">Aylanish</h3>
            <p className="text-white/70 text-sm">Sichqoncha bilan sahna atrofida aylaning</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-white font-bold mb-2">Kattalashtirish</h3>
            <p className="text-white/70 text-sm">G'ildirak bilan yaqinlashtiring yoki uzoqlashtiring</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">✋</div>
            <h3 className="text-white font-bold mb-2">Surish</h3>
            <p className="text-white/70 text-sm">O'ng tugma bilan sahna bo'ylab suring</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Virtual