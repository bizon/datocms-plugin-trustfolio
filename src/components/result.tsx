import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import get from 'lodash/get'
import React, {useEffect, useState} from 'react'

import {OnSelectType} from '../types'

import Empty from './empty-result'
import Value from './selected-values'

interface ResultProps {
  ctx: RenderFieldExtensionCtx
}

const stateFromPlugin = ({ctx}: ResultProps): {apiToken: string; value: string | undefined} => ({
  apiToken: ctx.plugin.attributes.parameters.apiToken as string,
  value: get(ctx.formValues, ctx.fieldPath) as string | undefined,
})

function Result({ctx}: ResultProps) {
  const [value, setValue] = useState<string | undefined>()

  useEffect(() => {
    const {value: newValue} = stateFromPlugin({ctx})

    setValue(newValue)
  }, [ctx])

  const handleSelect: OnSelectType = async (value) => {
    await ctx.setFieldValue(
      ctx.fieldPath,
      value
        ? JSON.stringify({
            id: value.id,
            organization: value.organization,
            meta: {social: {url: value.meta.social.url}},
            testimony: value.testimony,
          })
        : '',
    )
  }

  const handleReset: OnSelectType = async () => {
    await ctx.setFieldValue(ctx.fieldPath, null)
  }

  return value ? (
    <Value value={JSON.parse(value)} onReset={handleReset} />
  ) : (
    <Empty ctx={ctx} onSelect={handleSelect} />
  )
}

export default Result
