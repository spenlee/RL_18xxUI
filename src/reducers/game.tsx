import {
  CREATE_NEW_GAME_SUCCESS,
  CREATE_NEW_GAME_IS_LOADING,
  CREATE_NEW_GAME_HAS_ERRORED,
  GET_GAME_SUCCESS,
  GET_GAME_IS_LOADING,
  GET_GAME_HAS_ERRORED,
  PLACE_BID_SUCCESS,
  PLACE_BID_IS_LOADING,
  PLACE_BID_HAS_ERRORED,
} from "../constants/action-types";
import { Game } from "../models/index";


const initial: gameState = {
  game: undefined,
  isLoading: false,
  err: false,
  placeBidIsLoading: false,
  placeBidErr: false,
}

interface gameState {
  game: Game | undefined,
  isLoading: boolean,
  err: boolean,
  placeBidIsLoading: boolean,
  placeBidErr: boolean,
}

export default function gameReducer(state: gameState = initial, action: any) {
  switch (action.type) {
    case CREATE_NEW_GAME_SUCCESS:
    case GET_GAME_SUCCESS:
    case PLACE_BID_SUCCESS:
	    return Object.assign({}, state, {
	      game: action.payload,
        isLoading: false,
        err: false,
        placeBidIsLoading: false,
        placeBidErr: false,
	    });
    case CREATE_NEW_GAME_IS_LOADING:
    case GET_GAME_IS_LOADING:
      return Object.assign({}, state, {
        game: state.game,
        isLoading: action.payload,
        err: false,
        placeBidIsLoading: state.placeBidIsLoading,
        placeBidErr: state.placeBidErr,
      });
    case CREATE_NEW_GAME_HAS_ERRORED:
    case GET_GAME_HAS_ERRORED:
      return Object.assign({}, state, {
        game: state.game,
        isLoading: false,
        err: action.payload,
        placeBidIsLoading: state.placeBidIsLoading,
        placeBidErr: state.placeBidErr,
      });
    case PLACE_BID_IS_LOADING:
      return Object.assign({}, state, {
        game: state.game,
        isLoading: state.isLoading,
        err: state.err,
        placeBidIsLoading: true,
        placeBidErr: false,
      });
    case PLACE_BID_HAS_ERRORED:
      return Object.assign({}, state, {
        game: state.game,
        isLoading: state.isLoading,
        err: state.err,
        placeBidIsLoading: false,
        placeBidErr: action.payload,
      });
    default:
      return state;
  }
}
