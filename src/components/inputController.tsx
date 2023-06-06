import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MoveKeyState, PlayerPosition } from '../types'
import SkillState from '../interfaces/skillState'
import divide1 from '../skills/divide1.gif'
import divide2 from '../skills/divide2.gif'
import divide3 from '../skills/divide3.gif'
import ruin from '../skills/ruin.gif'

import * as style from './main/index.style'

export const moveKeyState: MoveKeyState.MoveKeyState = {
    ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0, ArrowRight: 0
}

export const InputController = (props: { pos: PlayerPosition.PlayerPosition }) => {
    const [skills, setSkills] = useState<Array<SkillState>>([])

    useEffect(() => {

        const handleKeyState = (key: KeyboardEvent, isDown: number) => {
            const getKey: string = key.key
            if (MoveKeyState.MoveKeyStateTypelist.includes(getKey)) {
                moveKeyState[key.key as MoveKeyState.MoveKeyStateType] = isDown
            } else if ('qwer'.includes(getKey) && isDown === 1) {
                let curSkill, curWidth
                switch (getKey) {
                    case 'q':
                        curSkill = divide1
                        curWidth = 100
                        break
                    case 'w':
                        curSkill = divide2
                        curWidth = 100
                        break
                    case 'e':
                        curSkill = divide3
                        curWidth = 100
                        break
                    case 'r':
                        curSkill = ruin
                        curWidth = 1000
                        break
                    default:
                        curSkill = ''
                        curWidth = 0
                        break
                }
                
                const newElement = {
                    x: props.pos.x,
                    y: props.pos.y, 
                    skill: curSkill,
                    width: curWidth
                }

                setSkills(prev => [...prev, newElement])
            }
        }

        const onKeyDown = (key: KeyboardEvent) => {
            handleKeyState(key, 1)
        }

        const onKeyUp = (key: KeyboardEvent) => {
            handleKeyState(key, 0)
        }

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [props.pos])
    
    return (
        <>
            { skills.map(({ x, y, skill, width }, idx) => {
                return (
                    <style.skillContainer width={width} pos={{x,y}} key={idx}>
                        <style.skillEffect src={skill} loading='lazy'/>
                    </style.skillContainer>
                )
            }) }
        </>
    )
}

// function getGifPlaytime(gifUrl: ) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
  
//       img.onload = function() {
//         // @ts-ignore
//         const playtime = img.duration || 0;
//         resolve(playtime);
//       };
  
//       img.onerror = function() {
//         reject(new Error('Failed to load the GIF.'));
//       };
  
//       img.src = gifUrl;
//     });
//   }
  
//   // Example usage
//   const gifUrl = divide;
//   getGifPlaytime(gifUrl)
//     .then(playtime => {
//       console.log('Playtime:', playtime);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });