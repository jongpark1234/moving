import { useLayoutEffect, useState } from 'react'
import { MoveKeyState } from '../types'
import divide from '../skills/divide.gif'

import * as style from './main/index.style'

export const moveKeyState: MoveKeyState.MoveKeyState = {
    ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
}

export const InputController = () => {
    const [count, setCount] = useState<number>(0)

    useLayoutEffect(() => {
        const handleKeyState = (key: KeyboardEvent, isDown: number) => {
            const getKey: string = key.key
            if (MoveKeyState.MoveKeyStateTypelist.includes(getKey)) {
                moveKeyState[key.key as MoveKeyState.MoveKeyStateType] = isDown
            } else if (getKey === ' ' && isDown === 0) {
                setCount((prev) => prev + 1)
                
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
    }, [])

    return (
        <>
        {
            Array.from({ length : count }).map((_, idx) =>
                <style.skillContainer key={idx}>
                    <style.skillEffect src={divide} loading='lazy'/>
                </style.skillContainer>
            )
        }
        </>
    )
}