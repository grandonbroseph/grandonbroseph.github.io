import patch from '@semibran/patch'
import * as h from './lib/vdom'
import Project from './views/project'
import * as projects from './projects'

const $root = document.querySelector('main')

patch($root, h.main([
  h.header({ class: 'header' }, [
    h.div({ class: 'back' }, [
      h.span({ class: 'icon -back material-icons-round' }, ['arrow_right_alt']),
      'Home'
    ])
  ]),
  Project(projects.proto)
]))
