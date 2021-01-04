import { div, article, aside, h1, h2, p, img } from '../lib/vdom'

export default function Project(project) {
  const selectidx = 0
  const selectsrc = project.images[selectidx]
  return div({ class: 'project' }, [
    article({ class: 'project-content' }, [
      div({ class: 'project-carousel' },
        project.images.map((src, idx) =>
          idx === selectidx
            ? img({ class: 'carousel-image -select', src })
            : img({ class: 'carousel-image', src })
      )),
      div({ class: 'project-header' }, [
        div({ class: 'project-headings' }, [
          h1({ class: 'project-title'}, [project.name]),
          h2({ class: 'project-lifespan' },
            [`${project.lifespan[0]} - ${project.lifespan[1]}`])
        ]),
      ]),
      ...project.content.map(text => p([text]))
    ]),
    aside({ class: 'project-preview' }, [
      div({ class: 'preview-imagewrap' }, [
        img({ class: 'preview-image', src: selectsrc }),
        div({ class: 'preview-refl' }, [
          img({ class: 'preview-image', src: selectsrc }),
        ])
      ])
    ])
  ])
}
