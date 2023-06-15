import { Dispatch, SetStateAction } from "react"
import SkillKeyStateTypes from "../../interfaces/skill/skillKeyStateTypes"

export const skillCooldownFlowHandler = (
    curTime: number,
    cooldownEndtimeState: SkillKeyStateTypes,
    setSkillCooldown: Dispatch<SetStateAction<SkillKeyStateTypes>>
) => {
    setSkillCooldown(prev => {
        ['q', 'w', 'e', 'r'].forEach((key) => {
            prev[key as keyof SkillKeyStateTypes] = Math.max(
                cooldownEndtimeState[key as keyof SkillKeyStateTypes] - curTime, 0
            ) // 현재 시점이 스킬 종료 시점보다 이후면 0, 아니면 두 시점의 차
        })
        return prev
    })
}