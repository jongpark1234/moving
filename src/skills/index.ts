import divide1Src from '../images/skills/divide1.gif'
import divide2Src from '../images/skills/divide2.gif'
import divide3Src from '../images/skills/divide3.gif'
import impenetrableSkinSrc from '../images/skills/impenetrableSkin.gif'
import ruinSrc from '../images/skills/ruin.gif'
import SkillInfoStateTypes from '../interfaces/skill/skillInfoStateTypes'

// https://andrew.hedges.name/experiments/aspect_ratio/ << Aspect Ratio Calculator

export namespace skills {
    export const divide1 = {
        src: divide1Src,
        playtime: 0.85,
        cooldown: 1,
        width: 400,
        height: 231,
        position: 'stare',
        chase: true
    } as SkillInfoStateTypes
    export const divide2 = {
        src: divide2Src,
        playtime: 0.85,
        cooldown: 1,
        width: 400,
        height: 211,
        position: 'stare',
        chase: true
    } as SkillInfoStateTypes
    export const divide3 = {
        src: divide3Src,
        playtime: 0.85,
        cooldown: 1,
        width: 400,
        height: 288,
        position: 'stare',
        chase: true
    } as SkillInfoStateTypes
    export const impenetrableSkin = {
        src: impenetrableSkinSrc,
        playtime: 1.26,
        cooldown: 2,
        width: 200,
        height: 213,
        position: 'top',
        chase: true
    } as SkillInfoStateTypes
    export const ruin = {
        src: ruinSrc,
        playtime: 6,
        cooldown: 30,
        width: 1228,
        height: 1200,
        position: 'onGround',
        chase: false
    } as SkillInfoStateTypes
}