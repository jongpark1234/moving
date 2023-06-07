import { useState } from 'react'
import { InputController, moveKeyState, moveDirState } from '../inputController'
import { useAnimate } from '../../hooks/useAnimate'
import Character from '../../images/characters/character.png'

import useCharacter from '../../hooks/useCharacter'

import * as style from './index.style'

const Main = () => {
    const [dir, setDir] = useState<number[]>([0, 0])
    const [facing, setFacing] = useState<number>(1)
    const [x, y, move] = useCharacter()

    useAnimate(() => {
        setDir([moveDirState.xState, moveDirState.yState])
        setFacing(prev => moveDirState.xState === 0 ? prev : moveDirState.xState)
        move(dir)
    })

    return (
        <style.background>
            <InputController pos={{ x: x, y: y }}/>
            <style.character 
                src={Character}
                pos={{ x: x, y: y }}
                facing={facing}
            />
        </style.background>
    )
}

export default Main