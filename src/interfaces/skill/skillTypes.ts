import PositionStateTypes from "../positionStateTypes"
import SkillKeyStateTypes from "./skillKeyStateTypes"
import SkillObjectTypes from "./skillObjectTypes"

interface SkillTypes {
    reload: (keyState: SkillKeyStateTypes, posState: PositionStateTypes) => void
    skillList: SkillObjectTypes[]
    cooldownList: SkillKeyStateTypes
}

export default SkillTypes