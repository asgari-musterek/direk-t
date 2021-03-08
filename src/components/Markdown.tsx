import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { space } from 'styled-system'
import { Heading, Text, Link } from './index'
import gfm from 'remark-gfm'

const Wrapper = styled('div')(space)

const renderers: { [key: string]: any } = {
  heading: (props) => <Heading {...props} />,
  paragraph: (props) => <Text {...props} />,
  link: (props) => <Link {...props} />,
}
function Markdown(props) {
  const { children, content, ...rest } = props
  return (
    <Wrapper {...rest}>
      <ReactMarkdown plugins={[gfm]} renderers={renderers}>
        {content}
      </ReactMarkdown>
    </Wrapper>
  )
}

export default Markdown
