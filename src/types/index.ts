export namespace MoveKeyState {
    export type MoveKeyStateType = 'ArrowUp' | 'ArrowLeft' | 'ArrowDown' | 'ArrowRight'
    export type MoveKeyState = Record<MoveKeyStateType, number>
    export const MoveKeyStateTypelist = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
}

export namespace SkillKeyState {
    export type SkillKeyStateType = 'Q' | 'W' | 'E' | 'R'
}

export namespace PlayerPosition {
    export type PlayerPositionType = 'x' | 'y'
    export type PlayerPosition = Record<PlayerPositionType, number>
    export const PlayerPositionTypelist = ['x', 'y']
}
