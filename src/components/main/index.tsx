import { useCallback, useState } from 'react'
import { InputController, moveKeyState, skillKeyState } from '../inputController'
import Status from '../status/index'

import { useCharacter } from '../../hooks/useCharacter'
import { useSkill } from '../../hooks/useSkill'
import { useAnimate } from '../../hooks/useAnimate'

import Character from '../../images/characters/character_standing.png'
import Moving from '../../images/characters/character_moving.gif'

import MoveKeyStateTypes from '../../interfaces/character/moveKeyStateTypes'

import * as style from './index.style'

const Main = () => {
    const [prevMoveKeyState, setPrevMoveKeyState] = useState<MoveKeyStateTypes>({
        ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
    })
    const character = useCharacter()
    const skill = useSkill(character)
    
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
            <Status cooldown={skill.cooldownList}/>
            <style.character 
                src={!(character.dir.xState || character.dir.yState) ? Character : Moving}
                character={character}
            />
            <style.skillArea>
                {
                    skill.skillList.map((skill, idx) => {
                        return (
                            <style.skillContainer
                            skill={skill}
                            character={character}
                            key={idx}>
                                <style.skillEffect src={skill.src} loading='lazy'/>
                            </style.skillContainer>
                        )
                    })
                }
            </style.skillArea>
        </style.background>
    )
}

export default Main