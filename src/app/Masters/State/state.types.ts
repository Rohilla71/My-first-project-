export interface State {
  success: boolean;
  message: string;
  data: StateList[];
}

export interface StateList {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  gstCode: any;
  latitude: string;
  longitude: string;
  lastActionBy: string;
  lastActionOn: string;
  createdBy: number;
  updatedBy: number;
  country: CountryI;
}

export interface CountryI {
  id: number;
  name: string;
  code: string;
  callingCode: string;
  currencyId: number;
  isActive: boolean;
  capital: string;
  latitude: string;
  longitude: string;
  timeZone: string;
  flagEmoji: string;
  nationality: string;
  createdBy: number;
  updatedBy: number;
  lastActionBy: any;
  lastActionOn: string;
}
