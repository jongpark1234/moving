import styled from 'styled-components'
import PlayerPosition from '../../interfaces/playerPosition'

export const background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    background-color: white;
`

export const character = styled.div<{ pos: PlayerPosition }>`
    width: 10px;
    height: 10px;
    position: absolute;
    left: ${props => props.pos.x}px;
    bottom: ${props => props.pos.y}px;
    background-color: black;
`

export const skillArea = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`