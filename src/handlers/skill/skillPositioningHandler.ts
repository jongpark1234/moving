import CharacterTypes from "../../interfaces/character/characterTypes"
import SkillInfoStateTypes from "../../interfaces/skill/skillInfoStateTypes"
import SkillPositioningTypes from "../../interfaces/skill/skillPositioningTypes"

export const skillPositioningHandler = (
    skill: SkillInfoStateTypes,
    character: CharacterTypes,
): SkillPositioningTypes => {
    switch (skill.position) {
        case 'center':
            return {
                left: (character.width - skill.width) / 2,
                bottom: (character.height - skill.height) / 2,
            }
        case 'left':
            return {
                left: -skill.width,
                bottom: (character.height - skill.height) / 2,
            }
        case 'right':
            return {
                left: character.width,
                bottom: (character.height - skill.height) / 2,
            }
        case 'bottom':
            return {
                left: (character.width - skill.width) / 2,
                bottom: -skill.height,
            }
        case 'top':
            return {
                left: (character.width - skill.width) / 2,
                bottom: character.height
            }
        case 'bottomLeft':
            return {
                left: -skill.width,
                bottom: -skill.height
            }
        case 'bottomRight':
            return {
                left: character.width,
                bottom: -skill.height
            }
        case 'topLeft':
            return {
                left: -skill.width,
                bottom: character.height
            }
        case 'topRight':
            return {
                left: character.width,
                bottom: character.height
            }
        case 'onGround':
            return {
                left: (character.width - skill.width) / 2,
                bottom: 0
            }
        case 'stare':
            return {
                left: 0,
                bottom: 0,
                scaleX: character.facing.xState,
                rotate: -character.dir.yState * (character.dir.xState ? 45 : 90)
            }
        default:
            return {
                left: 0,
                bottom: 0
            }
    }    
}