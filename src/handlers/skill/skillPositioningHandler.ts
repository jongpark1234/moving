import CharacterTypes from "../../interfaces/character/characterTypes"
import SkillInfoStateTypes from "../../interfaces/skill/skillInfoStateTypes"
import SkillPositioningTypes from "../../interfaces/skill/skillPositioningTypes"
// 'center' |
//         'left' |
//         'right' |
//         'bottom' |
//         'top' |
//         'bottomLeft' |
//         'bottomRight' |
//         'topLeft' |
//         'topRight' |
//         'onGround' |
//         'stare'
export const skillPositioningHandler = (
    skill: SkillInfoStateTypes,
    character: CharacterTypes,
): SkillPositioningTypes => {
    switch (skill.position) {
        case 'center':
            console.log({
                left: character.width / 2 - skill.width / 2,
                bottom: character.height / 2
            })
            break
        case 'left':
            console.log({
                left: 0,
                bottom: character.height / 2
            })
            break
        case 'right':
            console.log({
                left: character.width,
                bottom: character.height / 2
            })
            break
        default:
            break
    }
    
    return {
        scaleX: character.facing.xState,
        rotate: -character.dir.yState * (character.dir.xState ? 45 : 90)
    } as SkillPositioningTypes
}