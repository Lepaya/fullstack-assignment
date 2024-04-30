import { FruitRepositoryInterface } from "../repositories/fruit-repository-interface"
import { LocationRepositoryInterface } from "../repositories/location-repository-interface"
import { Resolver } from "./resolver"

type Props = {
  params: {
    fruitId?: string
    locationId?: string
    amount?: number
  }
  fruitRepository: FruitRepositoryInterface
  locationRepository: LocationRepositoryInterface
}

type Data = {
  fruitId: string
  locationId: string
  amount: number
  time: Date
}

const MAX_CALORIES = 1_000_000 // 1000kcal

export const purchaseResolver: Resolver<{ data: Data; props: Props }> = async ({
  params,
  fruitRepository,
  locationRepository,
}: Props) => {
  if (
    params.amount == null ||
    params.fruitId == null ||
    params.locationId == null
  ) {
    return {
      errors: [
        {
          status: "400",
          title: "Bad Request",
          detail: `Body params "fruitId", "locationId" and "amount" are required`,
        },
      ],
    }
  }

  if (params.amount <= 0) {
    return {
      errors: [
        {
          status: "400",
          title: "Bad Request",
          detail: `Amount must be at least 1`,
        },
      ],
    }
  }

  const fruit = await fruitRepository.getById(params.fruitId)
  if (fruit == null) {
    return {
      errors: [
        {
          status: "404",
          title: "Not Found",
          detail: `Fruit with id "${params.fruitId}" not found`,
        },
      ],
    }
  }

  const location = await locationRepository.getById(params.locationId)
  if (location == null) {
    return {
      errors: [
        {
          status: "404",
          title: "Not Found",
          detail: `Location with id "${params.locationId}" not found`,
        },
      ],
    }
  }

  if (fruit.calories * params.amount > MAX_CALORIES) {
    const maxAmount = Math.floor(MAX_CALORIES / fruit.calories)
    return {
      errors: [
        {
          status: "400",
          title: "Bad Request",
          detail: `Total calories cannot exceed ${MAX_CALORIES}. Max amount of this fruit is ${maxAmount}.`,
        },
      ],
    }
  }

  const ledgerEntry = await locationRepository.addLedgerEntry({
    locationId: params.locationId,
    fruitId: params.fruitId,
    amount: params.amount,
  })

  return { data: ledgerEntry }
}
