import CharacterFacingStateTypes from "../../interfaces/character/characterFacingStateTypes"
import MoveDirStateTypes from "../../interfaces/character/moveDirStateTypes"
import SkillPositioningTypes from "../../interfaces/skill/skillPositioningTypes"

export const handleSkillPositioning = (
    skillPosition: string,
    facing: CharacterFacingStateTypes,
    dir: MoveDirStateTypes
): SkillPositioningTypes => {
    return {
        scaleX: facing.xState,
        rotate: -dir.yState * (dir.xState ? 45 : 90)
    } as SkillPositioningTypes
}