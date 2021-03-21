import {NodePlopAPI, } from 'plop'
import {PromptQuestion} from 'node-plop/types/index'
import inquirer from "inquirer";
import Handlebars from "handlebars";

import datePrompt from "inquirer-date-prompt";
import fileTreeSelection from 'inquirer-file-tree-selection-prompt';
import { genMp3, genKey, transformEpisodeFile } from './plopUtils';

import {config} from 'dotenv'
config()
inquirer.registerPrompt("date", datePrompt as inquirer.prompts.PromptConstructor);
inquirer.registerPrompt('file-tree-selection', fileTreeSelection);

import channel from './src/channel.json'
Handlebars.registerHelper('genKey', genKey)





export default function(plop: NodePlopAPI) {
  plop.setActionType('genMp3', genMp3);

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
        type: 'file-tree-selection',
        name: 'path',
        message: 'Select the target mp3 file for the episode:',
        onlyShowValid: true,
        validate(path){
          const res = /(.+)\.([^.]*)$/.exec(path)
          if(!res) return true
          const [_, name, extension] = res
          return res && (!res[2] || res[2] === 'mp3')
        }
      } as PromptQuestion,
      {
        type: "date",
        name: 'pubDate',
        message: 'Publish date:',
      },
    ],
    actions: [
      {
        type: 'genMp3',
      },
      {
        type: 'modify',
				path: 'src/episodes.json',
				transform: transformEpisodeFile,
			},
      {
        type: 'add',
        path: 'src/episodes/{{genKey title}}.md',
        templateFile: 'plop-templates/episode-md.hbs',
      },
    ],
  })
}
