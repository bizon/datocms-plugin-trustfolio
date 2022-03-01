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
  value: ReviewProps
  onSelect: (value: any) => void
}

export type ReviewProps = {
  id: string
  testimony: string
  sourceLang: string
  meta: {social: {url: string}}
  organization: {
    name: string
    picture: {
      m: string
    }
  }
}
