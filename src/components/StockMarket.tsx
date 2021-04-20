import { Card } from '@blueprintjs/core';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Game, StockSlot, StockSlotColor } from '../models';
import '../styles/stock_market.scss';


interface StockMarketState {
  game: Game,
};

class StockMarket extends Component<StockMarketState, any> {
  constructor(props: StockMarketState) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const chart = this.props.game.stockMarket.chart;

    return (
      <div className="stock-market-container">
        {chart.map((stockSlots) =>
          <div className="stock-market-row-container">
            {stockSlots.map((stockSlot) =>
              displayStockSlot(stockSlot)
            )}
          </div>
        )}
      </div>
    )
  }
}

function displayStockSlot(stockSlot: StockSlot) {
  let slotClassName = "";
  if (stockSlot.isParValueSlot) {
    slotClassName = "par-value-stock-slot";
  }

  if (stockSlot.color === StockSlotColor.YELLOW) {
    slotClassName = "limit-excluded-stock-slot";
  }

  if (stockSlot.price === 200) {
    return <Card className={`stock-slot-box ${slotClassName}`}>{stockSlot.price} Game Over</Card>
  }

  return <Card className={`stock-slot-box ${slotClassName}`}>{stockSlot.price}</Card>;
}

const mapStateToProps = (state: any) => {
  return {
  }
};

function mapDispatchToProps(dispatch: any) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockMarket);
