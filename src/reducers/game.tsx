import { CREATE_NEW_GAME_SUCCESS,
  CREATE_NEW_GAME_IS_LOADING,
  CREATE_NEW_GAME_HAS_ERRORED } from "../constants/action-types";
import { Game } from "../models/index";


const initial: gameState = {
  game: undefined,
  isLoading: false,
  err: false
}

interface gameState {
  game: Game | undefined,
  isLoading: boolean,
  err: boolean
}

export default function gameReducer(state: gameState = initial, action: any) {
  switch (action.type) {
    case CREATE_NEW_GAME_SUCCESS:
	    return Object.assign({}, state, {
	      game: action.payload,
        isLoading: false,
        err: false
	    });
    case CREATE_NEW_GAME_IS_LOADING:
      return Object.assign({}, state, {
        game: state.game,
        isLoading: action.payload,
        err: false
      });
    case CREATE_NEW_GAME_HAS_ERRORED:
      return Object.assign({}, state, {
        game: state.game,
        isLoading: false,
        err: action.payload
      });
    default:
      return state;
  }
}
