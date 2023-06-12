import { useCallback, useState } from 'react'
import { InputController, moveKeyState, skillKeyState } from '../inputController'

import { useCharacter } from '../../hooks/useCharacter'
import { useSkill } from '../../hooks/useSkill'
import { useAnimate } from '../../hooks/useAnimate'

import Character from '../../images/characters/character_standing.png'
import Moving from '../../images/characters/character_moving.gif'

import MoveKeyStateTypes from '../../interfaces/moveKeyStateTypes'

import * as style from './index.style'

const Main = () => {
    const [prevMoveKeyState, setPrevMoveKeyState] = useState<MoveKeyStateTypes>({
        ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
    })
    const character = useCharacter()
    const skill = useSkill()

    const animate = useCallback(() => {
        character.direct(prevMoveKeyState, moveKeyState)
        setPrevMoveKeyState(() => ({ ...moveKeyState } as MoveKeyStateTypes))
        character.face(character.dir)
        character.move(character.dir)
        skill.reload(skillKeyState, character.pos)
    }, [character, skill, prevMoveKeyState])
    
    useAnimate(animate)

    return (
        <style.background>
            <InputController />
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