import { LocationRepositoryInterface } from "./location-repository-interface"
import { DbClient } from "../db/db-client"

export class LocationRepository implements LocationRepositoryInterface {
  private readonly dbClient: DbClient

  constructor(dbClient: DbClient) {
    this.dbClient = dbClient
  }

  async addLedgerEntry(params: {
    fruitId: string
    locationId: string
    amount: number
  }) {
    const time = new Date()
    await this.dbClient.query(
      `
        INSERT INTO ledger (fruit_id, location_id, amount, time)
        VALUES ($1, $2, $3, $4)
      `,
      [params.fruitId, params.locationId, params.amount, time],
    )

    return {
      fruitId: params.fruitId,
      locationId: params.locationId,
      amount: params.amount,
      time,
    }
  }

  async getById(id: string) {
    const result = await this.dbClient.query(
      "SELECT id, name, headcount FROM location WHERE id = $1",
      [id],
    )

    if (result.length === 0) {
      return null
    }

    return {
      id: result[0].id,
      name: result[0].name,
      employees: result[0].headcount,
    }
  }
}
