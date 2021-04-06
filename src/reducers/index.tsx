import { combineReducers } from 'redux';
import gamesState from "./games";
import gameState from "./game";

export default combineReducers({
  gamesState,
  gameState
});
