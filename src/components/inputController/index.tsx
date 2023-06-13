import { useLayoutEffect } from 'react'

import MoveKeyStateTypes from '../../interfaces/character/moveKeyStateTypes'
import SkillKeyStateTypes from '../../interfaces/skill/skillKeyStateTypes'

export const moveKeyState: MoveKeyStateTypes = {
    ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
}
export const skillKeyState: SkillKeyStateTypes = {
    q: 0, w: 0, e: 0, r: 0
}

export const InputController = (
) => {

    useLayoutEffect(() => {
        const handleKeyState = (key: KeyboardEvent, isDown: number): void => {
            const getKey: string = key.key
            if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(getKey)) {
                moveKeyState[getKey as keyof MoveKeyStateTypes] = isDown
            } else if (['q', 'w', 'e', 'r'].includes(getKey)) {
                skillKeyState[getKey as keyof SkillKeyStateTypes] = isDown
            }
        }
        const onKeyDown = (key: KeyboardEvent): void => {
            handleKeyState(key, 1)
        }
        const onKeyUp = (key: KeyboardEvent): void => {
            handleKeyState(key, 0)
        }

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    })

    return (
        <></>
    )
}
