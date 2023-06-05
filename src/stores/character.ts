import { useCallback, useState } from 'react'

const useCharacter: () => [number, number, (x: number, y: number) => void] = () => {
    const WIDTH = 10
    const HEIGHT = 10
    const MOVEMENT = 10
  
    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)
  
    const posLimit = useCallback((pos: number, limit: number) => {
      return Math.min(Math.max(pos, 0), limit)
    }, [])

    const move = useCallback((dx: number, dy: number) => {
        setXPos(posLimit(xPos + dx * MOVEMENT, window.innerWidth - WIDTH))
        setYPos(posLimit(yPos + dy * MOVEMENT, window.innerHeight - HEIGHT))
    }, [xPos, yPos])
  
    return [xPos, yPos, move]
}

export default useCharacter