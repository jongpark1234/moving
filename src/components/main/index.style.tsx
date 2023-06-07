import styled from 'styled-components'
import { PlayerPosition } from '../../types'
 
export const background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    background-color: white;
`

interface CharacterProps {
    pos: PlayerPosition.PlayerPosition
    facing: number
}

export const character = styled.img.attrs<CharacterProps>((props) => ({
    style: {
        left: `${props.pos.x}px`,
        bottom: `${props.pos.y}px`,
    }
}))<CharacterProps>`
    width: 145px;
    height: 190px;
    position: absolute;
    transform: scaleX(${props => props.facing});
`

export const skillArea = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export const skillContainer = styled.div<{ width: number, pos: PlayerPosition.PlayerPosition, dx: number }>`
    width: ${props => props.width}px;
    height: auto;
    position: absolute;
    left: ${
        (props) => props.pos.x - (
            props.dx === 1 ? -145 : 
            props.dx === 0 ? props.width / 2 :
            props.width
        )
    }px;
    bottom: ${props => props.pos.y}px;
`

export const skillEffect = styled.img<{ dx: number }>`
    width: 100%;
    max-width: 100%;
    transform: scaleX(${props => props.dx});
    transform: rotate(45deg)
`