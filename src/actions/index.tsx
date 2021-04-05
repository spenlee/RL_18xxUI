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
      .catch((err: any) => dispatch(getGamesHasErrored(err)));
    }
};

export function getGamesSuccess(games: Game[]) {
  return {
    type: GET_GAMES_SUCCESS,
    games
  };
}

export function getGamesIsLoading(bool: boolean) {
  return {
    type: GET_GAMES_IS_LOADING,
    bool
  };
}

export function getGamesHasErrored(err: any) {
  return {
    type: GET_GAMES_HAS_ERRORED,
    err
  };
}
