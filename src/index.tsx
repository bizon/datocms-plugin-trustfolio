import {connect} from 'datocms-plugin-sdk'
import {render} from './utils/render'
import ConfigScreen from './entrypoints/config-screen'
import 'datocms-react-ui/styles.css'

connect({
  renderConfigScreen(ctx) {
    render(<ConfigScreen ctx={ctx} />)
  },
})
