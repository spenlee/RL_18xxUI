import { GET_GAMES_SUCCESS,
  GET_GAMES_IS_LOADING,
  GET_GAMES_HAS_ERRORED } from "../constants/action-types";
import { Game } from "../models/index";

const initial: gamesState = {
  games: [],
  isLoading: false,
  err: null
}

interface gamesState {
  games: Game[],
  isLoading: boolean,
  err: any
}

export default function games(state: gamesState = initial, action: any) {
  switch (action.type) {
    case 'GET_GAMES_SUCCESS':
	    return Object.assign({}, state, {
	      games: action.payload,
        isLoading: false,
        err: null
	    });
    case 'GET_GAMES_IS_LOADING':
      return Object.assign({}, state, {
        games: state.games,
        isLoading: action.payload,
        err: null
      });
    case 'GET_GAMES_HAS_ERRORED':
      return Object.assign({}, state, {
        games: state.games,
        isLoading: false,
        err: action.payload
      });
    default:
      return state;
  }
}
