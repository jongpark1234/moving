import { SetStateAction, Dispatch } from 'react'
import SkillObjectTypes from "../../interfaces/skill/skillObjectTypes"

export const handleTerminatedSkill = (
    curTime: number,
    setSkillObjectList: Dispatch<SetStateAction<SkillObjectTypes[]>>
) => {
    setSkillObjectList(prev => prev.filter(element => {
        return element.terminateTime - curTime > 0
    }))
}
