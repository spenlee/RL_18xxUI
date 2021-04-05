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

export interface Player {
  playerNumber: number;
  money: number;
}
