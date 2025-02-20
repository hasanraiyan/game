import { usePlane } from '@react-three/cannon'

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
    type: 'Static',
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#3b8c3b"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}
