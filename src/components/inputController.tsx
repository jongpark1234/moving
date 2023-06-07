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
    xState: 1, yState: 0
}

const xMoveDeque: string[] = []
const yMoveDeque: string[] = []

const moveHandler = (key: string) => {
    if (xMoveDeque.length === 0) {

    }
    else if (xMoveDeque.length === 1) {
        if (xMoveDeque.includes(key)) {
            
        }
    } else {

    }
}

const dirHandler = (): void => {
    switch (moveDirState.xState) {
        case 1:
            if (moveKeyState.ArrowLeft === 1) {
                moveDirState.xState *= -1
            }
            break
        case 0:
            break
        case -1:
            if (moveKeyState.ArrowRight === 1) {
                moveDirState.xState *= -1
            }
            break
        default:
            break
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
                moveKeyState[getKey as MoveKeyState.MoveKeyStateType] = isDown
                moveHandler(getKey)
                dirHandler()

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
            { skills.map(({ x, y, skill, width, dx }, idx) => {
                return (
                    <style.skillContainer width={width} pos={{ x, y }} dx={dx} key={idx}>
                        <style.skillEffect src={skill} dx={dx} loading='lazy'/>
                    </style.skillContainer>
                )
            }) }
        </>
    )
}
