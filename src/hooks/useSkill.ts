import { useCallback, useState } from 'react'

import SkillTypes from "../interfaces/skill/skillTypes"
import SkillObjectTypes from '../interfaces/skill/skillObjectTypes'
import SkillKeyStateTypes from '../interfaces/skill/skillKeyStateTypes'
import PositionStateTypes from '../interfaces/positionStateTypes'

import SkillSetListTypes from '../interfaces/skill/skillSetListTypes'

export const useSkill: (skillSetList: SkillSetListTypes) => SkillTypes = (
    skillSetList: SkillSetListTypes
) => {
    const [skillCooldown, setSkillCooldown] = useState<SkillKeyStateTypes>({
        q: 0, w: 0, e: 0, r: 0
    })
    const [skillCooldownEndtime, setSkillCooldownEndtime] = useState<SkillKeyStateTypes>({
        q: 0, w: 0, e: 0, r: 0
    })
    const [skillObjectList, setSkillObjectList] = useState<SkillObjectTypes[]>([])

    const handleSkillObjectList = useCallback((
        key: keyof SkillKeyStateTypes,
        posState: PositionStateTypes,
        curTime: Date
    ) => {
        setSkillObjectList(prev => [...prev, {
            pos: { xState: posState.xState, yState: posState.yState }, // 스킬이 생성될 위치
            terminateTime: curTime.getTime() + skillSetList[key].playtime * 1000, // 스킬 애니메이션 종료 시각
            animation: skillSetList[key].src // 스킬 애니메이션 ( gif )
        }])
    }, [])

    const handleSkillCooldown = useCallback((
        key: keyof SkillKeyStateTypes,
        curTime: Date,
        cooldownState: SkillKeyStateTypes,
        cooldownEndtimeState: SkillKeyStateTypes
    ) => {
        cooldownEndtimeState[key] = curTime.getTime() + skillSetList[key].cooldown * 1000 // 해당 스킬의 쿨타임 종료 시각 상태 변경
        setSkillCooldownEndtime(cooldownEndtimeState) // setState를 이용하여 상태변경
        cooldownState[key] = skillSetList[key].cooldown // 해당 스킬의 쿨타임 상태 변경
        setSkillCooldown(cooldownState) // setState를 이용하여 상태변경
    }, [])

    const handleCooldownFlow = useCallback((
        curTime: Date,
        cooldownState: SkillKeyStateTypes,
        cooldownEndtimeState: SkillKeyStateTypes
    ) => {
        ['q', 'w', 'e', 'r'].forEach((key) => {
            const curEndtimeState = cooldownEndtimeState[key as keyof SkillKeyStateTypes] // 현재 스킬이 끝나기로 한 시점
            const timeDist = curEndtimeState - curTime.getTime() // 현재 시점과 스킬 종료 시점의 시간 차이
            cooldownState[key as keyof SkillKeyStateTypes] = Math.max(timeDist, 0) // 현재 시점이 스킬 종료 시점보다 이후면 0, 아니면 두 시점의 차
        })
        setSkillCooldown(() => cooldownState)
    }, [])

    const handleTerminatedSkill = useCallback((curTime: Date) => {
        setSkillObjectList(prev => prev.filter(element => {
            return element.terminateTime - curTime.getTime() > 0
        }))
    }, [])

    const reload = useCallback((keyState: SkillKeyStateTypes, posState: PositionStateTypes) => {
        const curTime = new Date(); // 현재 시간 객체
        for (let i of 'qwer') {
            const key = i as keyof SkillKeyStateTypes
            if (keyState[key] === 1) { // 해당 스킬키가 눌렸을 때
                if (skillCooldown[key] === 0) { // 쿨타임이 다 돌았을 경우에만
                    handleSkillObjectList(key, posState, curTime) // 스킬 오브젝트 생성
                    handleSkillCooldown(key, curTime, skillCooldown, skillCooldownEndtime) // 스킬 쿨타임 돌림
                }
            }
        }
        handleTerminatedSkill(curTime) // 실행이 끝난 스킬을 리스트에서 제거
        handleCooldownFlow(curTime, skillCooldown, skillCooldownEndtime) // 스킬 쿨다운이 줄어듦
    }, [skillCooldown, skillCooldownEndtime, handleSkillObjectList, handleSkillCooldown, handleCooldownFlow, handleTerminatedSkill])

    return {
        reload: reload,
        skillList: skillObjectList,
        cooldownList: skillCooldown
    } as SkillTypes
}