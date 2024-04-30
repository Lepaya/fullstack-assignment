export interface LocationRepositoryInterface {
  addLedgerEntry(params: {
    fruitId: string
    locationId: string
    amount: number
  }): Promise<LedgerEntry>

  getById(id: string): Promise<OfficeLocation | null>
}

type OfficeLocation = {
  id: string
  name: string
  employees: number
}

type LedgerEntry = {
  fruitId: string
  locationId: string
  amount: number
  time: Date
}
