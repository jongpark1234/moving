import SkillKeyStateTypes from '../../interfaces/skill/skillKeyStateTypes'
import * as style from './index.style'

const Status = (
    props: { cooldown: SkillKeyStateTypes }
) => {
    return (
        <style.statusContainer>
            {
                ['q', 'w', 'e', 'r'].map((key) => {
                    return (
                        <style.skillIcon key={key}>
                            <span>{
                                Math.round(props.cooldown[key as keyof SkillKeyStateTypes] / 100) / 10
                            }</span>
                        </style.skillIcon>
                    )
                })
            }
        </style.statusContainer>
    )

}

export default Status