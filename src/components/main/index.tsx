import { useState } from 'react'
import { InputController, moveDirState } from '../inputController'
import { useAnimate } from '../../hooks/useAnimate'
import Character from '../../images/characters/character_standing.png'
import Moving from '../../images/characters/character_moving.gif'

import useCharacter from '../../hooks/useCharacter'

import * as style from './index.style'

const Main = () => {
    const [dir, setDir] = useState<number[]>([0, 0])
    const [x, y, facing, move] = useCharacter()

    useAnimate(() => {
        setDir([moveDirState.xState, moveDirState.yState])
        move(dir)
    })

    return (
        <style.background>
            <InputController pos={{ x: x, y: y }}/>
            <style.character 
                src={moveDirState.xState === 0 && moveDirState.yState === 0 ? Character : Moving}
                pos={{ x: x, y: y }}
                facing={facing}
            />
        </style.background>
    )
}

export default Main