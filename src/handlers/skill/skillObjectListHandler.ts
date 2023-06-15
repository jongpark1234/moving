import { SetStateAction, Dispatch } from 'react'
import { skillPositioningHandler } from './skillPositioningHandler'
import CharacterTypes from "../../interfaces/character/characterTypes"
import PositionStateTypes from "../../interfaces/positionStateTypes"
import SkillKeyStateTypes from "../../interfaces/skill/skillKeyStateTypes"
import SkillObjectTypes from '../../interfaces/skill/skillObjectTypes'

export const skillObjectListHandler = (
    curTime: number,
    key: keyof SkillKeyStateTypes,
    character: CharacterTypes,
    positionState: PositionStateTypes,
    setSkillObjectList: Dispatch<SetStateAction<SkillObjectTypes[]>>
) => {
    const curSkill = character.skillList[key]
    setSkillObjectList(prev => [...prev, {
        ...curSkill, // 현재 등록된 스킬 원형의 base Info 또한 가져옴
        pos: { // 스킬이 생성될 위치 상태 ( 현 플레이어 위치 )
            xState: positionState.xState,
            yState: positionState.yState,
        },
        terminateTime: curTime + curSkill.playtime * 1000, // 스킬 시전 종료 시각
        positioning: skillPositioningHandler( // 스킬의 방향, 시전 위치, 종속성 등을 결정하는 상태
            curSkill, character
        )
    }])
}