import React, {Component} from 'react';
import axios from 'axios';

import StartNewGame from './StartNewGame';
import GamesList from './GamesList';
import Game from './Models';

interface DashBoardState {
  games: Game[]
}

class Dashboard extends Component {

  state:DashBoardState = {
    games: []
  }

  componentDidMount() {
    this.setState({
      games: this.getGames()
    });
  }

  getGames = () => {
    axios.get('/api/games')
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err))
  }

  render() {
    let games: Game[] = this.state.games;

    return(
      <div>
        <StartNewGame />
        <h1>Games(s)</h1>
        <GamesList {...games} />
      </div>
    )
  }
}

export default Dashboard;
