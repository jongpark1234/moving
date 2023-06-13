import divide1Src from '../images/skills/divide1.gif'
import divide2Src from '../images/skills/divide2.gif'
import divide3Src from '../images/skills/divide3.gif'
import impenetrableSkinSrc from '../images/skills/impenetrableSkin.gif'
import ruinSrc from '../images/skills/ruin.gif'
import SkillInfoStateTypes from '../interfaces/skill/skillInfoStateTypes'

export namespace skills {
    export const divide1 = {
        src: divide1Src,
        playtime: 0.85,
        cooldown: 1,
        width: 300,
        position: 'stare'
    } as SkillInfoStateTypes
    export const divide2 = {
        src: divide2Src,
        playtime: 0.85,
        cooldown: 1,
        width: 300,
        position: 'stare'
    } as SkillInfoStateTypes
    export const divide3 = {
        src: divide3Src,
        playtime: 0.85,
        cooldown: 1,
        width: 300,
        position: 'stare'
    } as SkillInfoStateTypes
    export const impenetrableSkin = {
        src: impenetrableSkinSrc,
        playtime: 1.26,
        cooldown: 60,
        width: 200,
        position: 'top'
    } as SkillInfoStateTypes
    export const ruin = {
        src: ruinSrc,
        playtime: 6,
        cooldown: 30,
        width: 600,
        position: 'onGround'
    } as SkillInfoStateTypes
}