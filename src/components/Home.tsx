import React, {Component} from 'react';
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";
import { getGames, createNewGame } from "../actions/index";
import { Game } from "../models/index";

interface HomeState {
  games: Game[],
  isLoading: boolean,
  err: any,
  getGames: () => void,
  createNewGame: () => void,
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
                        {game._id}
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
    err: state.gamesState.err
  }
};

function mapDispatchToProps(dispatch: any) {
  return {
    getGames: () => dispatch(getGames()),
    createNewGame: () => dispatch(createNewGame({numPlayers: 4})),
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;
