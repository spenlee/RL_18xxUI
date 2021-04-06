import React, {Component} from 'react';
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";
import { getGames, createNewGame, getGame, deleteGame } from "../actions/index";
import { Game } from "../models/index";

interface HomeState {
  games: Game[],
  isLoading: boolean,
  err: boolean,
  deleteGameIsLoading: boolean,
  deleteGameErr: boolean,
  getGames: () => void,
  createNewGame: () => void,
  getGame: (id: string) => void,
  deleteGame: (id: string) => void,
};

class HomeComponent extends Component<HomeState, any> {

  componentDidMount() {
    this.props.getGames();
  }

  render() {
    return(
      <div>
        <h1>Home</h1>
        <h1>Hey dad, welcome</h1>
        {this.props.isLoading && <h2>hey dad i'm loading</h2>}
        {this.props.err &&
          <>
            <h2>hey dad, big error sorry</h2>
            <h3>{this.props.err}</h3>
          </>
        }
        {!this.props.err &&
          <>
            <h2>Start a new game</h2>
            <Link to="/game" onClick={() => this.props.createNewGame()}>
              New Game
            </Link>

            <h2>Load a game</h2>
            <ul>
                {this.props.games.map((game) => (
                    <li key={game._id}>
                      <Link to="/game" onClick={() => this.props.getGame(game._id)}>
                        Load {game._id}
                      </Link>
                      <button onClick={() => this.props.deleteGame(game._id)}>
                        Delete
                      </button>
                    </li>
                ))}
            </ul>
          </>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    games: state.gamesState.games,
    isLoading: state.gamesState.isLoading,
    err: state.gamesState.err,
    deleteGameIsLoading: state.gamesState.deleteGameIsLoading,
    deleteGameErr: state.gamesState.deleteGameErr,
  }
};

function mapDispatchToProps(dispatch: any) {
  return {
    getGames: () => dispatch(getGames()),
    createNewGame: () => dispatch(createNewGame({numPlayers: 4})),
    getGame: (id: string) => dispatch(getGame(id)),
    deleteGame: (id: string) => dispatch(deleteGame(id)),
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;
