import { useEffect, useState } from 'react'

import SkillStateTypes from '../../interfaces/skillStateTypes'
import CharacterPositionStateTypes from '../../interfaces/characterPositionStateTypes'

import divide1 from '../../images/skills/divide1.gif'
import divide2 from '../../images/skills/divide2.gif'
import divide3 from '../../images/skills/divide3.gif'
import ruin from '../../images/skills/ruin.gif'

import * as style from '../main/index.style'
import MoveKeyStateTypes from '../../interfaces/moveKeyStateTypes'

export const moveKeyState: MoveKeyStateTypes = {
    ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
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

export const InputController = (
    props: { pos: CharacterPositionStateTypes }
) => {

    const [skills, setSkills] = useState<SkillStateTypes[]>([])

    useEffect(() => {

        const handleKeyState = (key: KeyboardEvent, isDown: number): void => {

            const getKey: string = key.key
    
            if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(getKey)) {
                moveKeyState[getKey as keyof MoveKeyStateTypes] = isDown
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
