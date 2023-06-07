import { useState } from 'react'
import { InputController, moveKeyState, moveDirState } from '../inputController'
import { useAnimate } from '../../hooks/useAnimate'
import Character from '../../images/characters/character.png'

import useCharacter from '../../hooks/useCharacter'

import * as style from './index.style'

const Main = () => {
    const [dir, setDir] = useState<number[]>([0, 0])
    const [x, y, move] = useCharacter()

    useAnimate(() => {
        setDir([
            moveKeyState.ArrowRight - moveKeyState.ArrowLeft,
            moveKeyState.ArrowUp - moveKeyState.ArrowDown
        ])
        move(dir)
    })

    return (
        <style.background>
            <InputController pos={{ x: x, y: y }}/>
            <style.character 
                src={Character}
                pos={{ x: x, y: y }}
                dx={moveDirState.xState}
                dy={moveDirState.yState}
            />
        </style.background>
    )
}

export default Main