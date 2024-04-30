import { Resolver } from "./resolver"
import { LocationRepositoryInterface } from "../repositories/location-repository-interface"
import { FruitRepositoryInterface } from "../repositories/fruit-repository-interface"

type Props = {
  params: {
    locationId?: string
    year?: string
  }
  fruitRepository: FruitRepositoryInterface
  locationRepository: LocationRepositoryInterface
}

type Data = {
  locationId: string
  year: string
  mostEatenFruit: {
    id: string
    name: string
    amount: number
  } | null
  averageEatenPerPerson: { amount: number }
}

export const statsResolver: Resolver<{ data: Data; props: Props }> = async ({
  fruitRepository,
  locationRepository,
  params,
}) => {
  if (params.locationId == null || params.year == null) {
    return {
      errors: [getRequestParamError()],
    }
  }

  const location = await locationRepository?.getById(params.locationId)
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

  const mostEatenFruit = await fruitRepository.getMostEatenFruit({
    locationId: params.locationId,
    year: params.year,
  })

  const averageAmount = await fruitRepository.getAverageAmountConsumed({
    locationId: params.locationId,
    year: params.year,
  })

  return {
    data: {
      locationId: params.locationId,
      year: params.year,
      mostEatenFruit,
      averageEatenPerPerson: averageAmount,
    },
  }
}

const getRequestParamError = () => {
  return {
    status: "400",
    title: "Bad Request",
    detail: `Query params "locationId" and "year" are required`,
  }
}
