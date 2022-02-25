import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import React, {useEffect, useState} from 'react'
import get from 'lodash-es/get'

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
    await ctx.setFieldValue(ctx.fieldPath, value ? JSON.stringify(value) : '')
  }

  const handleReset: OnSelectType = async (id) => {
    if (!value) {
      return
    }

    const reviews = JSON.parse(value)
    const removeIndex = reviews.findIndex((review: any) => review.id === id)
    reviews.splice(removeIndex, 1)

    await ctx.setFieldValue(ctx.fieldPath, reviews.length > 0 ? JSON.stringify(reviews) : '')
  }

  // Console.log('value:', value)
  return value ? (
    <Value value={JSON.parse(value)} onReset={handleReset} />
  ) : (
    <Empty ctx={ctx} onSelect={handleSelect} />
  )
}

export default Result
