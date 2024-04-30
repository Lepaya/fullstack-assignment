import styled from "styled-components"
import { ReactElement } from "react"
import { IconContext } from "@phosphor-icons/react"

type Props = {
  children: string
  className?: string
  disabled?: boolean
  icon?: ReactElement
  onClick?: () => void
}

export const Button = ({
  children,
  className,
  disabled = false,
  icon,
  onClick,
}: Props) => {
  return (
    <Wrapper className={className} disabled={disabled} onClick={onClick}>
      <IconContext.Provider value={{ size: 24, weight: "light" }}>
        {icon}
      </IconContext.Provider>

      {children}
    </Wrapper>
  )
}

const Wrapper = styled.button`
  --background-color: #852d95;

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 12px;
  font-size: calc(18rem / 16);
  color: white;
  background-color: var(--background-color);

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.25;
  }

  &:focus {
    outline-offset: 4px;
    outline-color: var(--background-color);
  }
`
