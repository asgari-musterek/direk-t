import { config } from 'dotenv'
config()
import Handlebars from 'handlebars'
import fs from 'fs'
import channel from './src/channel.json'
import episodes from './src/episodes.json'
import markdownToTxt from 'markdown-to-txt'

const feedTemplate = fs.readFileSync('./plop-templates/feed-xml.hbs', 'utf-8')
const template = Handlebars.compile(feedTemplate)

const join = (arr) => arr.join(', ')

function removeSpaces(value: string) {
  return value
    .replace(/ {2,}|\r+|\n+/gm, ' ')
    .replace(/ {2,}/g, ' ')
    .replace(/^ +| +$/g, '')
}
function getEpisodeDescription(episodeKey) {
  const content = fs.readFileSync(`./src/episodes/${episodeKey}.md`, 'utf-8')
  const [description, extra] = content.split(/-{5,}/)
  return removeSpaces(markdownToTxt(description))
}
Handlebars.registerHelper('join', join)
Handlebars.registerHelper('description', getEpisodeDescription)

fs.writeFileSync(
  './public/feed.xml',
  template({
    channel: channel,
    baseURL: process.env.NEXT_PUBLIC_URL,
    cdnURL: process.env.NEXT_PUBLIC_CDN_URL,
    episodes: episodes,
  }),
)
console.log('done')
