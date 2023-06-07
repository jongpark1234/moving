import { useCallback, useState } from 'react'

const useSkill: () => [number, number, (x: number, y: number) => void] = () => {
    const [WIDTH] = useState(10);
    const [HEIGHT] = useState(10);
    const [MOVEMENT] = useState(10);

    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)

    const posLimit = useCallback((pos: number, limit: number) => {
        return Math.min(Math.max(pos, 0), limit)
    }, [])

    const move = useCallback((dx: number, dy: number) => {
        setXPos((prev) => posLimit(prev + dx * MOVEMENT, window.innerWidth - WIDTH))
        setYPos((prev) => posLimit(prev + dy * MOVEMENT, window.innerHeight - HEIGHT))
    }, [MOVEMENT, WIDTH, HEIGHT, posLimit])

    return [xPos, yPos, move]
}

export default useSkill