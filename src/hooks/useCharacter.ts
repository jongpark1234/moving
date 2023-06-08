import { useCallback, useState } from 'react'
import CharacterFacingState from '../interfaces/characterFacingState'
import MoveDirState from '../interfaces/moveDirState'

const useCharacter: () => [
    number, // xPos
    number, // yPos
    CharacterFacingState, // facing
    (dir: MoveDirState) => void, // move
    (dir: MoveDirState) => void // face
] = () => {
    const [WIDTH] = useState<number>(145);
    const [HEIGHT] = useState<number>(190);
    const [MOVEMENT] = useState<number>(10);

    const [xPos, setXPos] = useState<number>(0)
    const [yPos, setYPos] = useState<number>(0)
    const [facing, setFacing] = useState<CharacterFacingState>({
        xState: 1, yState: 0
    })

    const posLimit = useCallback((pos: number, limit: number) => {
        return Math.min(Math.max(pos, 0), limit)
    }, [])
    
    const move = useCallback((dir: MoveDirState): void => {
        const { xState, yState } = dir
        setXPos((prev) => posLimit(prev + xState * MOVEMENT, window.innerWidth - WIDTH))
        setYPos((prev) => posLimit(prev + yState * MOVEMENT, window.innerHeight - HEIGHT))
    }, [MOVEMENT, WIDTH, HEIGHT, posLimit])

    const face = useCallback((dir: MoveDirState): void => {
        if (dir.xState) { // xState에 값이 들어와있을 경우에만 변경 ( 움직이지 않고있을 떄는 변경하지 않음 )
            setFacing((prev) => <CharacterFacingState>{
                xState: dir.xState, yState: prev.yState
            })
        }
    }, [])

    return [xPos, yPos, facing, move, face]
}

export default useCharacter