import { ReactNode } from "react"
import * as RadixDialog from "@radix-ui/react-dialog"
import styled from "styled-components"
import { X } from "@phosphor-icons/react"
import { Spacer } from "./spacer"

type Props = {
  children: ReactNode
  onClose?: () => void
  open: boolean
  title: string
}

export const Dialog = ({ open, onClose, title, children }: Props) => {
  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Portal>
        <Overlay data-testid="dialog-overlay" />
        <Content onEscapeKeyDown={onClose} onInteractOutside={onClose}>
          <Title>{title}</Title>
          <Spacer h={16} />
          {children}
          <CloseButton onClick={onClose} data-testid="dialog-close-button">
            <X />
          </CloseButton>
        </Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

const Overlay = styled(RadixDialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Content = styled(RadixDialog.Content)`
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 32px;
  border-radius: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fef8f8;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`

const Title = styled(RadixDialog.Title)`
  margin: 0;
  font-size: calc(24rem / 16);
  font-weight: 500;
  font-family: "Indie Flower", cursive;
  letter-spacing: 0.7px;
`

const CloseButton = styled(RadixDialog.Close)`
  all: unset;
  padding: 8px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`
