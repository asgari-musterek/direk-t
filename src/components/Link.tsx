import React from 'react';
import NextLink from 'next/link'
import styled from 'styled-components';
import { color, space, typography  } from 'styled-system'

const Anchor = styled.a`
  display:inline-block;
  ${color};
  ${space};
  ${typography};
`

const Link = (props) => {
  const {href, children, ...rest} = props
  return props.href ? (<NextLink href={props.href}><Anchor href={props.href} {...rest}>{props.children}</Anchor></NextLink>) : (<Anchor {...rest}>{children}</Anchor>)
};

export default Link;