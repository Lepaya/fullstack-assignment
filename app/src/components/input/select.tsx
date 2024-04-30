import styled from "styled-components"
import * as RadixSelect from "@radix-ui/react-select"
import { CaretDown } from "@phosphor-icons/react"

type Props = {
  disabled?: boolean
  label?: string
  onChange?: (value: string) => void
  options?: { value: string; label: string }[]
  placeholder?: string
  showLabel?: boolean
  value?: string
}

export const Select = ({
  disabled = false,
  label,
  onChange,
  options = [],
  placeholder,
  showLabel = false,
  value = "",
}: Props) => {
  const selectedOption = options.find((option) => option.value === value)
  const lineColor = "#ce4178"

  return (
    <RadixSelect.Root onValueChange={onChange} value={value}>
      <TriggerWrapper>
        {showLabel && <Label>{label}</Label>}

        <Trigger
          aria-label={label}
          style={{
            "--line-color": lineColor,
          }}
          disabled={disabled}
        >
          <RadixSelect.Value placeholder={placeholder}>
            {selectedOption?.label ?? value}
          </RadixSelect.Value>
          <RadixSelect.Icon style={{ flexShrink: 0 }}>
            <CaretDown color={lineColor} size={18} />
          </RadixSelect.Icon>
        </Trigger>
      </TriggerWrapper>

      <RadixSelect.Portal>
        <RadixSelect.Content position="popper">
          <ItemsWrapper>
            {options.map(({ label, value }) => (
              <Item key={value} value={value}>
                {label}
              </Item>
            ))}
          </ItemsWrapper>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

const TriggerWrapper = styled.div`
  width: 100%;
`

const Label = styled.div`
  font-size: calc(14rem / 16);
  color: #ce4178;
`

const Trigger = styled(RadixSelect.Trigger)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 10px 6px 14px;
  gap: 8px;
  border: 1px solid var(--line-color);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 400;
  color: #ce4178;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;

  &:focus {
    outline-offset: 6px;
    outline-color: var(--line-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

const ItemsWrapper = styled(RadixSelect.Viewport)`
  width: var(--radix-select-trigger-width);
  padding: 12px 12px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Item = styled(RadixSelect.Item)`
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }

  &:focus {
    outline-offset: 2px;
    outline-color: #ce4178;
  }
`
