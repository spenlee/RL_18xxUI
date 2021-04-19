import React, {Component} from 'react';
import { connect } from "react-redux";
import { placeBidRequest, placeBid } from "../actions/index";
import { Game } from '../models';


interface AuctionBidState {
  game: Game,
  placeBidIsLoading: boolean,
  placeBidErr: boolean,
  placeBid: (req: placeBidRequest) => void,
};

class AuctionBid extends Component<AuctionBidState, any> {
  constructor(props: AuctionBidState) {
    super(props);
    this.state = {
      playerNumber: -1,
      amount: 0,
      companyShortName: "",
      pass: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event: any) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  toggleCheckbox(event: any) {
    let newValue = (this.state.pass === "on" || this.state.pass === true) ? false : true;
    this.setState({
      ...this.state,
      pass: newValue
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const placeBidRequest = {
      gameId: this.props.game._id,
      playerNumber: parseInt(this.state.playerNumber),
      amount: parseInt(this.state.amount),
      companyShortName: this.state.companyShortName,
      pass: this.state.pass,
    };
    this.props.placeBid(placeBidRequest);
  }

  render() {
    return(
      <div>
        <h2>Auction</h2>
        {this.props.placeBidIsLoading && <h3>Place bid is loading</h3>}
        {this.props.placeBidErr && <h3>Place bid failed</h3>}
        <form onSubmit={this.handleSubmit}>
          <label>
            playerNumber:
            <input type="text" name="playerNumber" value={this.state.playerNumber} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            amount:
            <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            companyShortName:
            <input type="text" name="companyShortName" value={this.state.companyShortName} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            pass:
            <input type="checkbox" name="pass" checked={this.state.pass} onChange={this.toggleCheckbox.bind(this)} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    placeBidIsLoading: state.gameState.placeBidIsLoading,
    placeBidErr: state.gameState.placeBidErr
  }
};

function mapDispatchToProps(dispatch: any) {
  return {
    placeBid: (req: placeBidRequest) => dispatch(placeBid(req))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBid);
