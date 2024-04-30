import { FruitInfoGateway } from "./fruit-info-gateway"

export class FruityviceGateway implements FruitInfoGateway {
  async getInfo(id: string) {
    const response = await fetch(`https://www.fruityvice.com/api/fruit/${id}`)

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return {
      calories: data?.nutritions?.calories ?? 0,
    }
  }
}
