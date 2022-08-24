import {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import {Canvas} from 'datocms-react-ui'
import React from 'react'

import Result from '../components/result'
import {ConfigParameters} from '../types'

type PropTypes = {
  ctx: RenderFieldExtensionCtx
}

function FieldExtension({ctx}: PropTypes) {
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
