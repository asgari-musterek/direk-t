import styled from 'styled-components'
import { color, space, typography, variant, compose, SpaceProps } from 'styled-system'

const H1 = styled.h1`
  line-height: 1.25;
  color: ${props=> props.theme.colors.primary};
  ${color};
  ${space};
  ${typography};
`

const mapper = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}
export function Heading(props){
  return <H1 as={mapper[props.level]} {...props}/>
}

Heading.defaultProps = {
  m: 2,
  level: 1,
}

type VariantProps = {
  variant: 'light'|'note'
}
const Text = styled.p<VariantProps&SpaceProps>`
  ${compose(color,space,typography)}
  ${variant({
    variants: {
      normal: {},
      light: {
        'font-weight': 300,
        color: 'light',
        fontSize: 0,      
      },
      note: {
        'font-weight': 'normal',
        color: 'dimmed',
        fontSize: 0,
      }
    }
  })}
`

Text.defaultProps = {
  m: 2,
}

export const Light = styled.p`
  font-weight: 300;
  color: ${props=> props.theme.colors.light};
  font-size: ${props=> props.theme.fontSizes[0]};
  ${color}
  ${space}
  ${typography}
`

export const Note = styled.p`
  font-weight: normal;
  color: ${props=> props.theme.colors.dimmed};
  font-size: ${props=> props.theme.fontSizes[0]};
  ${color}
  ${space}
  ${typography}
`

export const Body = styled.p`
  ${color}
  ${space}
  ${typography}
`

export default Text;
