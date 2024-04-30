import { config } from "../config"

type Props = {
  locationId: string
  year: string
}

export const getStats = async ({
  locationId,
  year,
}: Props): Promise<StatsData> => {
  const url = new URL(config.api.url + `/stats`)
  url.searchParams.append("locationId", locationId)
  url.searchParams.append("year", year)

  const response = await fetch(url.href)

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const { data } = await response.json()

  return data
}

export type StatsData = {
  locationId: string
  year: string
  mostEatenFruit: {
    id: string
    name: string
    amount: number
  } | null
  averageEatenPerPerson: {
    amount: number
  }
}
