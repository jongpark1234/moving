import { Dispatch, SetStateAction } from "react"
import SkillKeyStateTypes from "../../interfaces/skill/skillKeyStateTypes"

export const skillCooldownFlowHandler = (
    curTime: number,
    cooldownState: SkillKeyStateTypes,
    cooldownEndtimeState: SkillKeyStateTypes,
    setSkillCooldown: Dispatch<SetStateAction<SkillKeyStateTypes>>
) => {
    ['q', 'w', 'e', 'r'].forEach((key) => {
        const curEndtimeState = cooldownEndtimeState[key as keyof SkillKeyStateTypes] // 현재 스킬이 끝나기로 한 시점
        const timeDist = curEndtimeState - curTime // 현재 시점과 스킬 종료 시점의 시간 차이
        cooldownState[key as keyof SkillKeyStateTypes] = Math.max(timeDist, 0) // 현재 시점이 스킬 종료 시점보다 이후면 0, 아니면 두 시점의 차
    })
    setSkillCooldown(cooldownState)
}
