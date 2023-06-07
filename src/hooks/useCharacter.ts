import { useCallback, useState } from 'react'

const useCharacter: () => [number, number, (dir: number[]) => void] = () => {
    const [WIDTH] = useState(145);
    const [HEIGHT] = useState(190);
    const [MOVEMENT] = useState(10);
    const [HP] = useState(100)
    const [MP] = useState(100)

    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)

    const posLimit = useCallback((pos: number, limit: number) => {
        return Math.min(Math.max(pos, 0), limit)
    }, [])

    const move = useCallback((dir: number[]) => {
        const [dx, dy] = dir
        setXPos((prev) => posLimit(prev + dx * MOVEMENT, window.innerWidth - WIDTH))
        setYPos((prev) => posLimit(prev + dy * MOVEMENT, window.innerHeight - HEIGHT))
    }, [MOVEMENT, WIDTH, HEIGHT, posLimit])

    return [xPos, yPos, move]
}

export default useCharacter