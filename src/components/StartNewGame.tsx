import React from 'react';
import axios from 'axios';


class StartNewGame extends React.Component {

  startNewGame = () => {
    axios.post('/api/games')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <button onClick={this.startNewGame}>Start New Game</button>
      </div>
    )
  }
}

export default StartNewGame;
