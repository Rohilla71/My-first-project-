export interface invoiceTermI {
    success: boolean
    message: string
    data: invoiceTermList[]
  }
  
  export interface invoiceTermList {
    id: number
    name: string
    description: string
    isactive: boolean
    lastActionBy: string
    lastActionOn: string
  }
  