import episodes from '../../episodes.json'
import { Post } from '../../components'
import { Episode } from '../../types'

type Props = {
  episode: Episode
  content: string
  setPlayerUrl: (url: string) => void
}
export default function EpisodePage(props: Props) {
  if (!props.episode) return null
  return (
    <Post
      title={props.episode.title}
      url={`${process.env.NEXT_PUBLIC_CDN_URL}${props.episode.filename}`}
      pubDate={new Date(props.episode.pubDate)}
      author={props.episode.authors}
      content={props.content}
      onPlay={props.setPlayerUrl}
    />
  )
}

export async function getStaticProps({ params }) {
  const ep = episodes.find((ep) => ep.key === params.ekey)
  const content = await import(`../../episodes/${ep.key}.md`).then((module) => module.default)
  return { props: { episode: ep, content } }
}

export async function getStaticPaths() {
  return {
    paths: episodes.map((ep) => ({ params: { ekey: ep.key } })),
    fallback: false,
  }
}
