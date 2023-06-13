import styled from 'styled-components'
import PositionStateTypes from '../../interfaces/positionStateTypes'
import CharacterFacingStateTypes from '../../interfaces/character/characterFacingStateTypes'
import SkillPositioningTypes from '../../interfaces/skill/skillPositioningTypes'

export const background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    background-color: white;
`

interface CharacterProps {
    charWidth: number
    charHeight: number
    pos: PositionStateTypes
    facing: CharacterFacingStateTypes
}

export const character = styled.img.attrs<CharacterProps>((props) => ({
    style: {
        left: `${props.pos.xState}px`,
        bottom: `${props.pos.yState}px`,
    }
}))<CharacterProps>`
    width: ${props => props.charWidth}px;
    height: ${props => props.charHeight}px;
    position: absolute;
    transform: scaleX(${props => props.facing.xState});
`

export const skillArea = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

interface SkillContainerProps {
    pos: PositionStateTypes
    charWidth: number
    charHeight: number
    skillWidth: number
    positioning: SkillPositioningTypes
}

export const skillContainer = styled.div<SkillContainerProps>`
    width: ${props => props.skillWidth}px;
    height: auto;
    position: absolute;
    transform: scaleX(${props => props.positioning.scaleX}) rotate(${props => props.positioning.rotate}deg);
    left: ${props => props.pos.xState}px;
    bottom: ${props => props.pos.yState}px;
`

export const skillEffect = styled.img`
    width: 100%;
    max-width: 100%;
`