interface SkillInfoStateTypes {
    src: string
    playtime: number
    cooldown: number
    width: number
    position: 
        'center' |
        'left' |
        'right' |
        'bottom' |
        'top' |
        'bottomLeft' |
        'bottomRight' |
        'topLeft' |
        'topRight' |
        'onGround' |
        'stare'
}

export default SkillInfoStateTypes