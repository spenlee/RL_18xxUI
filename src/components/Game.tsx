import React, {Component} from 'react';
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";
import { Game } from "../models/index";


interface GameState {
  game: Game,
  isLoading: boolean,
  err: any
};

class ConnectedGameComponent extends Component<GameState, any> {

  componentDidMount() {
  }

  render() {
    return(
      <div>
        <h1>Game</h1>
        {this.props.isLoading && <h2>hey dad i'm loading</h2>}
        {this.props.err &&
          <>
            <h2>hey dad, big error sorry</h2>
            <h3>{this.props.err}</h3>
          </>
        }
        {!this.props.err && <div>{JSON.stringify(this.props.game,null,2)}</div>}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    game: state.gameState.game,
    isLoading: state.gameState.isLoading,
    err: state.gameState.err
  }
};

const GameComponent = connect(mapStateToProps)(ConnectedGameComponent);

export default GameComponent;
