export interface Currency {
    success: boolean;
    message: string;
    data: currencyList[];
  }
  
  export interface currencyList {
    id: number;
    name: string;
    code: string;
    symbol: string;
    isActive: boolean;
    createdBy: number;
    updatedBy: number;
    lastActionBy: string;
    lastActionOn: string;
  }
  