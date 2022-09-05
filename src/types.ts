import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'

export type FirstInstallationParameters = Record<string, unknown>

export interface ValidParameters {
  apiToken: string
  locales: string
  slug: string
}

export type ConfigParameters = FirstInstallationParameters | ValidParameters

export type OnSelectType = (value?: any) => void

export interface EmptyProps {
  ctx: RenderFieldExtensionCtx
  onSelect: OnSelectType
}

export interface ValueProps {
  value: ReviewProps
  onReset: () => void
}

export interface CardProps {
  value: SelectReviewProps
  onSelect: (value: any) => void
}

export interface SelectReviewProps {
  id: string
  organization: {
    name: string
    picture: {
      m: string
    }
  }
  data: [
    {
      testimony: string
      sourceLang: string
      meta: {social: {url: string}}
      organization: {
        name: string
        picture: {
          m: string
        }
      }
    },
  ]
}

export interface ReviewProps {
  id: string
  organization: {
    name: string
    picture: {
      m: string
    }
  }
  testimony: string
  sourceLang: string
  meta: {social: {url: string}}
}
