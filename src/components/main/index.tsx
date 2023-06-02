import { useState, useCallback, useLayoutEffect } from 'react'
import { InputController, moveKeyState } from '../inputController'

import PlayerPosition from '../../interfaces/playerPosition'

import * as style from './index.style'

const Main = () => {
    const [getPos, setPos] = useState<PlayerPosition>({
        x: 0, y: 0
    })
    const MOVEMENT = 5

    const posLimit = (pos: number, limit: number): number => {
        return Math.min(Math.max(pos, 0), limit)
    }

    const move = useCallback((dx: number, dy: number) => {
        setPos({
            x: posLimit(getPos.x + dx * MOVEMENT, window.innerWidth - 10),
            y: posLimit(getPos.y + dy * MOVEMENT, window.innerHeight - 10)
        })
    }, [getPos])

    useLayoutEffect(() => {
        const moveInterval = setInterval(() => {
            const dx = moveKeyState.d - moveKeyState.a
            const dy = moveKeyState.w - moveKeyState.s
            move(dx, dy)
        }, 1)
        return () => {
            clearInterval(moveInterval)
        }
    })

    return (
        <style.background>
            <style.character pos={getPos} />
            <InputController/>
        </style.background>
    )
}

export default Main