import { SetStateAction, Dispatch } from 'react'
import CharacterTypes from "../../interfaces/character/characterTypes"
import SkillKeyStateTypes from "../../interfaces/skill/skillKeyStateTypes"

export const skillCooldownHandler = (
    curTime: number,
    key: keyof SkillKeyStateTypes,
    character: CharacterTypes,
    setSkillCooldown: Dispatch<SetStateAction<SkillKeyStateTypes>>,
    setSkillCooldownEndtime: Dispatch<SetStateAction<SkillKeyStateTypes>>
) => {
    const curSkill = character.skillList[key]
    setSkillCooldown(prev => {
        prev[key] = curSkill.cooldown // 해당 스킬의 쿨타임 상태 변경
        return prev
    })
    setSkillCooldownEndtime(prev => {
        prev[key] = curTime + curSkill.cooldown * 1000 // 해당 스킬의 쿨타임 종료 시각 상태 변경
        return prev
    })
}