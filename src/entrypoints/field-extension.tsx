import type {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import {Canvas} from 'datocms-react-ui'
import React from 'react'

import Result from '../components/result'
import type {ConfigParameters} from '../types'

interface FieldExtensionProps {
  ctx: RenderFieldExtensionCtx
}

function FieldExtension({ctx}: FieldExtensionProps) {
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
