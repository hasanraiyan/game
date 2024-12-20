import { useState, useEffect } from 'react'
import { KeyboardControls } from '@react-three/drei'
import { Game } from './components/Game'
import { keyboardMap } from './components/Game/controls'

function App() {
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const handlePointerLockChange = () => {
      setShowControls(!document.pointerLockElement)
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
    }
  }, [])

  const handleClick = (e) => {
    if (!document.pointerLockElement) {
      e.currentTarget.requestPointerLock()
    }
  }

  return (
    <KeyboardControls map={keyboardMap}>
      <div 
        className="w-screen h-screen relative bg-black cursor-pointer select-none touch-none overflow-hidden"
        onClick={handleClick}
      >
        <Game />
        {showControls && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white p-6 rounded-lg text-center pointer-events-none transition-all duration-300 z-10">
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Controls</h2>
            <p className="text-lg mb-2">W, A, S, D - Move</p>
            <p className="text-lg mb-2">SPACE - Jump</p>
            <p className="text-lg mb-2">MOUSE - Look around</p>
            <p className="text-lg mb-2">Click to start</p>
            <p className="text-lg">ESC - Pause</p>
          </div>
        )}
      </div>
    </KeyboardControls>
  )
}

export default App
