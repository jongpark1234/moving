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
    const character = useCharacter()
    
    const animate = useCallback(() => {
        setPrevKeyState(() => ({ ...curKeyState }))
        setCurKeyState(() => ({ ...moveKeyState }))
        character.direct(prevKeyState, curKeyState)
        character.face(character.dir)
        character.move(character.dir)
    }, [character, curKeyState, prevKeyState])
    
    useAnimate(animate)

    return (
        <style.background>
            <InputController pos={character.pos}/>
            <style.character 
                src={!(character.dir.xState || character.dir.yState) ? Character : Moving}
                Width={character.width}
                Height={character.height}
                pos={character.pos}
                facing={character.facing}
            />
        </style.background>
    )
}

export default Main