import { useCallback, useState } from 'react'

import SkillTypes from "../interfaces/skill/skillTypes"
import SkillObjectTypes from '../interfaces/skill/skillObjectTypes'
import SkillKeyStateTypes from '../interfaces/skill/skillKeyStateTypes'
import PositionStateTypes from '../interfaces/positionStateTypes'

import CharacterTypes from '../interfaces/character/characterTypes'

import { handleCooldownFlow } from '../handlers/skill/handleCooldownFlow'
import { handleTerminatedSkill } from '../handlers/skill/handleTerminatedSkill'
import { handleSkillCooldown } from '../handlers/skill/handleSkillCooldown'
import { handleSkillObjectList } from '../handlers/skill/handleSkillObjectList'

export const useSkill: (character: CharacterTypes) => SkillTypes = (
    character: CharacterTypes
) => {
    const [skillCooldown, setSkillCooldown] = useState<SkillKeyStateTypes>({
        q: 0, w: 0, e: 0, r: 0
    })
    const [skillCooldownEndtime, setSkillCooldownEndtime] = useState<SkillKeyStateTypes>({
        q: 0, w: 0, e: 0, r: 0
    })
    const [skillObjectList, setSkillObjectList] = useState<SkillObjectTypes[]>([])

    const reload = useCallback((
        skillKeyState: SkillKeyStateTypes,
        positionState: PositionStateTypes
    ) => {
        const curTime = new Date().getTime() // 현재 시간
        for (let i of 'qwer') {
            const key = i as keyof SkillKeyStateTypes
            if (skillKeyState[key] === 1) { // 해당 스킬키가 눌렸을 때
                if (skillCooldown[key] === 0) { // 쿨타임이 다 돌았을 경우에만
                    handleSkillObjectList( // 스킬 오브젝트 생성
                        key,
                        curTime,
                        character,
                        positionState,
                        setSkillObjectList
                    )
                    handleSkillCooldown( // 스킬 쿨타임 돌림
                        key,
                        curTime,
                        character,
                        setSkillCooldown,
                        setSkillCooldownEndtime
                    )
                }
            }
        }
        handleTerminatedSkill( // 실행이 끝난 스킬을 리스트에서 제거
            curTime,
            setSkillObjectList
        )
        handleCooldownFlow( // 스킬 쿨다운이 흐륾
            curTime,
            skillCooldown,
            skillCooldownEndtime,
            setSkillCooldown
        )
    }, [skillCooldown, skillCooldownEndtime, character])

    return {
        reload: reload,
        skillList: skillObjectList,
        cooldownList: skillCooldown
    } as SkillTypes
}