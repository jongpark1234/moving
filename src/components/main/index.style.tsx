import styled from 'styled-components'
import CharacterPositionStateTypes from '../../interfaces/characterPositionStateTypes'
import CharacterFacingStateTypes from '../../interfaces/characterFacingStateTypes'
 
export const background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    background-color: white;
`

interface CharacterProps {
    pos: CharacterPositionStateTypes
    facing: CharacterFacingStateTypes
}

export const character = styled.img.attrs<CharacterProps>((props) => ({
    style: {
        left: `${props.pos.xState}px`,
        bottom: `${props.pos.yState}px`,
    }
}))<CharacterProps>`
    width: 145px;
    height: 190px;
    position: absolute;
    transform: scaleX(${props => props.facing.xState});
`

export const skillArea = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

interface SkillContainerProps {
    pos: CharacterPositionStateTypes
    width: number
    direction: [number, number]
}

export const skillContainer = styled.div<SkillContainerProps>`
    width: ${props => props.width}px;
    height: auto;
    position: absolute;
    left: ${
        props => props.pos.xState - (
            props.direction[0] === 1 ? -145 : 
            props.direction[0] === 0 ? props.width / 2 :
            props.width
        )
    }px;
    bottom: ${props => props.pos.yState}px;
`

export const skillEffect = styled.img<{ direction: [number, number] }>`
    width: 100%;
    max-width: 100%;
`