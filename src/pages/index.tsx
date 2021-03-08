import episodes from '../episodes.json'
import Link from 'next/link'

type Props = {
  episodes: any[]
}
export default function Home(props:Props){
  return <div>
    {props.episodes.map((ep,i)=> (<div key={i}><Link href={`/episodes/${ep.key}`}><a>{ep.title}</a></Link></div>))}
  </div>
}

export async function getStaticProps(){
  return {props: {episodes}}
}
