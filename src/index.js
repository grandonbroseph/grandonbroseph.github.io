import patch from '@semibran/patch'
import { main } from './lib/vdom'
import Project from './views/project'
import * as projects from './projects'

const $root = document.querySelector('main')

patch($root, Project(projects.tactics))
