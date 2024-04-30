import styled from "styled-components"

type Props = {
  bigStat: string
  label: string
  description: string
  imageSrc?: string
}

export const StatsCard = ({ bigStat, label, description, imageSrc }: Props) => {
  return (
    <Wrapper>
      <Info>
        <StatsWrapper>
          <BigStat>{bigStat}</BigStat>
          <Label>{label}</Label>
        </StatsWrapper>
        <Description>{description}</Description>
      </Info>

      {imageSrc != null && <Image src={imageSrc} width={1024} height={1024} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
  position: relative;
  isolation: isolate;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px;
  padding-right: 200px;
  position: absolute;
  z-index: 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`

const StatsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
`

const BigStat = styled.span`
  display: block;
  font-size: calc(46rem / 16);
  font-weight: 500;
  line-height: calc(40rem / 16);
`

const Label = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
`

const Description = styled.p`
  font-size: calc(14rem / 16);
  color: #666;
`

const Image = styled.img`
  width: 180px;
  height: 180px;
  margin-left: auto;
  position: relative;
  top: -20px;
  right: 8px;
  z-index: 1;
`
