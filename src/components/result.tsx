import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import React, {useEffect, useState} from 'react'
import get from 'lodash/get'

import {OnSelectType} from '../types'

import Value from './selected-values'
import Empty from './empty-result'

type PropTypes = {
  ctx: RenderFieldExtensionCtx
}

const stateFromPlugin = ({ctx}: PropTypes): {apiToken: string; value: string | undefined} => ({
  apiToken: ctx.plugin.attributes.parameters.apiToken as string,
  value: get(ctx.formValues, ctx.fieldPath) as string | undefined,
})

const Result = ({ctx}: PropTypes) => {
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
