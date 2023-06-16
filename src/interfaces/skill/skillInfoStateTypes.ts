interface SkillInfoStateTypes {
    src: string
    playtime: number
    cooldown: number
    width: number
    height: number
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
    chase: boolean
}

export default SkillInfoStateTypes