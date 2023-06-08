import { useEffect, useState } from 'react'

import SkillState from '../interfaces/skillState'
import MoveKeyState from '../interfaces/moveKeyState'
import MoveDirState from '../interfaces/moveDirState'
import CharacterPositionState from '../interfaces/characterPositionState'

import divide1 from '../images/skills/divide1.gif'
import divide2 from '../images/skills/divide2.gif'
import divide3 from '../images/skills/divide3.gif'
import ruin from '../images/skills/ruin.gif'

import * as style from './main/index.style'
import CharacterFacingState from '../interfaces/characterFacingState'
import useCharacter from '../hooks/useCharacter'
import { useAnimate } from '../hooks/useAnimate'

export const moveKeyState: MoveKeyState = {
    ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
}

export const moveDirState: MoveDirState = {
    xState: 0, yState: 0
}

export const characterFacingState: CharacterFacingState = {
    xState: 1, yState: 0
}

const moveDirHandler = (curState: MoveKeyState): void => {
    // Handle x state
    if (moveKeyState.ArrowLeft && moveKeyState.ArrowRight) {
        if (!(curState.ArrowLeft && curState.ArrowRight)) {
            moveDirState.xState *= -1
        }
    } else if (moveKeyState.ArrowLeft) {
        moveDirState.xState = -1
    } else if (moveKeyState.ArrowRight) {
        moveDirState.xState = 1
    } else {
        moveDirState.xState = 0
    }
    // Handle y state
    if (moveKeyState.ArrowDown && moveKeyState.ArrowUp) {
        if (!(curState.ArrowDown && curState.ArrowUp)) {
            moveDirState.yState *= -1
        }
    } else if (moveKeyState.ArrowDown) {
        moveDirState.yState = -1
    } else if (moveKeyState.ArrowUp) {
        moveDirState.yState = 1
    } else {
        moveDirState.yState = 0
    }
}


const skillHandler = (key: string): [string, number] => {
    let src, width
    switch (key) {
        case 'q':
            src = divide1
            width = 400
            break
        case 'w':
            src = divide2
            width = 400
            break
        case 'e':
            src = divide3
            width = 400
            break
        case 'r':
            src = ruin
            width = 800
            break
        default:
            src = ''
            width = 0
            break
    }
    return [src, width]
}

const skillDirectionHandler = (facing: CharacterFacingState): [number, number] => {
    const { xState, yState } = moveDirState
    if (xState || yState) {
        return [xState, yState]
    }
    return [facing.xState, facing.yState]
}


export const InputController = (
    props: { pos: CharacterPositionState }
) => {
    const [skills, setSkills] = useState<SkillState[]>([])

    useEffect(() => {

        const handleKeyState = (key: KeyboardEvent, isDown: number): void => {

            const getKey: string = key.key

            if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(getKey)) {
                const curState = { ...moveKeyState }
                moveKeyState[getKey as keyof MoveKeyState] = isDown
                moveDirHandler(curState)
            } else if ('qwer'.includes(getKey) && isDown === 1) {
                const [skill, width] = skillHandler(getKey)
                
                setSkills(prev => [...prev, {
                    x: props.pos.xState,
                    y: props.pos.yState,
                    direction: [0, 0],
                    skill: skill,
                    width: width,
                }])
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
    }, [props.pos])

    return (
        <>
            { skills.map(({ x, y, direction, skill, width }, idx) => {
                return (
                    <style.skillContainer width={width} pos={{ xState: x, yState: y }} direction={direction} key={idx}>
                        <style.skillEffect src={skill} direction={direction} loading='lazy'/>
                    </style.skillContainer>
                )
            }) }
        </>
    )
}
