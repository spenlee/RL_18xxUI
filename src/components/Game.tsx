import React, {Component} from 'react';
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";
import { Game, Bank, Player, MinorCompany, PrivateCompany } from "../models/index";
import AuctionBid from "./AuctionBid";


interface GameState {
  game: Game,
  isLoading: boolean,
  err: any
};

class GameComponent extends Component<GameState, any> {

  componentDidMount() {
  }

  render() {
    return(
      <div>
        <h1>Game Page</h1>
        {this.props.isLoading && <h2>hey dad i'm loading</h2>}
        {this.props.err &&
          <>
            <h2>hey dad, big error sorry</h2>
            <h3>{this.props.err}</h3>
          </>
        }
        {!this.props.game && <h2>No game loaded, go Home dad</h2>}
        {!this.props.err && this.props.game && <>{displayGame(this.props.game)}</>}
      </div>
    )
  }
}

function displayGame(game: Game) {
  return(
  <div>
    <div>
      {displayAuctionBid(game)}
      <h2>Game</h2>
      <ul>
        <li>_id: {game._id}</li>
        <li>hasGameEnded: {String(game.hasGameEnded)}</li>
        <li>winningPlayer: {String(game.winningPlayer)}</li>
        <li>priorityDealPlayerNumber: {game.priorityDealPlayerNumber}</li>
        <li>currentPlayerTurn: {game.currentPlayerTurn}</li>
        <li>consecutivePasses: {game.consecutivePasses}</li>
        <li>roundType: {game.roundType}</li>
        <li>phase: {game.phase}</li>
        <li>roundNumber: {game.roundNumber}</li>
        <li>playerCertificateLimit: {game.playerCertificateLimit}</li>
      </ul>
    </div>

    {displayBank(game.bank)}

    {displayPlayers(game.playerMap)}

    {displayPrivateCompanies(game.privateCompanyMap)}

    {displayMinorCompanies(game.minorCompanyMap)}
  </div>);
}

function displayAuctionBid(game: Game) {
  const shouldDisplayAuctionActions = game.roundType === "AUCTION" || game.roundType === "PRIVATE_AUCTION";
  if (shouldDisplayAuctionActions) {
    return <AuctionBid gameId={game._id}/>;
  }
  return;
}

function displayBank(bank: Bank) {
  return(
  <div>
    <h2>Bank</h2>
    <ul>
      <li>money: {bank.money}</li>
    </ul>
  </div>);
}

function displayPlayers(playerMap: Map<string, Player>) {
  const players = Object.values(playerMap);
  players.sort((p1, p2) => p1.playerNumber - p2.playerNumber);

  return(
  <div>
    <h2>Players</h2>
    {players.map((player) => 
      <div>
        <h3>playerNumber: {player.playerNumber}</h3>
        <ul>
          <li>money: {player.money}</li>
        </ul>
      </div>
    )}
  </div>);
}

function displayPrivateCompanies(privateCompanyMap: Map<string, PrivateCompany>) {
  const companies = Object.values(privateCompanyMap);
  companies.sort((c1, c2) => c1.bidOrder - c2.bidOrder);

  return(
  <div>
    <h2>Private Companies</h2>
    {companies.map((company) => 
      <div>
        <h3>shortName: {company.shortName}</h3>
        <ul>
          <li>bidOrder: {company.bidOrder}</li>
          <li>name: {company.name}</li>
          <li>parValue: {company.parValue}</li>
          <li>revenue: {company.revenue}</li>
          <li>owningPlayerNumber: {company.owningPlayerNumber}</li>
          {displayBidMap(company.biddingPlayerNumberToAmountMap)}
        </ul>
      </div>
    )}
  </div>);
}

function displayMinorCompanies(minorCompanyMap: Map<string, MinorCompany>) {
  const companies = Object.values(minorCompanyMap);
  companies.sort((c1, c2) => c1.bidOrder - c2.bidOrder);

  return(
  <div>
    <h2>Minor Companies</h2>
    {companies.map((company) => 
      <div>
        <h3>shortName: {company.shortName}</h3>
        <ul>
          <li>bidOrder: {company.bidOrder}</li>
          <li>name: {company.name}</li>
          <li>parValue: {company.parValue}</li>
          <li>revenue: {company.revenue}</li>
          <li>owningPlayerNumber: {company.owningPlayerNumber}</li>
          {displayBidMap(company.biddingPlayerNumberToAmountMap)}
        </ul>
      </div>
    )}
  </div>);
}

function displayBidMap(bidMap: Map<string, number>) {
  const bids: [string, number][] = Object.entries(bidMap);
  bids.sort((b1, b2) => b1[1] - b2[1]);

  return(
  <div>
    <h4>bids</h4>
    {bids.map(([playerNumber, bidAmount]) =>
    <ul>
      <li>playerNumber: {playerNumber}</li>
      <li>bidAmount: {bidAmount}</li>
    </ul>
    )}
  </div>);
}

const mapStateToProps = (state: any) => {
  return {
    game: state.gameState.game,
    isLoading: state.gameState.isLoading,
    err: state.gameState.err
  }
};

export default connect(mapStateToProps)(GameComponent);
