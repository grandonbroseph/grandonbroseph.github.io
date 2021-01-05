import * as h from '../lib/vdom'

export default function Project(project) {
  const selectidx = 0
  const selectsrc = project.images[selectidx]
  let lifespan = project.lifespan[0].toString()
  if (project.lifespan.length === 2) {
    lifespan += '-' + project.lifespan[1]
  }
  return h.div({ class: 'project' }, [
    h.article({ class: 'project-content' }, [
      h.div({ class: 'project-carousel' },
        project.images.map((src, idx) =>
          idx === selectidx
            ? h.img({ class: 'carousel-image -select', src })
            : h.img({ class: 'carousel-image', src })
      )),
      h.div({ class: 'project-header' }, [
        h.div({ class: 'project-headings' }, [
          h.h1({ class: 'project-title'},
            [`${project.title} (${lifespan})`]),
          h.h2({ class: 'project-subtitle' }, [project.subtitle])
        ]),
      ]),
      ...project.content.map(text => h.p([text]))
    ]),
    h.aside({ class: 'project-preview' }, [
      h.div({ class: 'preview-imagewrap' }, [
        h.img({ class: 'preview-image', src: selectsrc }),
        h.div({ class: 'preview-refl' }, [
          h.img({ class: 'preview-image', src: selectsrc }),
        ])
      ])
    ])
  ])
}
