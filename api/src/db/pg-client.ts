import { DbClient } from "./db-client"
import { Client } from "pg"

type Config = {
  host: string
  port: number
  database: string
  user: string
  password: string
}

export class PgClient implements DbClient {
  private readonly client: Client
  private isConnected: boolean = false

  constructor(config: Config) {
    this.client = new Client(config)
  }

  async connect() {
    if (this.isConnected) return

    try {
      await this.client.connect()
      this.isConnected = true
    } catch (error) {
      console.error(error)
    }
  }

  async query(query: string, params: (string | number)[]) {
    let result
    await this.connect()

    try {
      const { rows } = await this.client.query(query, params)
      result = rows
    } catch (error) {
      console.error(error)
    }

    return result ?? []
  }
}
