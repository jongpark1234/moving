import styled from 'styled-components'
import CharacterTypes from '../../interfaces/character/characterTypes'
import SkillObjectTypes from '../../interfaces/skill/skillObjectTypes'

export const background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    background-color: white;
`

interface CharacterProps {
    character: CharacterTypes
}

export const character = styled.img.attrs<CharacterProps>((props) => ({
    style: {
        left: `${props.character.pos.xState}px`,
        bottom: `${props.character.pos.yState}px`,
    }
}))<CharacterProps>`
    width: ${props => props.character.width}px;
    height: ${props => props.character.height}px;
    position: absolute;
    transform: scaleX(${props => props.character.facing.xState});
`

export const skillArea = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

interface SkillContainerProps {
    skill: SkillObjectTypes
    character: CharacterTypes
}

export const skillContainer = styled.div<SkillContainerProps>`
    width: ${props => props.skill.width}px;
    height: auto;
    position: absolute;
    transform: scaleX(${props => props.skill.positioning.scaleX}) rotate(${props => props.skill.positioning.rotate}deg);
    left: ${
        props => (props.skill.chase ? props.character.pos.xState : props.skill.pos.xState) + props.skill.positioning.left
    }px;
    bottom: ${
        props => (props.skill.chase ? props.character.pos.yState : props.skill.pos.yState) + props.skill.positioning.bottom
    }px;
`

export const skillEffect = styled.img`
    width: 100%;
    max-width: 100%;
`