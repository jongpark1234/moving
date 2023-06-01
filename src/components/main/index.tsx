import { useState, useCallback, useLayoutEffect } from 'react'
import * as style from './index.style'

const Main = () => {
    const [getXmoveState, setXmoveState] = useState(0)
    const [getYmoveState, setYmoveState] = useState(0)

    const move = useCallback((key: KeyboardEvent) => {
        const getKey = key.key
        if (getKey === 'w') {
            setYmoveState(-1)
        }
    }, [])

    useLayoutEffect(() => {
        window.addEventListener('keydown', move)
        return () => {
            window.removeEventListener('keydown', move)
        }
    }, [move])

    return (
        <style.background>
            <style.character />
        </style.background>
    )
}

export default Main