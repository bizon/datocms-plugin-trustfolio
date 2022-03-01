import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'

export type FirstInstallationParameters = Record<string, unknown>

export type ValidParameters = {
  apiToken: string
  locales: string
  corsUrlPrefix: string
}

export type ConfigParameters = FirstInstallationParameters | ValidParameters

export type OnSelectType = (value?: any) => void

export type EmptyProps = {
  ctx: RenderFieldExtensionCtx
  onSelect: OnSelectType
}

export type ValueProps = {
  value: ReviewProps
  onReset: () => void
}

export type CardProps = {
  value: SelectReviewProps
  onSelect: (value: any) => void
}

export type SelectReviewProps = {
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

export type ReviewProps = {
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
