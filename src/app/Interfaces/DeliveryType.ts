export interface DeliveryTypeI {
    success: boolean;
    message: string;
    data: DeliveryTypeList[];
  }
  
  export interface DeliveryTypeList {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    lastActonBy: any;
    lastActionOn: string;
  }
  