export interface FruitRepositoryInterface {
  getAverageAmountConsumed(params: {
    locationId: string
    year: string
  }): Promise<{ amount: number }>

  getById(id: string): Promise<Fruit | null>

  getMostEatenFruit(params: { locationId: string; year: string }): Promise<{
    id: string
    name: string
    amount: number
  } | null>
}

type Fruit = {
  id: string
  calories: number
}
