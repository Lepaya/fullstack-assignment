import { useOffices } from "../data-hooks/use-offices"
import { Select } from "../components/input/select"
import { useState } from "react"
import styled from "styled-components"
import { Button } from "../components/input/button"
import { StatsSection } from "./stats-section"
import { Spacer } from "../components/ui/spacer"
import { PurchaseFruitDialog } from "./purchase-fruit-dialog"
import { ArrowBendRightUp, Basket } from "@phosphor-icons/react"
import { Container } from "../components/ui/container"

const DashboardPage = () => {
  const { offices } = useOffices()
  const officeOptions = offices.map((office) => ({
    label: office.name,
    value: office.id,
  }))
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>()

  const [showAddFruitDialog, setShowAddFruitDialog] = useState(false)

  return (
    <Wrapper>
      <Container>
        <Header>
          <Logo
            width={512}
            height={512}
            src="/assets/images/chocolate-bar.png"
            alt="Chocolate bar"
          />

          <PageTitle>Chocolate Inc.</PageTitle>

          <div style={{ width: 140 }}>
            <Select
              label="Office"
              onChange={setSelectedOfficeId}
              options={officeOptions}
              placeholder="Office"
              value={selectedOfficeId}
            />
          </div>
        </Header>

        {selectedOfficeId == null && (
          <EmptyState>
            Start by selecting an office
            <Spacer w={8} />
            <ArrowBendRightUp size={24} />
            <Spacer w={64} />
          </EmptyState>
        )}
      </Container>

      <Spacer h={24} />

      <Container>
        <CallToActionWrapper>
          {selectedOfficeId != null && (
            <Button
              onClick={() => setShowAddFruitDialog(true)}
              icon={<Basket />}
            >
              Purchase fruit
            </Button>
          )}
        </CallToActionWrapper>
      </Container>

      {selectedOfficeId != null && (
        <>
          <StatsSection officeId={selectedOfficeId} />

          <PurchaseFruitDialog
            show={showAddFruitDialog}
            officeId={selectedOfficeId}
            onClose={() => setShowAddFruitDialog(false)}
          />
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 92px;
`

const Logo = styled.img`
  width: auto;
  height: 42px;
  flex-grow: 0;
  flex-shrink: 0;
`

const PageTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  margin-right: auto;
  font-size: calc(24rem / 16);
  font-family: "Pacifico", cursive;
  font-weight: 400;
  color: #652476;
`

const EmptyState = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  font-family: "Indie Flower", cursive;
  font-size: calc(18rem / 16);
`

const CallToActionWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default DashboardPage
