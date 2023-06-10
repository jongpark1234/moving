import { useCallback, useState } from 'react'
import { InputController, moveKeyState } from '../inputController'

import { useCharacter } from '../../hooks/useCharacter'
import { useAnimate } from '../../hooks/useAnimate'

import Character from '../../images/characters/character_standing.png'
import Moving from '../../images/characters/character_moving.gif'

import MoveKeyStateTypes from '../../interfaces/moveKeyStateTypes'

import * as style from './index.style'

const Main = () => {
    const [prevKeyState, setPrevKeyState] = useState<MoveKeyStateTypes>({
        ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
    })
    const [curKeyState, setCurKeyState] = useState<MoveKeyStateTypes>({
        ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
    })
    const [pos, dir, facing, move, direct, face] = useCharacter()
    
    const animate = useCallback(() => {
        setPrevKeyState({ ...curKeyState })
        setCurKeyState({ ...moveKeyState })
        direct(prevKeyState, curKeyState)
        face(dir)
        move(dir)
    }, [move, direct, face, dir, curKeyState, prevKeyState])
    
    useAnimate(animate)

    return (
        <style.background>
            <InputController pos={pos}/>
            <style.character 
                src={!(dir.xState || dir.yState) ? Character : Moving}
                pos={pos}
                facing={facing}
            />
        </style.background>
    )
}

export default Main