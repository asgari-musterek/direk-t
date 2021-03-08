const inquirer = require("inquirer");

const paramCase = require("param-case");
const { formatRFC7231 } = require("date-fns");
const Handlebars = require("handlebars");
const removeDiacritics = require('diacritics').remove;

require('dotenv').config()
inquirer.registerPrompt("date", require("inquirer-date-prompt"));

const channel = require('./src/channel.json')
const episodes = require('./src/episodes.json')
const genKey = aString => paramCase(removeDiacritics(aString))
Handlebars.registerHelper('genKey', genKey)


function generateFilename(title, order){
  const key = genKey(title)
  return `${order> 99 ? order : ('00'+order).substr(-3)}-${key}.mp3`
}

module.exports = function (plop) {
  plop.setGenerator('episode', {
    description: 'Create an episode for podcast',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the episode?',
        default: 'Untitled'
      },
      {
        type: 'checkbox',
        name: 'authors',
        message: 'Who participated?',
        choices: channel.authors.map(a =>({ name: a, value: a, checked: true})),
      },
      {
        type: 'input',
        name: 'fileSize',
        message: 'File size of the mp3 file in bytes:',
        default: '1024'
      },
      {
        type: 'input',
        name: 'duration',
        message: 'Duration of the audio:',
        default: '00:00'
      },
      {
        type: "date",
        name: 'pubDate',
        message: 'Publish date:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/episodes/{{genKey title}}.md',
        templateFile: 'plop-templates/episode-md.hbs',
      },
      {
				type: 'modify',
				path: 'src/episodes.json',
				transform(fileContents, data) {
          const newContent = fileContents.replace(/[ \n]*\][ /n]*$/, `${(fileContents.indexOf('{') > 0 ? ',' : '')}
  {
    "authors": [${data.authors.map((author,i)=>(`
      "${author}"${i === data.authors.length-1 ? '' : ','}`)).join('')}
    ],
    "title": "${data.title}",
    "pubDate": "${formatRFC7231(data.pubDate)}",
    "fileSize": "${data.fileSize}",
    "duration": "${data.duration}",
    "key": "${genKey(data.title)}",
    "filename": "${generateFilename(data.title)}",
    "order": ${episodes.length+1},
    "guid": "EP${episodes.length}_${Math.random().toString(36).slice(6)}"
  }
]`)
          return newContent;
				}
			}
      // {
			// 	type: 'modify',
			// 	path: 'pages/episodes/episodes.json',
			// 	pattern: /(})?(\])$/gi,
      //   templateFile: 'plop-templates/episode.hbs',
			// }
    ],
  })
}
