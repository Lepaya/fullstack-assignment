import { config } from "../config"

export type PurchaseFruitProps = {
  fruitId: string
  officeId: string
  amount: number
}

export const purchaseFruit = async ({
  fruitId,
  officeId,
  amount,
}: PurchaseFruitProps): Promise<PurchaseFruitResult> => {
  const response = await fetch(config.api.url + `/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fruitId,
      locationId: officeId,
      amount,
    }),
  })

  const { data, errors } = await response.json()

  if (!response.ok) {
    throw new Error(errors[0].detail ?? "Network response was not ok")
  }

  return {
    fruitId: data.fruitId,
    officeId: data.locationId,
    amount: data.amount,
    time: new Date(data.time),
  }
}

type PurchaseFruitResult = {
  fruitId: string
  officeId: string
  amount: number
  time: Date
}
