import styled from 'styled-components'
import { typography, space } from 'styled-system'

const Wrapper = styled.button`
  padding: ${props => props.theme.space[2]};
  border: 0;
  background: transparent;
  font-size: 15px;
  vertical-align: middle;
  cursor: pointer;
  ${typography}
  ${space}
`

const IconWrapper = styled.span`
      display: inline-block;
    vertical-align: middle;
`

const Content = styled.span``

function Button(props) {
  const {icon, children, ...rest} = props
  return (
    <Wrapper color="main" {...rest}>
      <IconWrapper>{props.icon}</IconWrapper>
      <Content>{props.children}</Content>
    </Wrapper>
  )
}

export default Button
