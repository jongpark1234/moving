import styled from 'styled-components'
import PlayerPosition from '../../interfaces/playerPosition'

export const background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    background-color: white;
`

interface characterProps {
    pos: PlayerPosition
}

export const character = styled.div.attrs<characterProps>((props) => ({
    style: {
        left: `${props.pos.x}px`,
        bottom: `${props.pos.y}px`,
    }
}))<characterProps>`
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

export const skillContainer = styled.div`
    max-width: 100px;
    height: auto;
`

export const skillEffect = styled.img`
    width: 100%;
    max-width: 100%;
`