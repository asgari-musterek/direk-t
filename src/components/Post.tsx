import 'react-h5-audio-player/lib/styles.css'
import { border } from 'styled-system'
import { Heading, Text, Button, Grid, Link, Card, Markdown } from './index'
import styled from 'styled-components'

type Props = {
  title: string
  url: string
  pubDate: Date
  author: string[]
  content: string
  onPlay: (link: string) => void
}

const Img = styled.img`
  border: 1px solid;
  width: 150px;
  height: 150px;
  border: 1px solid ${props=> props.theme.colors.primary};
  ${border}
`

export default function Post(props: Props) {
  return (
    <div>
      <Grid gridTemplateColumns={'auto 1fr'}>
        <Card>
          <Img src="/logo.jpg" />
        </Card>
        <Card ml={4}>
          <Heading>{props.title}</Heading>
          <Text variant="light">{new Date(props.pubDate).toDateString()}</Text>
          <Card>
            <Text variant="note">
              Katilimcilar:{' '}
              {props.author.map((author, i) => (
                <Link key={i} mr={2}>
                  {author}
                </Link>
              ))}
            </Text>
          </Card>
          <div>
            <Link href={props.url}>
              <Button icon={<img src="/download.svg" alt="download" />}>Download</Button>
            </Link>
            <Button onClick={() => props.onPlay(props.url)} icon={<img src="/play.svg" alt="play" />}>
              Play
            </Button>
          </div>
        </Card>
      </Grid>
      <Markdown content={props.content} />
    </div>
  )
}