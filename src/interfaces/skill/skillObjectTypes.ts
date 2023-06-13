import PositionStateTypes from "../positionStateTypes"
import SkillInfoStateTypes from "./skillInfoStateTypes"
import SkillPositioningTypes from "./skillPositioningTypes"

interface SkillObjectTypes extends SkillInfoStateTypes {
    pos: PositionStateTypes
    terminateTime: number
    positioning: SkillPositioningTypes
}

export default SkillObjectTypes