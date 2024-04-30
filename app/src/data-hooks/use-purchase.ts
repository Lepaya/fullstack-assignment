import { PurchaseFruitProps } from "../api/purchase-fruit"
import { useMutation } from "@tanstack/react-query"
import { api } from "../api"

type HookResult = {
  isPurchasing: boolean
  isPurchasingSuccess: boolean
  purchase: (props: PurchaseFruitProps) => void
  purchasingError: Error | null
  reset: () => void
}

export const usePurchase = (): HookResult => {
  const { isPending, isSuccess, error, mutate, reset } = useMutation({
    mutationFn: api.purchaseFruit,
  })

  return {
    isPurchasing: isPending,
    isPurchasingSuccess: isSuccess,
    purchase: (props) => mutate(props),
    purchasingError: error,
    reset,
  }
}
