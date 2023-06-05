import { InputController, moveKeyState } from '../inputController'
import { useAnimate } from '../../hooks/useAnimate'

import useCharacter from '../../hooks/useCharacter'

import * as style from './index.style'

const Main = () => {
    const [x, y, move] = useCharacter()

    useAnimate(() => {
        const dx = moveKeyState.ArrowRight - moveKeyState.ArrowLeft
        const dy = moveKeyState.ArrowUp - moveKeyState.ArrowDown
        move(dx, dy)
    })

    return (
        <style.background>
            <InputController/>
            <style.character pos={{ x, y }} />
        </style.background>
    )
}

export default Main