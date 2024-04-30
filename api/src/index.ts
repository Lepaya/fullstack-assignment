import express, { Request } from "express"
import { rootResolver } from "./resolvers/root-resolver"
import { statsResolver } from "./resolvers/stats-resolver"
import { config } from "./config"
import { LocationRepository } from "./repositories/location-repository"
import { FruitRepository } from "./repositories/fruit-repository"
import { PgClient } from "./db/pg-client"
import cors from "cors"
import bodyParser from "body-parser"
import { purchaseResolver } from "./resolvers/purchase-resolver"
import { FruityviceGateway } from "./gateways/fruityvice"

const app = express()
const pgClient = new PgClient(config.db)
const fruityviceGateway = new FruityviceGateway()
const fruitRepository = new FruitRepository(pgClient, fruityviceGateway)
const locationRepository = new LocationRepository(pgClient)

app.use(cors())
app.use(bodyParser.json())

app.get("/", async (_req, res) => {
  const response = await rootResolver({
    host: config.host,
  })

  res.json(response)
})

app.get(
  "/stats",
  async (
    req: Request<
      unknown,
      unknown,
      unknown,
      { locationId?: string; year?: string }
    >,
    res,
  ) => {
    const { locationId, year } = req.query

    const response = await statsResolver({
      params: {
        locationId,
        year,
      },
      fruitRepository,
      locationRepository,
    })

    const status =
      response.errors != null ? Number(response.errors[0].status) : 200
    res.status(status).json(response)
  },
)

app.post(
  "/purchase",
  async (
    req: Request<
      unknown,
      unknown,
      { fruitId?: string; locationId?: string; amount?: number }
    >,
    res,
  ) => {
    const { fruitId, locationId, amount } = req.body

    const response = await purchaseResolver({
      params: {
        fruitId,
        locationId,
        amount,
      },
      fruitRepository,
      locationRepository,
    })

    let status = 200
    if (response.errors != null && response.errors[0].status != null) {
      status = Number(response.errors[0].status)
    }
    res.status(status).json(response)
  },
)

app.listen(config.port, () => {
  console.log(`[server]: Server is running at http://localhost:${config.port}`)
})
