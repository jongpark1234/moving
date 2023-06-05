import { useLayoutEffect } from 'react'
import { InputController, moveKeyState } from '../inputController'

import useCharacter from '../../stores/character'

import * as style from './index.style'

const Main = () => {
    const [x, y, move] = useCharacter()

    useLayoutEffect(() => {
        const func = () => {
            requestAnimationFrame(func)
            const dx = moveKeyState.ArrowRight - moveKeyState.ArrowLeft
            const dy = moveKeyState.ArrowUp - moveKeyState.ArrowDown
            move(dx, dy)
        }
        func()
    }, [])

    return (
        <style.background>
            <InputController/>
            <style.character pos={{x, y}} />
        </style.background>
    )
}

export default Main