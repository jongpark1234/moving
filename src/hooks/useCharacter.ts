import { useCallback, useState } from 'react'
import { moveDirState } from '../components/inputController'

const useCharacter: () => [
    number, number, number, (dir: number[]) => void
] = () => {
    const [WIDTH] = useState<number>(145);
    const [HEIGHT] = useState<number>(190);
    const [MOVEMENT] = useState<number>(10);
    // const [HP] = useState<number>(100)
    // const [MP] = useState<number>(100)

    const [xPos, setXPos] = useState<number>(0)
    const [yPos, setYPos] = useState<number>(0)
    const [facing, setFacing] = useState<number>(1)

    const posLimit = useCallback((pos: number, limit: number) => {
        return Math.min(Math.max(pos, 0), limit)
    }, [])
    
    const move = useCallback((dir: number[]) => {
        const [dx, dy] = dir
        setXPos((prev) => posLimit(prev + dx * MOVEMENT, window.innerWidth - WIDTH))
        setYPos((prev) => posLimit(prev + dy * MOVEMENT, window.innerHeight - HEIGHT))
        setFacing((prev) => dx === 0 ? prev : dx)
    }, [MOVEMENT, WIDTH, HEIGHT, posLimit])

    return [xPos, yPos, facing, move]
}

export default useCharacter