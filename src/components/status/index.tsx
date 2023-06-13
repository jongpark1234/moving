import SkillCooldownTypes from '../../interfaces/skillCookdownTypes'
import * as style from './index.style'

const Status = (
    props: { cooldown: SkillCooldownTypes }
) => {
    return (
        <style.statusContainer>
            {
                ['q', 'w', 'e', 'r'].map((key) => {
                    return (
                        <style.skillIcon key={key}>
                            <span>{
                                Math.round(props.cooldown[key as keyof SkillCooldownTypes] / 100) / 10
                            }</span>
                        </style.skillIcon>
                    )
                })
            }
        </style.statusContainer>
    )

}

export default Status