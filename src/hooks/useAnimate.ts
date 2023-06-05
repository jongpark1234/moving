import { useRef, useLayoutEffect } from 'react'

export const useAnimate = (func: Function) => {
    const requestRef = useRef<number>(0);

    const animate = (t: DOMHighResTimeStamp) => {
        func()
        requestRef.current = requestAnimationFrame(animate)
    }
    
    useLayoutEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    })
}