import PositionStateTypes from "./positionStateTypes"
import SkillCooldownTypes from "./skillCookdownTypes"
import SkillKeyStateTypes from "./skillKeyStateTypes"
import SkillObjectTypes from "./skillObjectTypes"

interface SkillTypes {
    reload: (keyState: SkillKeyStateTypes, posState: PositionStateTypes) => void
    skillList: SkillObjectTypes[]
    cooldownList: SkillCooldownTypes
}

export default SkillTypes