import { GET_GAMES_SUCCESS,
  GET_GAMES_IS_LOADING,
  GET_GAMES_HAS_ERRORED } from "../constants/action-types";
import { Game } from "../models/index";
import axios from 'axios';

export function getGames() {
  return function(dispatch: any) {
    dispatch(getGamesIsLoading(true));

    axios.get('/api/game')
      .then((res: any) => res.data)
      .then((games: Game[]) => dispatch(getGamesSuccess(games)))
      .catch(() => dispatch(getGamesHasErrored(true)));
    }
};

export function getGamesSuccess(games: Game[]) {
  return {
    type: GET_GAMES_SUCCESS,
    payload: games
  };
}

export function getGamesIsLoading(isLoading: boolean) {
  return {
    type: GET_GAMES_IS_LOADING,
    payload: isLoading
  };
}

export function getGamesHasErrored(hasError: boolean) {
  console.log("error here", hasError);
  return {
    type: GET_GAMES_HAS_ERRORED,
    payload: hasError
  };
}
