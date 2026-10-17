import type { ComponentType } from 'react'

export type SlideContext = {
  active: boolean
  direction: 1 | -1
}

export type SlideDefinition =
  | {
      id: string
      kind: 'custom'
      label: string
      component: ComponentType<SlideContext>
    }
  | {
      id: string
      kind: 'original'
      label: string
      image: string
      alt: string
      footer: string
    }

export type SlideManifest = {
  generatedAt?: string
  source?: string
  slides: Array<{
    file: string
    title?: string
  }>
}
