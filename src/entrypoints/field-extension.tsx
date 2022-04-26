import React from 'react'
import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import {Canvas} from 'datocms-react-ui'

import Result from '../components/result'
import {ConfigParameters} from '../types'

type PropTypes = {
  ctx: RenderFieldExtensionCtx
}

const FieldExtension = ({ctx}: PropTypes) => {
  const parameters = ctx.plugin.attributes.parameters as ConfigParameters

  if (!('apiToken' in parameters)) {
    return <p>Invalid configuration!</p>
  }

  return (
    <Canvas ctx={ctx}>
      <Result ctx={ctx} />
    </Canvas>
  )
}

export default FieldExtension
