import { useCallback, useEffect, useState } from 'react'

import SkillTypes from "../interfaces/skillTypes"
import SkillObjectTypes from '../interfaces/skillObjectTypes'
import SkillKeyStateTypes from '../interfaces/skillKeyStateTypes'
import SkillCooldownTypes from '../interfaces/skillCookdownTypes'
import PositionStateTypes from '../interfaces/positionStateTypes'
import SkillCooldownEndtimeTypes from '../interfaces/skillCooldownEndtimeTypes'

import divide from '../images/skills/divide1.gif'

export const useSkill: () => SkillTypes = () => {
    const [skillCooldown, setSkillCooldown] = useState<SkillCooldownTypes>({
        q: 0, w: 0, e: 0, r: 0
    })
    const [skillCooldownEndtime, setSkillCooldownEndtime] = useState<SkillCooldownEndtimeTypes>({
        q: new Date(), w: new Date(), e: new Date(), r: new Date(), 
    })
    const [skillObjectList, setSkillObjectList] = useState<SkillObjectTypes[]>([])

    const handleSkillObjectList = useCallback((skillObjectState: SkillObjectTypes[], posState: PositionStateTypes, curTime: Date) => {
        curTime.setMilliseconds(curTime.getMilliseconds() + 800) // 0.8초의 실행시간 ( 임시 )
        setSkillObjectList(prev => [...prev, {
            pos: { xState: posState.xState, yState: posState.yState }, // 스킬이 생성될 위치
            terminateTime: curTime, // 스킬 애니메이션 종료 시각
            animation: divide // 스킬 애니메이션 ( gif )
        }])
    }, [])

    const handleSkillCooldown = useCallback((
        key: string,
        curTime: Date,
        cooldownState: SkillCooldownTypes,
        cooldownEndtimeState: SkillCooldownEndtimeTypes
    ) => {
        curTime.setSeconds(curTime.getSeconds() + 10) // 현재 시간에 스킬 쿨타임만큼 추가하여 쿨타임 종료 시간 설정

        cooldownEndtimeState[key as keyof SkillCooldownEndtimeTypes] = curTime // 해당 스킬의 쿨타임 종료 시각 상태 변경
        setSkillCooldownEndtime(() => cooldownEndtimeState) // setState를 이용하여 상태변경
        cooldownState[key as keyof SkillCooldownTypes] = 10 // 해당 스킬의 쿨타임 상태 변경
        setSkillCooldown(() => cooldownState) // setState를 이용하여 상태변경
    }, [])

    const handleCooldownFlow = useCallback((
        curTime: Date,
        cooldownState: SkillCooldownTypes,
        cooldownEndtimeState: SkillCooldownEndtimeTypes
    ) => {
        ['q', 'w', 'e', 'r'].forEach((key) => {
            const curEndtimeState = cooldownEndtimeState[key as keyof SkillCooldownEndtimeTypes] // 현재 스킬이 끝나기로 한 시점
            const timeDist = curEndtimeState.getTime() - curTime.getTime() // 현재 시점과 스킬 종료 시점의 시간 차이
            cooldownState[key as keyof SkillCooldownTypes] = Math.max(timeDist, 0) // 현재 시점이 스킬 종료 시점보다 이후면 0, 아니면 두 시점의 차
        })
        setSkillCooldown(() => cooldownState)

    }, [])

    const handleTerminatedSkill = useCallback((curTime: Date) => {
        setSkillObjectList(prev => prev.filter(element => {
            return element.terminateTime.getTime() - curTime.getTime() > 0
        }))
    }, [])

    const reload = useCallback((keyState: SkillKeyStateTypes, posState: PositionStateTypes) => {
        const curTime = new Date(); // 현재 시간 객체
        for (let key of 'qwer') {
            if (keyState[key as keyof SkillKeyStateTypes] === 1) { // 해당 스킬키가 눌렸을 때
                if (skillCooldown[key as keyof SkillKeyStateTypes] === 0) { // 쿨타임이 다 돌았을 경우에만
                    handleSkillObjectList([...skillObjectList], posState, curTime) // 스킬 오브젝트 생성
                    handleSkillCooldown(key, curTime, skillCooldown, skillCooldownEndtime) // 스킬 쿨타임 돌림
                }
            }
        }
        handleCooldownFlow(curTime, skillCooldown, skillCooldownEndtime) // 스킬 쿨다운이 줄어듦
        handleTerminatedSkill(curTime) // 실행이 끝난 스킬을 리스트에서 제거
    }, [skillCooldown, skillObjectList, skillCooldownEndtime, handleSkillObjectList, handleSkillCooldown, handleCooldownFlow, handleTerminatedSkill])

    return {
        reload: reload,
        skillList: skillObjectList,
        cooldownList: skillCooldown
    } as SkillTypes
}