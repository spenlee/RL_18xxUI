export interface Game {
  _id: string,
  priorityDealPlayerNumber: number,
  currentPlayerTurn: number,
  hasGameEnded: boolean,
  winningPlayer: Player,
  consecutivePasses: number,
  playerMap: Map<string, Player>,
  bank: Bank,
  phase: string,
  roundType: string,
  roundNumber: number,
  playerCertificateLimit: number,
  privateCompanyMap: Map<string, PrivateCompany>,
  minorCompanyMap: Map<string, MinorCompany>,
  privateOffer: PrivateOffer,
  stockMarket: StockMarket,
  majorCompanyMap: Map<string, MajorCompany>,
}

export interface Bank {
  money: number;
}

export interface MinorCompany {
  companyType: string,
  name: string,
  shortName: string,
  parValue: number,
  revenue: number,
  owningPlayerNumber: number,
  biddingPlayerNumberToAmountMap: Map<string, number>,
  bidOrder: number
}

export interface PrivateCompany {
  companyType: string,
  name: string,
  shortName: string,
  parValue: number,
  revenue: number,
  owningPlayerNumber: number,
  biddingPlayerNumberToAmountMap: Map<string, number>,
  bidOrder: number
}

export interface PrivateOffer {
  fromPlayerNumber: number,
  toPlayerNumber: number,
  type: string,
  amount: number,
  privateCompanyName: string
}

export enum StockSlotColor {
  NONE = "NONE",
  YELLOW = "YELLOW",
}

export interface StockSlot {
  coordinate: Coordinate,
  price: number,
  color: StockSlotColor,
  isParValueSlot: boolean,
}

// chart coordinates
export interface Coordinate {
  row: number,
  column: number,
}

export interface StockMarket {
  // all the stock market slots that major companies populate
  // the key is the <row>;<column> of the 18MEX stock chart
  // the value is the ordered list of companies in that stock slot
	activeStockSlots: Map<string, string[]>;
  // major company short name to stock slot
  companyToStockSlotKey: Map<string, StockSlot>;
  // stock chart
  // top-left origin 2D grid, 0-index, positively increasing down the x and y axis
  chart: StockSlot[][];
}

export interface StockCertificates {
  twenty: number,
  ten: number,
  five: number,
}

export interface MajorCompany {
  name: string,
  shortName: string,
  parValue: number,
  money: number,
  hasFloated: boolean,
  lastRunRevenue: number,
  owningPlayerNumber: number,
  playerNumberToCertsOwned: Map<string, StockCertificates>,
  ipoCerts: StockCertificates,
  openMarketCerts: StockCertificates,
  reservedCerts: number,
}

export interface StockTurnState {
  hasBought: boolean;
  // short names of major companies sold in the stock turn
  majorCompaniesSold: string[];
  hasSoldPrivateCompany: boolean;
}

export interface Player {
  playerNumber: number;
  money: number;
	stockTurnState: StockTurnState;
  companyToCerts: Map<string, StockCertificates>;
}
