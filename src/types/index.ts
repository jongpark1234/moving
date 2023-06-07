export namespace MoveKeyState {
    export type MoveKeyStateType = 'ArrowUp' | 'ArrowLeft' | 'ArrowDown' | 'ArrowRight'
    export const MoveKeyStateTypelist = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
    export type MoveKeyState = Record<MoveKeyStateType, number>
}

export namespace MoveDirState {
    export type MoveDirStateType = 'xState' | 'yState'
    export const MoveKeyStateTypelist = ['xState', 'yState']
    export type MoveDirState = Record<MoveDirStateType, number>
}

export namespace SkillKeyState {
    export type SkillKeyStateType = 'q' | 'w' | 'e' | 'r'
    export const SkillKeyStateTypelist = ['q', 'w', 'e', 'r']
}

export namespace PlayerPosition {
    export type PlayerPositionType = 'x' | 'y'
    export const PlayerPositionTypelist = ['x', 'y']
    export type PlayerPosition = Record<PlayerPositionType, number>
}
