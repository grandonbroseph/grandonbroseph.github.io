import { div, article, aside, h1, h2, p, img } from '../lib/vdom'

export default function Project(project) {
  const select = 0
  return div({ class: 'project' }, [
    article({ class: 'project-content' }, [
      div({ class: 'project-carousel' },
        project.images.map((src, idx) =>
          idx === select
            ? img({ class: 'carousel-image -select', src })
            : img({ class: 'carousel-image', src })
      )),
      div({ class: 'project-headings' }, [
        h1({ class: 'project-title'}, [project.name]),
        h2({ class: 'project-lifespan' },
          [`${project.lifespan[0]} - ${project.lifespan[1]}`]),
        ...project.content.map(text => p([text]))
      ])
    ]),
    aside({ class: 'project-preview' }, [
      img({ class: 'preview-image -select', src: project.images[select] })
    ])
  ])
}
