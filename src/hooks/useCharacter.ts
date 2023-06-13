import { useCallback, useState } from 'react'

import PositionStateTypes from '../interfaces/positionStateTypes'
import CharacterFacingStateTypes from '../interfaces/character/characterFacingStateTypes'
import MoveDirStateTypes from '../interfaces/character/moveDirStateTypes'
import MoveKeyStateTypes from '../interfaces/character/moveKeyStateTypes'
import CharacterTypes from '../interfaces/character/characterTypes'
import SkillInfoStateTypes from '../interfaces/skill/skillInfoStateTypes'
import { skills } from '../skills'
import SkillSetListTypes from '../interfaces/skill/skillSetListTypes'

export const useCharacter: () => CharacterTypes = () => {
    const [WIDTH] = useState<number>(145);
    const [HEIGHT] = useState<number>(190);
    const [MOVEMENT] = useState<number>(10);
    const [skillList] = useState<SkillSetListTypes>({
        q: skills.divide1, w: skills.impenetrableSkin,
        e: skills.divide3, r: skills.ruin
    })

    const [pos, setPos] = useState<PositionStateTypes>({
        xState: 0, yState: 0
    })
    const [facing, setFacing] = useState<CharacterFacingStateTypes>({
        xState: 1, yState: 0
    })
    const [dir, setDir] = useState<MoveDirStateTypes>({
        xState: 0, yState: 0
    })
    
    const move = useCallback((dirState: MoveDirStateTypes): void => {
        const posLimit = (pos: number, limit: number) => {
            return Math.min(Math.max(pos, 0), limit) // 위치는 0 보다 작아질 수 없으며, 화면의 크기보다 커질 수 없다.
        }
        const { xState, yState } = dirState
        setPos(prev => ({
            xState: posLimit(prev.xState + xState * MOVEMENT, window.innerWidth - WIDTH),
            yState: posLimit(prev.yState + yState * MOVEMENT, window.innerHeight - HEIGHT),
        }))
    }, [MOVEMENT, WIDTH, HEIGHT])

    const direct = useCallback((prevKeyState: MoveKeyStateTypes, curKeyState: MoveKeyStateTypes) => {
        const calcDir = (lo: keyof MoveKeyStateTypes, hi: keyof MoveKeyStateTypes, temp: number) => {
            if (curKeyState[lo] && curKeyState[hi]) { // 좌우 또는 상하가 동시에 입력된 경우
                // 이전 tick에서도 동시입력이었으면 현재 방향 유지,
                // 아닐 경우 반대 방향으로 turn
                return temp * (!(prevKeyState[lo] && prevKeyState[hi]) ? -1 : 1)
            } else if (curKeyState[lo]) { // 해당 축 방향 감소
                return -1
            } else if (curKeyState[hi]) { // 해당 축 방향 증가
                return 1
            } else { // 현상 유지
                return 0
            }
        }
        setDir(prev => ({ 
            xState: calcDir('ArrowLeft', 'ArrowRight', prev.xState),
            yState: calcDir('ArrowDown', 'ArrowUp', prev.yState),
        } as MoveDirStateTypes))
    }, [setDir])
    
    const face = useCallback((dirState: MoveDirStateTypes) => {
        if (dirState.xState) { // xState에 값이 들어와있을 경우에만 변경 ( 움직이지 않고있을 때는 변경하지 않음 )
            setFacing((prev) => ({
                xState: dirState.xState, yState: prev.yState
            }))
        }
    }, [setFacing])

    return {
        width: WIDTH,
        height: HEIGHT,
        movement: MOVEMENT,
        skillList: skillList,
        pos: pos,
        dir: dir,
        facing: facing,
        move: move,
        direct: direct,
        face: face
    } as CharacterTypes
}