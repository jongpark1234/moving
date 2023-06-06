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
}

export const character = styled.div.attrs<CharacterProps>((props) => ({
    style: {
        left: `${props.pos.x}px`,
        bottom: `${props.pos.y}px`,
    }
}))<CharacterProps>`
    width: 10px;
    height: 10px;
    position: absolute;
    background-color: black;
`

export const skillArea = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export const skillContainer = styled.div<{ width: number, pos: PlayerPosition.PlayerPosition }>`
    width: ${props => props.width}px;
    height: auto;
    position: absolute;
    left: ${props => props.pos.x}px;
    bottom: ${props => props.pos.y}px;
`

export const skillEffect = styled.img`
    width: 100%;
    max-width: 100%;
`