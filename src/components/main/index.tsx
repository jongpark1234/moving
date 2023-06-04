import { useState, useCallback, useLayoutEffect } from 'react'
import { InputController, moveKeyState } from '../inputController'

import PlayerPosition from '../../interfaces/playerPosition'

import * as style from './index.style'

const Main = () => {
    const [getPos, setPos] = useState<PlayerPosition>({
        x: 0, y: 0
    })
    const MOVEMENT = 10

    const posLimit = (pos: number, limit: number): number => {
        return Math.min(Math.max(pos, 0), limit)
    }

    const move = useCallback((dx: number, dy: number) => {
        setPos({
            x: posLimit(getPos.x + dx * MOVEMENT, window.innerWidth - 10),
            y: posLimit(getPos.y + dy * MOVEMENT, window.innerHeight - 10)
        })
    }, [getPos])

    requestAnimationFrame(() => {
        const dx = moveKeyState.ArrowRight - moveKeyState.ArrowLeft
        const dy = moveKeyState.ArrowUp - moveKeyState.ArrowDown
        move(dx, dy)
    })

    return (
        <style.background>
            <style.character pos={getPos} />
            <InputController/>
        </style.background>
    )
}

export default Main