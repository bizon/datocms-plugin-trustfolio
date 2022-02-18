import React from 'react'
import {connect} from 'datocms-plugin-sdk'
import 'datocms-react-ui/styles.css'

import {render} from './utils/render'
import ConfigScreen from './entrypoints/config-screen'

void connect({
  renderConfigScreen(ctx) {
    render(<ConfigScreen ctx={ctx} />)
  },
})
