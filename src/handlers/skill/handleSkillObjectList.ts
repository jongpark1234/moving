import { SetStateAction, Dispatch } from 'react'
import { handleSkillPositioning } from './handleSKillPositioning'
import CharacterTypes from "../../interfaces/character/characterTypes"
import PositionStateTypes from "../../interfaces/positionStateTypes"
import SkillKeyStateTypes from "../../interfaces/skill/skillKeyStateTypes"
import SkillObjectTypes from '../../interfaces/skill/skillObjectTypes'

export const handleSkillObjectList = (
    key: keyof SkillKeyStateTypes,
    curTime: number,
    character: CharacterTypes,
    positionState: PositionStateTypes,
    setSkillObjectList: Dispatch<SetStateAction<SkillObjectTypes[]>>
) => {
    const curSkill = character.skillList[key]
    setSkillObjectList(prev => [...prev, {
        ...curSkill,
        pos: { // 스킬이 생성될 위치
            xState: positionState.xState, yState: positionState.yState 
        },
        terminateTime: curTime + curSkill.playtime * 1000, // 스킬 애니메이션 종료 시각
        positioning: handleSkillPositioning(
            curSkill.position, character.facing, character.dir
        )
    }])
}