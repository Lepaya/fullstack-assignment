import styled from "styled-components"

type Props = {
  disabled?: boolean
  label?: string
  min?: number
  onChange?: (value: string) => void
  type?: "text" | "number"
  value?: string
}

export const TextInput = ({
  disabled = false,
  label,
  min,
  onChange,
  type = "text",
  value = "",
}: Props) => {
  return (
    <Wrapper>
      <Label>{label}</Label>

      <Input
        disabled={disabled}
        min={min}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={onChange == null}
        type={type}
        value={value}
      />
    </Wrapper>
  )
}

const Wrapper = styled.label`
  width: 100%;
`

const Label = styled.span`
  font-size: calc(14rem / 16);
  color: #ce4178;
`

const Input = styled.input`
  width: 100%;
  padding: 6px 10px 6px 14px;
  border: 1px solid #ce4178;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 400;
  color: #ce4178;
  background-color: rgba(255, 255, 255, 0.2);

  &:focus {
    outline-offset: 6px;
    outline-color: var(--line-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
