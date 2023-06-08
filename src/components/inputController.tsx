import { useEffect, useState } from 'react'
import { MoveDirState, MoveKeyState, PlayerPosition, SkillKeyState } from '../types'
import SkillState from '../interfaces/skillState'
import divide1 from '../images/skills/divide1.gif'
import divide2 from '../images/skills/divide2.gif'
import divide3 from '../images/skills/divide3.gif'
import ruin from '../images/skills/ruin.gif'

import * as style from './main/index.style'

export const moveKeyState: MoveKeyState.MoveKeyState = {
    ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
}

export const moveDirState: MoveDirState.MoveDirState = {
    xState: 0, yState: 0
}

const moveXHandler = (curState: MoveKeyState.MoveKeyState) => {
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
}

const moveYHandler = (curState: MoveKeyState.MoveKeyState) => {
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

const skillDegHandler = (): number => {
    if (moveKeyState) {

    }
    return 0
}


export const InputController = (
        props: { pos: PlayerPosition.PlayerPosition }
    ) => {

    const [skills, setSkills] = useState<SkillState[]>([])

    useEffect(() => {

        const handleKeyState = (key: KeyboardEvent, isDown: number) => {

            const getKey: string = key.key

            if (MoveKeyState.MoveKeyStateTypelist.includes(getKey)) {
                const curState = { ...moveKeyState }
                moveKeyState[getKey as MoveKeyState.MoveKeyStateType] = isDown
                moveXHandler(curState)
                moveYHandler(curState)

            } else if (SkillKeyState.SkillKeyStateTypelist.includes(getKey) && isDown === 1) {
                const [skill, width] = skillHandler(getKey)
                
                const newSkill = {
                    x: props.pos.x,
                    y: props.pos.y, 
                    dx: moveDirState.xState,
                    skill: skill,
                    width: width,
                }

                setSkills(prev => [...prev, newSkill])
            }
        }

        const onKeyDown = (key: KeyboardEvent) => {
            handleKeyState(key, 1)
        }

        const onKeyUp = (key: KeyboardEvent) => {
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
            { skills.map(({ x, y, dx, skill, width }, idx) => {
                return (
                    <style.skillContainer width={width} pos={{ x, y }} direction={dx} key={idx}>
                        <style.skillEffect src={skill} dx={dx} loading='lazy'/>
                    </style.skillContainer>
                )
            }) }
        </>
    )
}
