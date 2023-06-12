import CharacterFacingStateTypes from "./characterFacingStateTypes"
import PositionStateTypes from "./positionStateTypes"
import MoveDirStateTypes from "./moveDirStateTypes"
import MoveKeyStateTypes from "./moveKeyStateTypes"

interface CharacterTypes {
    width: number
    height: number
    movement: number
    pos: PositionStateTypes
    dir: MoveDirStateTypes
    facing: CharacterFacingStateTypes
    move: (dirState: MoveDirStateTypes) => void
    direct: (prevKeyState: MoveKeyStateTypes, curKeyState: MoveKeyStateTypes) => void
    face: (dirState: MoveDirStateTypes) => void
}

export default CharacterTypes