import CharacterFacingStateTypes from "./characterFacingStateTypes"
import CharacterPositionStateTypes from "./characterPositionStateTypes"
import MoveDirStateTypes from "./moveDirStateTypes"
import MoveKeyStateTypes from "./moveKeyStateTypes"

interface CharacterTypes {
    width: number
    height: number
    movement: number
    pos: CharacterPositionStateTypes
    dir: MoveDirStateTypes
    facing: CharacterFacingStateTypes
    move: (dirState: MoveDirStateTypes) => void
    direct: (prevKeyState: MoveKeyStateTypes, curKeyState: MoveKeyStateTypes) => void
    face: (dirState: MoveDirStateTypes) => void
}

export default CharacterTypes