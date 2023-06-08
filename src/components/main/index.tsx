import { useCallback, useEffect, useState } from 'react'
import { InputController, moveDirState } from '../inputController'
import { useAnimate } from '../../hooks/useAnimate'
import Character from '../../images/characters/character_standing.png'
import Moving from '../../images/characters/character_moving.gif'

import useCharacter from '../../hooks/useCharacter'

import * as style from './index.style'
import MoveDirState from '../../interfaces/moveDirState'

const Main = () => {
    const [xPos, yPos, facing, move, face] = useCharacter()
    
    const animate = useCallback(() => {
        move(moveDirState)
        face(moveDirState)
    }, [moveDirState])

    useAnimate(animate)

    return (
        <style.background>
            <InputController pos={{xState: xPos, yState: yPos}}/>
            <style.character 
                src={!(moveDirState.xState || moveDirState.yState) ? Character : Moving}
                pos={{ xState: xPos, yState: yPos }}
                facing={facing}
            />
        </style.background>
    )
}

export default Main