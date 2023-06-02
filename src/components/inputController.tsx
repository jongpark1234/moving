import { useLayoutEffect } from 'react'
import MoveKeyState from '../interfaces/moveKeyState'
import Portal from '../portal/portal'
import divide from '../skills/divide.gif'

import * as style from './main/index.style'

export const moveKeyState: MoveKeyState = {
    w: 0, a: 0, s: 0, d: 0
}

export const InputController = () => {
    useLayoutEffect(() => {
        const handleKeyState = (key: KeyboardEvent, isDown: number) => {
            const getKey = key.key
            if ('wasd'.includes(getKey)) {
                moveKeyState[key.key as 'w' | 'a' | 's' | 'd'] = isDown
            } else if (getKey === ' ') {
                <Portal>
                    <style.skillContainer>
                        <style.skillEffect src={divide} loading='lazy' />
                    </style.skillContainer>
                </Portal>
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
    return <></>
}