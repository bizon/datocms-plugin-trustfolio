import React from 'react'
import {RenderConfigScreenCtx} from 'datocms-plugin-sdk'
import {Canvas, ContextInspector} from 'datocms-react-ui'

import s from './styles.module.css'

type Props = {
  ctx: RenderConfigScreenCtx
}

const ConfigScreen = ({ctx}: Props) => {
  return (
    <Canvas ctx={ctx}>
      <p>Welcome to DatoCMS plugin Trustfolio</p>
      <div className={s.inspector}>
        <ContextInspector />
      </div>
    </Canvas>
  )
}

export default ConfigScreen
