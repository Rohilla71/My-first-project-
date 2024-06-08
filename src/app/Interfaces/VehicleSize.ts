export interface VehicleSizeI {
    success: boolean
    message: string
    data: VehicleSizeList[]
  }
  
  export interface VehicleSizeList {
    id: number
    name: string
    description: string
    sizeInSqft: number
    height: number
    width: number
    length: number
    isActive: boolean
    lastActionBy: any
    lastActionOn: string
  }
  