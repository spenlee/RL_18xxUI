import React from 'react';
import axios from 'axios';
import Game from './Models';

class GamesList extends React.Component<{}, { games: Game[] }> {
// function GamesList(games: string[]) {

  constructor(props: Game[]) {
    super(props);
    this.state = { games: props };
  }

  loadGame = (id: string) => {
    console.log(`load ${id}`);
  }

  deleteGame = (id: string) => {
    axios.delete(`/api/games/${id}`)
      .then(res => {
        if (res.data) {
          // this.props.games = res.data;
          console.log(res.data);
        }
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <ul>
        {
          this.state.games && this.state.games.length > 0
          ?  (
            this.state.games.map(game => {
              return (
                <li key={game._id}> Game: {game._id}
                  <input type="button" onClick={() => this.loadGame(game._id)}> Load Game </input>
                  <input type="button" onClick={() => this.deleteGame(game._id)}> Delete Game </input>
                </li>
              )
            })
          )
          :  (
            <li>No games</li>
          )
        }
      </ul>
    )
  }

}

export default GamesList;
