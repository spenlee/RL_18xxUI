import React, {Component} from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import {
  withRouter
} from "react-router-dom";


interface RouteParams {id: string}

class Game extends Component<RouteComponentProps<RouteParams>, any> {
  constructor(props: any){
    super(props);

    this.state = {
      id: this.props.match.params.id
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <div>
        <h1>This is game: {this.state.id}</h1>
      </div>
    )
  }
}

export default withRouter(Game);
