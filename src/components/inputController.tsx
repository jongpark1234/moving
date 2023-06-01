import { useLayoutEffect } from 'react'
import MoveKeyState from '../interfaces/moveKeyState'

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