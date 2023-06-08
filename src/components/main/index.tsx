import { useState } from 'react'
import { InputController, characterFacingState, moveDirState } from '../inputController'
import { useAnimate } from '../../hooks/useAnimate'
import Character from '../../images/characters/character_standing.png'
import Moving from '../../images/characters/character_moving.gif'

import useCharacter from '../../hooks/useCharacter'

import * as style from './index.style'

const Main = () => {
    const [xPos, yPos, facing, move, face] = useCharacter()

    // useAnimate(() => {
    // })

    console.log(xPos, yPos)

    return (
        <style.background>
            <InputController/>
            <style.character 
                src={!(moveDirState.xState || moveDirState.yState) ? Character : Moving}
                pos={{ xState: xPos, yState: yPos }}
                facing={facing}
            />
        </style.background>
    )
}

export default Main