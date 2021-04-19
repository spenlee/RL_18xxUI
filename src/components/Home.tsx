import {
  Button, ButtonGroup, Card
} from "@blueprintjs/core";
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";
import { createNewGame, deleteGame, getGame, getGames } from "../actions/index";
import { Game } from "../models/index";
import '../styles/home.scss';

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
    return (
      <div className="bp3-dark home-div">
        <div className="container">
          <h1>Home</h1>
        </div>
        <div className="container">
          <h1>Hey dad, welcome</h1>
        </div>
        {this.props.isLoading && <h2>hey dad i'm loading</h2>}
        {this.props.err &&
          <>
            <h2>hey dad, big error sorry</h2>
            <h3>{this.props.err}</h3>
          </>
        }
        {!this.props.err &&
          <>
            <div className="container">
              <Card>
                <h2>Start a new game</h2>
                <div className="container">
                  <Link to="/game" onClick={() => this.props.createNewGame()}>
                    <Button large={true}>
                      New Game
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="container">
              <Card>
                <h2>Existing Games</h2>
                {this.props.games.map((game) => (
                  <div className="container">
                    <h3>Game ID: {game._id}</h3>
                    <ButtonGroup>
                      <Link to="/game" onClick={() => this.props.getGame(game._id)}>
                        <Button large={true}>
                          Load Game
                        </Button>
                      </Link>
                      <Button large={true} onClick={() => this.props.deleteGame(game._id)}>
                        Delete Game
                      </Button>
                    </ButtonGroup>
                  </div>
                ))}
              </Card>
            </div>
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
    createNewGame: () => dispatch(createNewGame({ numPlayers: 4 })),
    getGame: (id: string) => dispatch(getGame(id)),
    deleteGame: (id: string) => dispatch(deleteGame(id)),
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;
