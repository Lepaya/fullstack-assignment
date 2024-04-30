export interface FruitInfoGateway {
  getInfo(id: string): Promise<FruitInfo | null>
}

type FruitInfo = {
  calories: number
}
