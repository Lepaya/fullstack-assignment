import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { api } from "../api"
import { StatsData } from "../api/get-stats"

type Props = {
  officeId?: string
  year?: string
}

type HookResult = {
  availableYears: string[]
  stats: {
    data: StatsData | null
    isLoading: boolean
    isOldData: boolean
  }
}

export const useStats = ({ officeId, year }: Props): HookResult => {
  const [shouldFetchStats, setShouldFetchStats] = useState(false)
  const {
    data: statsData,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["stats", { locationId: officeId, year }],
    queryFn: () =>
      api.getStats({ locationId: officeId ?? "", year: year ?? "" }),
    enabled: shouldFetchStats && officeId != null && year != null,
    placeholderData: keepPreviousData,
  })

  const availableYears = [
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ]

  return {
    availableYears,
    get stats() {
      if (!shouldFetchStats) {
        setShouldFetchStats(true)
      }

      return {
        data: statsData ?? null,
        isLoading,
        isOldData: isPlaceholderData,
      }
    },
  }
}
