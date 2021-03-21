import ID3Writer from 'browser-id3-writer'
import { formatRFC7231 } from "date-fns";
import { remove as removeDiacritics } from 'diacritics';
import paramCase from "param-case";
import channel from './src/channel.json'
import episodes from './src/episodes.json'
import { getYear } from 'date-fns'
import fs from 'fs'
import getMP3Duration from 'get-mp3-duration'
import { resolve } from 'path';

export const genKey = (val: string) => paramCase(removeDiacritics(val))
function generateFilename(title: string, order:number){
    const key = genKey(title)
    return `${order> 99 ? order : ('00'+order).substr(-3)}-${key}.mp3`
  }

type Data = {
  title: string
  authors: string[]
  path: string
  pubDate: Date
}

const getNextOrder = () => (Math.max(...episodes.map(ep => ep.order)) ?? 0) + 1

export function genMp3(data: Data, config, plop) {
  const order = getNextOrder()
  const fileName = generateFilename(data.title, order)
  const songBuffer = fs.readFileSync(data.path)
  const writer = new ID3Writer(songBuffer)
  writer
    .setFrame('TIT2', data.title)
    .setFrame('TPE1', data.authors)
    .setFrame('TALB', channel.title)
    .setFrame('TCON', ['Podcast'])
    .setFrame('TYER', getYear(data.pubDate))
    .setFrame('APIC', {
      type: 3,
      data: fs.readFileSync('./public/logo.jpg'),
      description: data.title,
    })
  writer.addTag()

  const taggedSongBuffer = Buffer.from(writer.arrayBuffer)
  fs.writeFileSync(resolve('./public/eps', fileName), taggedSongBuffer)
  return 'Mp3 file created and tagged'
}

export function transformEpisodeFile(fileContents: string, data: Data){
  const order = getNextOrder()
  const isFirstEntry = fileContents.indexOf('{') > 0
  const file = fs.readFileSync(data.path)
  const time = new Date(0)
  time.setMilliseconds(getMP3Duration(file))

  const newContent = fileContents.replace(/[ \n]*\][ /n]*$/, `${(isFirstEntry ? ',' : '')}
  {
    "authors": [${data.authors.map((author,i)=>(`
      "${author}"${i === data.authors.length-1 ? '' : ','}`)).join('')}
    ],
    "title": "${data.title}",
    "pubDate": "${formatRFC7231(data.pubDate)}",
    "fileSize": "${file.byteLength}",
    "duration": "${time.toISOString().substr(11, 8)}",
    "key": "${genKey(data.title)}",
    "filename": "${generateFilename(data.title, order)}",
    "order": ${order},
    "guid": "EP${order}_${Math.random().toString(36).slice(6)}"
  }
]`)
  return newContent;
}