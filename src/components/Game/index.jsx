import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky, PointerLockControls } from '@react-three/drei'
import { Player } from './Player'
import { Ground } from './Ground'
import { Obstacles } from './Obstacles'

export function Game() {
  return (
    <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000 }}>
      <Suspense fallback={null}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Physics 
          gravity={[0, -30, 0]}
          defaultContactMaterial={{
            friction: 0.1,
            restitution: 0.7
          }}
        >
          <Player />
          <Ground />
          <Obstacles />
        </Physics>
        <PointerLockControls />
      </Suspense>
    </Canvas>
  )
}
