import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'

export type FirstInstallationParameters = Record<string, unknown>

export type ValidParameters = {
  apiToken: string
  locales: string
  corsUrlPrefix: string
}

export type ConfigParameters = FirstInstallationParameters | ValidParameters

export type EmptyProps = {
  ctx: RenderFieldExtensionCtx
  onSelect: OnSelectType
}

export type CardProps = {
  value: ReviewProps
  onSelect: (value: any) => void
}

export type ValueProps = {
  value: any
  onReset: (id: string) => void
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

export type OnSelectType = (value: any) => void

export type State = {
  searches: Record<string, any>
  query: string
  forms: Record<string, Form>
  themes: Record<string, Theme>
  results: Record<string, Result>
}

export type Form = {
  id: string
  title: string
  result: Form | undefined
  status: string
  fields: Array<Record<string, unknown>>
  code?: string
  welcome_screens: [
    {
      title: string
      attachment: {
        href: string
      }
    },
  ]
  theme?: {
    href: string
    background: {href: string}
    colors: {background: string; question: string}
  }
  _links: {
    display: string
  }
}

export type Theme = {
  id: string
  result: Theme
  status: string
}

export type Result = {
  id: string
  result: Result
  status: string
  total_items: number
}
