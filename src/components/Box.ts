import styled from 'styled-components'
import { compose, space, color, layout, grid, flex, GridProps, FlexProps, SpaceProps } from 'styled-system'

export const Card = styled.div<SpaceProps>(compose(space, color, layout))

export const Grid = styled.div<GridProps>`
  display: grid;
  ${grid}
`

export const Flexbox = styled.div<FlexProps>`
  display: flex;
  ${flex}
`
