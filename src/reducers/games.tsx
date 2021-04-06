import {
  GET_GAMES_SUCCESS,
  GET_GAMES_IS_LOADING,
  GET_GAMES_HAS_ERRORED,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_IS_LOADING,
  DELETE_GAME_HAS_ERRORED,
} from "../constants/action-types";
import { Game } from "../models/index";

const initial: gamesState = {
  games: [],
  isLoading: false,
  err: false,
  deleteGameIsLoading: false,
  deleteGameErr: false,
}

interface gamesState {
  games: Game[],
  isLoading: boolean,
  err: boolean,
  deleteGameIsLoading: boolean,
  deleteGameErr: boolean,
}

export default function gamesReducer(state: gamesState = initial, action: any) {
  switch (action.type) {
    case GET_GAMES_SUCCESS:
	    return Object.assign({}, state, {
	      games: action.payload,
        isLoading: false,
        err: false
	    });
    case GET_GAMES_IS_LOADING:
      return Object.assign({}, state, {
        games: state.games,
        isLoading: action.payload,
        err: false
      });
    case GET_GAMES_HAS_ERRORED:
      return Object.assign({}, state, {
        games: state.games,
        isLoading: false,
        err: action.payload
      });
    case DELETE_GAME_SUCCESS:
      return Object.assign({}, state, {
        games: state.games.filter(g => g._id !== action.payload),
        isLoading: false,
        err: false,
        deleteGameIsLoading: false,
        deleteGameErr: false,
      });
    case DELETE_GAME_IS_LOADING:
      return Object.assign({}, state, {
        games: state.games,
        isLoading: false,
        err: false,
        deleteGameIsLoading: action.payload,
        deleteGameErr: false,
      });
    case DELETE_GAME_HAS_ERRORED:
      return Object.assign({}, state, {
        games: state.games,
        isLoading: false,
        err: false,
        deleteGameIsLoading: false,
        deleteGameErr: action.payload,
      });
    default:
      return state;
  }
}
