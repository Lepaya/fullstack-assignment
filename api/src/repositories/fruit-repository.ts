import { FruitRepositoryInterface } from "./fruit-repository-interface"
import { DbClient } from "../db/db-client"
import { FruitInfoGateway } from "../gateways/fruit-info-gateway"

export class FruitRepository implements FruitRepositoryInterface {
  private readonly dbClient: DbClient
  private readonly fruitInfoGateway: FruitInfoGateway

  constructor(dbClient: DbClient, fruitInfoGateway: FruitInfoGateway) {
    this.dbClient = dbClient
    this.fruitInfoGateway = fruitInfoGateway
  }

  async getById(id: string) {
    const result = await this.dbClient.query(
      `
        SELECT fruityvice_id FROM fruit WHERE id = $1
      `,
      [id],
    )

    if (result.length === 0) {
      return null
    }

    const fruityId: number | null = result[0].fruityvice_id
    const fruitInfo = await this.fruitInfoGateway.getInfo(String(fruityId))
    const calories = fruitInfo?.calories ?? 0

    return { id, calories }
  }

  async getAverageAmountConsumed(params: { locationId: string; year: string }) {
    const result = await this.dbClient.query(
      `
        SELECT 
          SUM(ABS(CASE WHEN ledger.amount < 0 THEN ledger.amount ELSE 0 END)) 
            / CAST(location.headcount AS float) AS average_per_person
        FROM ledger
        JOIN location on ledger.location_id = location.id
        WHERE location.id = $1
          AND date_part('year', ledger.time) = $2
        GROUP BY ledger.location_id, location.headcount
        ORDER BY average_per_person desc
        LIMIT 1
      `,
      [params.locationId, params.year],
    )

    let amount = 0
    if (result.length > 0) {
      amount = Number(result[0].average_per_person)
    }

    return {
      amount,
    }
  }

  async getMostEatenFruit({
    locationId,
    year,
  }: {
    locationId: string
    year: string
  }) {
    const result = await this.dbClient.query(
      `
        SELECT 
          fruit.id AS fruit_id, 
          fruit.name AS fruit_name, 
          SUM(ABS(CASE WHEN ledger.amount < 0 THEN ledger.amount ELSE 0 END)) AS total_amount
        FROM fruit
        JOIN ledger ON cast(fruit.id as varchar) = ledger.fruit_id
        JOIN location on ledger.location_id = location.id
        WHERE location.id = $1
          AND date_part('year', ledger.time) = $2
        GROUP BY fruit.id, fruit.name
        ORDER BY total_amount desc
        LIMIT 1
      `,
      [locationId, year],
    )

    if (result.length === 0) {
      return null
    }

    return {
      id: String(result[0].fruit_id),
      name: result[0].fruit_name,
      amount: Number(result[0].total_amount),
    }
  }
}
