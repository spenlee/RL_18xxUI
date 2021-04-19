import { Card } from "@blueprintjs/core";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Bank, Game, MajorCompany, MinorCompany, Player, PrivateCompany, StockCertificates } from "../models/index";
import '../styles/game.scss';
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
    return (
      <div className="bp3-dark game-div">
        <div className="container">
          <h1>Game</h1>
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
      </div>
    )
  }
}

function displayGame(game: Game) {
  return (
    <div>
      {displayGameStatus(game)}
      {displayPlayers(game.playerMap)}
      {displayPrivateCompanies(game.privateCompanyMap)}
      {displayMinorCompanies(game.minorCompanyMap)}
      {displayMajorCompanies(game.majorCompanyMap)}
      {displayActions(game)}
    </div>);
}

function displayGameStatus(game: Game) {
  return (
    <div className="row-container">
      <Card className="info-box">
        <div>
          <h2>Game ID: {game._id}</h2>
          {game.hasGameEnded
            ?
            <div>
              <div>Game completed</div>
              <div>Winner: {String(game.winningPlayer)}</div>
              <div>Round: {game.roundType}</div>
              {game.roundType === "OPERATING" && <div>Round Number: {game.roundNumber}</div>}
              <div>Phase: {game.phase}</div>
            </div>
            :
            <div>
              <div>Game in progress</div>
              <div>Priority Deal: {game.priorityDealPlayerNumber}</div>
              <div>Current Player: {game.currentPlayerTurn}</div>
              <div>Consecutive Passes: {game.consecutivePasses}</div>
              <div>Round: {game.roundType}</div>
              {game.roundType === "OPERATING" && <div>Round Number: {game.roundNumber}</div>}
              <div>Phase: {game.phase}</div>
              <div>Total Certificate Limit: {game.playerCertificateLimit}</div>
            </div>
          }
        </div>
      </Card>
      <Card className="info-box">
        {displayBank(game.bank)}
      </Card>
    </div>);
}

function displayBank(bank: Bank) {
  return (
    <div>
      <h2>Bank</h2>
      <div>Money: {bank.money}</div>
    </div>
  );
}

function displayPlayers(playerMap: Map<string, Player>) {
  const players = Object.values(playerMap);
  players.sort((p1, p2) => p1.playerNumber - p2.playerNumber);

  return (
    <div>
      <h1>Players</h1>
      <div className="row-container">
        {players.map((player) =>
          <Card className="info-box">
            <div>
              <h2>Player: {player.playerNumber}</h2>
              <div>Money: {player.money}</div>
              <div>Has Bought Certificate: {String(player.stockTurnState.hasBought)}</div>
              <div>Sold Companies: {JSON.stringify(player.stockTurnState.majorCompaniesSold)}</div>
              <div>Has Sold Private Company: {String(player.stockTurnState.hasSoldPrivateCompany)}</div>
              <div>Certs Owned: {JSON.stringify(player.companyToCerts)}</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function displayPrivateCompanies(privateCompanyMap: Map<string, PrivateCompany>) {
  const companies = Object.values(privateCompanyMap);
  companies.sort((c1, c2) => c1.bidOrder - c2.bidOrder);

  return (
    <div>
      <h1>Private Companies</h1>
      <div className="row-container">
        {companies.map((company) =>
          <Card className="info-box">
            <div>
              <h2>{company.shortName}</h2>
              <h3>{company.name}</h3>
              <div>Bid Order: {company.bidOrder}</div>
              <div>Price: {company.parValue}</div>
              <div>Revenue: {company.revenue}</div>
              <div>{company.owningPlayerNumber === -1 ? "For sale" : `Owner: ${company.owningPlayerNumber}`}</div>
              {displayBidMap(company.biddingPlayerNumberToAmountMap)}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function displayMinorCompanies(minorCompanyMap: Map<string, MinorCompany>) {
  const companies = Object.values(minorCompanyMap);
  companies.sort((c1, c2) => c1.bidOrder - c2.bidOrder);

  return (
    <div>
      <h1>Minor Companies</h1>
      <div className="row-container">
        {companies.map((company) =>
          <Card className="info-box">
            <div>
              <h2>{company.shortName}</h2>
              <h3>{company.name}</h3>
              <div>Bid Order: {company.bidOrder}</div>
              <div>Price: {company.parValue}</div>
              <div>Revenue: {company.revenue}</div>
              <div>{company.owningPlayerNumber === -1 ? "For sale" : `Owner: ${company.owningPlayerNumber}`}</div>
              {displayBidMap(company.biddingPlayerNumberToAmountMap)}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function displayBidMap(bidMap: Map<string, number>) {
  // player number to bid amount
  const bids: [string, number][] = Object.entries(bidMap);
  bids.sort((b1, b2) => b1[1] - b2[1]);

  return (
    <div>
      {bids.length > 0
        ?
        <div>
          <h3>Bids</h3>
          {bids.map(([playerNumber, bidAmount]) =>
            <div>
              <div>Player: {playerNumber}</div>
              <div>Bid: {bidAmount}</div>
            </div>
          )}
        </div>
        :
        <div>No bids</div>
      }
    </div>
  );
}

function displayMajorCompanies(majorCompanyMap: Map<string, MajorCompany>) {
  const companies = Object.values(majorCompanyMap);
  companies.sort((c1, c2) => c1.parValue - c2.parValue);

  return (
    <div>
      <h1>Major Companies</h1>
      <div className="row-container">
        {companies.map((company) =>
          <Card className="info-box">
            <div>
              <h2>{company.shortName}</h2>
              <h3>{company.name}</h3>
              {company.owningPlayerNumber === -1
                ? "Unowned"
                : `President: ${company.owningPlayerNumber}`}
              <div>Money: {company.money}</div>
              <div>Par Value: {company.parValue}</div>
              <div>{company.hasFloated ? "Floated" : "Not Floated"}</div>
              <div>Last Run Revenue: {company.lastRunRevenue}</div>
              <div>Invested Players: {JSON.stringify(company.playerNumberToCertsOwned)}</div>
              {(company.ipoCerts.twenty > 0 || company.ipoCerts.ten > 0 || company.ipoCerts.five > 0)
                &&
                <div>
                  <h3>IPO Certs:</h3>
                  {displayStockCertificates(company.ipoCerts)}
                </div>
              }
              {(company.openMarketCerts.twenty > 0 || company.openMarketCerts.ten > 0 || company.openMarketCerts.five > 0)
                &&
                <div>
                  <h3>Open Market Certs:</h3>
                  {displayStockCertificates(company.openMarketCerts)}
                </div>
              }
              {company.reservedCerts > 0 && <div>Reserved Certs: {company.reservedCerts}</div>}
              <div>Last Run Revenue: {company.lastRunRevenue}</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function displayStockCertificates(stockCerts: StockCertificates) {
  return (
    <div>
      {stockCerts.twenty > 0 && <div>President Cert: {stockCerts.twenty}</div>}
      {stockCerts.ten > 0 && <div>10% Cert: {stockCerts.ten}</div>}
      {stockCerts.five > 0 && <div>5% Cert: {stockCerts.five}</div>}
    </div>
  );
}

function displayActions(game: Game) {
  const shouldDisplayAuctionActions = game.roundType === "AUCTION" || game.roundType === "PRIVATE_AUCTION";
  return (
    <div>
      <h1>Actions</h1>
      <div className="row-container">
        <Card className="info-box">
          {shouldDisplayAuctionActions && <AuctionBid game={game} />}
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    game: state.gameState.game,
    isLoading: state.gameState.isLoading,
    err: state.gameState.err
  }
};

export default connect(mapStateToProps)(GameComponent);
