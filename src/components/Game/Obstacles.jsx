import { useBox } from '@react-three/cannon'

function Tree({ position }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: [1, 4, 1],
  }))

  return (
    <group ref={ref}>
      {/* Trunk */}
      <mesh castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2]} />
        <meshStandardMaterial color="#4d2926" roughness={0.8} />
      </mesh>
      {/* Leaves */}
      <mesh castShadow position={[0, 2.5, 0]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Wall({ position, size, color = '#666' }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: size,
  }))

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
    </mesh>
  )
}

export function Obstacles() {
  return (
    <group>
      {/* Walls */}
      <Wall position={[-10, 2.5, 0]} size={[1, 5, 20]} color="#8b4513" />
      <Wall position={[10, 2.5, 0]} size={[1, 5, 20]} color="#8b4513" />
      <Wall position={[0, 2.5, 10]} size={[20, 5, 1]} color="#8b4513" />
      <Wall position={[0, 2.5, -10]} size={[20, 5, 1]} color="#8b4513" />
      
      {/* Trees */}
      <Tree position={[-3, 0, -3]} />
      <Tree position={[4, 0, 2]} />
      <Tree position={[0, 0, 5]} />
      <Tree position={[-5, 0, 5]} />
      <Tree position={[5, 0, -5]} />
      <Tree position={[-2, 0, 7]} />
      <Tree position={[3, 0, -7]} />
    </group>
  )
}
