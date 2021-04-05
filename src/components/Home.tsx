import React, {Component} from 'react';
import { connect } from "react-redux";
import { getGames } from "../actions/index";
import { Game } from "../models/index";

interface HomeState {
  games: Game[],
  isLoading: boolean,
  err: any,
  getGames: () => void
};

class HomeComponent extends Component<HomeState, any> {

  componentDidMount() {
    this.props.getGames();
  }

  render() {
    if (this.props.isLoading) {
      return(
        <div>
          <h1>Games(s)</h1>
            <h2>hey dad i'm loading</h2>
        </div>
      )
    }
    if (this.props.err) {
      return(
        <div>
          <h1>Games(s)</h1>
            <h2>{err}</h2>
        </div>
      )
    }

    return(
      <div>
        <h1>Games(s)</h1>
          <ul>
              {this.props.games.map((game) => (
                  <li key={game._id}>
                      {game._id}
                  </li>
              ))}
          </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    games: state.games,
    isLoading: state.isLoading,
    err: state.err
  }
};

function mapDispatchToProps(dispatch: any) {
  return {
    getGames: dispatch(getGames())
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;
