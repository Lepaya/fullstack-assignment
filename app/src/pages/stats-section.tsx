import { Select } from "../components/input/select"
import { StatsCard } from "../components/data/stats-card"
import { ArrowBendRightUp } from "@phosphor-icons/react"
import { useState } from "react"
import styled from "styled-components"
import { Spacer } from "../components/ui/spacer"
import { Container } from "../components/ui/container"
import { useStats } from "../data-hooks/use-stats"

type Props = {
  officeId: string
}

export const StatsSection = ({ officeId }: Props) => {
  const [selectedYear, setSelectedYear] = useState<string>()
  const { availableYears, stats } = useStats({ officeId, year: selectedYear })
  const yearOptions = availableYears.map((year) => ({
    value: year,
    label: year,
  }))

  return (
    <Wrapper
      style={{
        "--backgroundColor": "#fef8f8",
      }}
    >
      <Wave
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="var(--backgroundColor)"
          d="M0,128L60,133.3C120,139,240,149,360,133.3C480,117,600,75,720,85.3C840,96,960,160,1080,176C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </Wave>

      <Container>
        <TitleWrapper>
          <SectionTitle>Statistics</SectionTitle>

          <div style={{ width: 140 }}>
            <Select
              label="Year"
              onChange={setSelectedYear}
              options={yearOptions}
              placeholder="Year"
              value={selectedYear}
            />
          </div>
        </TitleWrapper>

        {selectedYear == null && (
          <>
            <Spacer h={22} />

            <EmptyState>
              Select a year to see some stats
              <Spacer w={8} />
              <ArrowBendRightUp size={24} />
              <Spacer w={64} />
            </EmptyState>
          </>
        )}

        {stats.isLoading && (
          <>
            <Spacer h={22} />

            <Loading>Loading stats...</Loading>
          </>
        )}

        <div
          style={{
            filter: stats.isOldData ? "blur(2px)" : "none",
          }}
        >
          {stats.data?.averageEatenPerPerson != null && (
            <>
              <Spacer h={16} />

              <StatsCard
                bigStat={String(stats.data.averageEatenPerPerson.amount)}
                label="Avg"
                description="Pieces of fruit eaten per person"
                imageSrc="/assets/images/fruit-basket.png"
              />
            </>
          )}

          {stats.data?.mostEatenFruit != null && (
            <>
              <Spacer h={16} />

              <StatsCard
                bigStat={String(stats.data.mostEatenFruit.amount)}
                label={stats.data.mostEatenFruit.name}
                description="Most popular fruit"
                imageSrc={
                  fruitStickerMap[stats.data.mostEatenFruit.name.toLowerCase()]
                }
              />
            </>
          )}
        </div>
      </Container>

      <Spacer h={42} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  --wave-height: 230px;

  flex: 1;
  margin-top: var(--wave-height);
  background-color: var(--backgroundColor);
  animation: contentFadeIn 200ms cubic-bezier(0.16, 1, 0.3, 1);

  @media (prefers-reduced-motion: no-preference) {
    animation: contentSlideIn 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes contentFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentSlideIn {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const fruitStickerMap: Record<string, string> = {
  lime: "/assets/images/lime.png",
  tangerine: "/assets/images/tangerine.png",
  apple: "/assets/images/apple.png",
  mango: "/assets/images/mango.png",
  plum: "/assets/images/plum.png",
  pineapple: "/assets/images/pineapple.png",
  kiwi: "/assets/images/kiwi.png",
  pear: "/assets/images/pear.png",
}

const Wave = styled.svg`
  width: 100%;
  height: var(--wave-height);
  margin-top: calc(-1 * var(--wave-height));
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -62px;
`

const SectionTitle = styled.h1`
  font-size: calc(32rem / 16);
  font-weight: bold;
  font-family: "Indie Flower", cursive;
  letter-spacing: 0.7px;
`

const EmptyState = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  font-size: calc(18rem / 16);
  font-family: "Indie Flower", cursive;
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  font-size: calc(18rem / 16);
  font-family: "Indie Flower", cursive;
`
