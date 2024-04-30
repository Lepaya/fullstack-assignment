import { Select } from "../components/input/select"
import { TextInput } from "../components/input/text-input"
import { Dialog } from "../components/ui/dialog"
import { Button } from "../components/input/button"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Spacer } from "../components/ui/spacer"
import { useFruit } from "../data-hooks/use-fruit"
import { WarningCircle } from "@phosphor-icons/react"
import { usePurchase } from "../data-hooks/use-purchase"

type Props = {
  show: boolean
  officeId: string
  onClose: () => void
}

export const PurchaseFruitDialog = ({ show, officeId, onClose }: Props) => {
  const [selectedFruitId, setSelectedFruitId] = useState<string>()
  const [quantity, setQuantity] = useState("0")
  const { fruit } = useFruit()
  const fruitOptions = fruit.map((fruit) => ({
    value: fruit.id,
    label: fruit.name,
  }))
  const {
    purchase,
    isPurchasing,
    isPurchasingSuccess,
    purchasingError,
    reset,
  } = usePurchase()

  const canSubmit = selectedFruitId != null && parseInt(quantity) > 0
  const inputDisabled = isPurchasing || isPurchasingSuccess

  const handleClose = useCallback(() => {
    setSelectedFruitId(undefined)
    setQuantity("0")
    reset()
    onClose()
  }, [onClose, reset])

  const handlePurchase = () => {
    if (!canSubmit) return
    purchase({
      officeId,
      fruitId: selectedFruitId,
      amount: parseInt(quantity),
    })
  }

  useEffect(() => {
    if (!isPurchasingSuccess) return

    const timeout = setTimeout(() => {
      handleClose()
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isPurchasingSuccess, handleClose])

  return (
    <Dialog open={show} onClose={handleClose} title="Purchase fruit">
      <InputRow>
        <Select
          disabled={inputDisabled}
          label="Fruit"
          onChange={setSelectedFruitId}
          options={fruitOptions}
          placeholder="Which fruit?"
          showLabel
          value={selectedFruitId}
        />

        <TextInput
          disabled={inputDisabled}
          label="Amount"
          type="number"
          value={quantity}
          onChange={setQuantity}
          min={0}
        />
      </InputRow>

      <Spacer h={32} />

      {purchasingError != null && (
        <>
          <ErrorMessage>
            <div style={{ flexShrink: 0 }}>
              <WarningCircle size={18} />
            </div>
            <Spacer w={8} />
            {purchasingError.message}
          </ErrorMessage>

          <Spacer h={32} />
        </>
      )}

      {!isPurchasingSuccess && (
        <Submit disabled={!canSubmit || inputDisabled} onClick={handlePurchase}>
          {isPurchasing ? "Purchasing..." : "Purchase"}
        </Submit>
      )}

      {isPurchasingSuccess && <Success>Purchase successful!</Success>}
    </Dialog>
  )
}

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 8px;
  }
`

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid red;
  border-radius: 6px;
  color: red;
`

const Submit = styled(Button)`
  margin-left: auto;
`

const Success = styled.div`
  font-weight: bold;
  color: green;
`
