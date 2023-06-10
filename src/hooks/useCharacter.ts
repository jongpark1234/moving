import { useCallback, useState } from 'react'

import CharacterPositionStateTypes from '../interfaces/characterPositionStateTypes'
import CharacterFacingStateTypes from '../interfaces/characterFacingStateTypes'
import MoveDirStateTypes from '../interfaces/moveDirStateTypes'
import MoveKeyStateTypes from '../interfaces/moveKeyStateTypes'

export const useCharacter: () => [
    CharacterPositionStateTypes, // pos
    MoveDirStateTypes, // dir
    CharacterFacingStateTypes, // facing
    (dir: MoveDirStateTypes) => void, // move
    (prevState: MoveKeyStateTypes, curState: MoveKeyStateTypes) => void, // direct
    (dir: MoveDirStateTypes) => void, // face
] = () => {
    const [WIDTH] = useState<number>(145);
    const [HEIGHT] = useState<number>(190);
    const [MOVEMENT] = useState<number>(10);

    const [pos, setPos] = useState<CharacterPositionStateTypes>({
        xState: 0, yState: 0
    })
    const [facing, setFacing] = useState<CharacterFacingStateTypes>({
        xState: 1, yState: 0
    })
    const [dir, setDir] = useState<MoveDirStateTypes>({
        xState: 0, yState: 0
    })
    
    const posLimit = useCallback((pos: number, limit: number) => {
        return Math.min(Math.max(pos, 0), limit)
    }, [])

    const move = useCallback((dir: MoveDirStateTypes): void => {
        const { xState, yState } = dir
        setPos(prev => ({
            xState: posLimit(prev.xState + xState * MOVEMENT, window.innerWidth - WIDTH),
            yState: posLimit(prev.yState + yState * MOVEMENT, window.innerHeight - HEIGHT),
        }))
    }, [MOVEMENT, WIDTH, HEIGHT, posLimit])

    const direct = useCallback((prevState: MoveKeyStateTypes, curState: MoveKeyStateTypes) => {
        const x = (curState.ArrowLeft + curState.ArrowRight === 2) && (prevState.ArrowLeft + prevState.ArrowRight < 2) ?
        -dir.xState : curState.ArrowLeft ? -1 : curState.ArrowRight ? 1 : 0
        const y = (curState.ArrowDown + curState.ArrowUp === 2) && (prevState.ArrowDown + prevState.ArrowUp < 2) ? 
        -dir.yState : curState.ArrowDown ? -1 : curState.ArrowUp ? 1 : 0
        setDir(() => ({
            xState: x, yState: y
        } as MoveDirStateTypes))
    }, [dir, setDir])
    
    const face = useCallback((dir: MoveDirStateTypes) => {
        if (dir.xState) { // xState에 값이 들어와있을 경우에만 변경 ( 움직이지 않고있을 때는 변경하지 않음 )
            setFacing((prev) => ({
                xState: dir.xState, yState: prev.yState
            }))
        }
    }, [setFacing])

    return [pos, dir, facing, move, direct, face]
}