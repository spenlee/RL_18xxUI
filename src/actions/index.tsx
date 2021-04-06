import {
  GET_GAMES_SUCCESS,
  GET_GAMES_IS_LOADING,
  GET_GAMES_HAS_ERRORED,
  CREATE_NEW_GAME_SUCCESS,
  CREATE_NEW_GAME_IS_LOADING,
  CREATE_NEW_GAME_HAS_ERRORED,
  GET_GAME_SUCCESS,
  GET_GAME_IS_LOADING,
  GET_GAME_HAS_ERRORED,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_IS_LOADING,
  DELETE_GAME_HAS_ERRORED,
} from "../constants/action-types";
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
  return {
    type: GET_GAMES_HAS_ERRORED,
    payload: hasError
  };
}

export interface createNewGameRequest {
  numPlayers: number
}

export function createNewGame(req: createNewGameRequest) {
  return function(dispatch: any) {
    dispatch(createNewGameLoading(true));

    axios.post('/api/game', req)
      .then((res: any) => res.data)
      .then((game: Game) => dispatch(createNewGameSuccess(game)))
      .catch(() => dispatch(createNewGameHasErrored(true)));
    }
};

export function createNewGameSuccess(game: Game) {
  return {
    type: CREATE_NEW_GAME_SUCCESS,
    payload: game
  };
}

export function createNewGameLoading(isLoading: boolean) {
  return {
    type: CREATE_NEW_GAME_IS_LOADING,
    payload: isLoading
  };
}

export function createNewGameHasErrored(hasError: boolean) {
  return {
    type: CREATE_NEW_GAME_HAS_ERRORED,
    payload: hasError
  };
}

export function getGame(id: string) {
  return function(dispatch: any) {
    dispatch(getGameIsLoading(true));

    axios.get(`/api/game/${id}`)
      .then((res: any) => res.data)
      .then((game: Game) => dispatch(getGameSuccess(game)))
      .catch(() => dispatch(getGameHasErrored(true)));
    }
};

export function getGameSuccess(game: Game) {
  return {
    type: GET_GAME_SUCCESS,
    payload: game
  };
}

export function getGameIsLoading(isLoading: boolean) {
  return {
    type: GET_GAME_IS_LOADING,
    payload: isLoading
  };
}

export function getGameHasErrored(hasError: boolean) {
  return {
    type: GET_GAME_HAS_ERRORED,
    payload: hasError
  };
}

export function deleteGame(id: string) {
  return function(dispatch: any) {
    dispatch(deleteGameIsLoading(true));

    axios.delete(`/api/game/${id}`)
      .then((res: any) => dispatch(deleteGameSuccess(id)))
      .catch(() => dispatch(deleteGameHasErrored(true)));
    }
};

export function deleteGameSuccess(id: string) {
  return {
    type: DELETE_GAME_SUCCESS,
    payload: id
  };
}

export function deleteGameIsLoading(isLoading: boolean) {
  return {
    type: DELETE_GAME_IS_LOADING,
    payload: isLoading
  };
}

export function deleteGameHasErrored(hasError: boolean) {
  return {
    type: DELETE_GAME_HAS_ERRORED,
    payload: hasError
  };
}
