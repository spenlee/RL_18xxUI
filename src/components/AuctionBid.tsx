import { FormGroup, Button, InputGroup, ControlGroup, Label, Switch } from '@blueprintjs/core';
import React, {Component} from 'react';
import { connect } from "react-redux";
import { placeBidRequest, placeBid } from "../actions/index";
import { Game } from '../models';
import '../styles/auction_bid.scss';


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
      playerNumber: props.game.currentPlayerTurn,
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
        <FormGroup>
          <ControlGroup className="row-container">
            <div className="auction-bid-box">
              <Label>Player:</Label>
            </div>
            <InputGroup className="auction-bid-box" type="text" large={true} name="playerNumber" value={this.state.playerNumber} onChange={this.handleChange} />
          </ControlGroup>

          <ControlGroup className="row-container">
            <div className="auction-bid-box">
              <Label>Amount:</Label>
            </div>
            <InputGroup type="text" className="auction-bid-box" large={true}  name="amount" value={this.state.amount} onChange={this.handleChange} />
          </ControlGroup>

          <ControlGroup className="row-container">
            <div className="auction-bid-box">
              <Label>Company:</Label>
            </div>
            <InputGroup type="text" className="auction-bid-box" large={true}  name="companyShortName" value={this.state.companyShortName} onChange={this.handleChange} />
          </ControlGroup>

          <ControlGroup className="row-container">
            <div className="auction-bid-box">
              <Label>Pass:</Label>
            </div>
            <div className="auction-bid-box">
              <Switch name="pass" large={true} checked={this.state.pass} onChange={this.toggleCheckbox.bind(this)} />
            </div>
          </ControlGroup>

          <Button type="submit" large={true} onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
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
