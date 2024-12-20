import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { useKeyboardControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { Controls } from './controls'

const SPEED = 5
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

export function Player() {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 2, 0],
    fixedRotation: true,
    linearDamping: 0.95
  }))

  const [, get] = useKeyboardControls()
  const velocity = useRef([0, 0, 0])
  const position = useRef([0, 0, 0])

  useFrame(() => {
    const { forward, back, left, right, jump } = get()
    
    // Update movement direction
    frontVector.set(0, 0, Number(back) - Number(forward))
    sideVector.set(Number(right) - Number(left), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    // Apply movement
    api.velocity.set(direction.x, velocity.current[1], direction.z)

    // Handle jumping
    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2])
    }

    // Update camera position
    camera.position.set(position.current[0], position.current[1] + 1.5, position.current[2])
  })

  // Subscribe to physics updates
  api.velocity.subscribe(v => velocity.current = v)
  api.position.subscribe(p => position.current = p)

  return (
    <group ref={ref}>
      {/* Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 0.7]} />
        <meshStandardMaterial color="#ff69b4" metalness={0.2} roughness={0.5} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="#ff69b4" metalness={0.2} roughness={0.5} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}
