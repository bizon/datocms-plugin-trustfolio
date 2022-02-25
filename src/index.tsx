import React from 'react'
import {connect, RenderModalCtx, OnBootCtx} from 'datocms-plugin-sdk'
import {PluginAttributes} from 'datocms-plugin-sdk/dist/types/SiteApiSchema'

import {render} from './utils/render'
import ConfigScreen from './entrypoints/config-screen'
import FieldExtension from './entrypoints/field-extension'
import BrowseProductsModal from './components/browse-products-modal'

import 'datocms-react-ui/styles.css'

void connect({
  async onBoot(ctx: OnBootCtx) {
    if (
      !ctx.currentRole.meta.final_permissions.can_edit_schema ||
      ctx.plugin.attributes.parameters.migratedFromLegacyPlugin
    ) {
      return
    }

    const fields = await ctx.loadFieldsUsingPlugin()

    await Promise.all(
      fields.map(async (field) => {
        if (field.attributes.appearance.editor === ctx.plugin.id) {
          await ctx.updateFieldAppearance(field.id, [
            {
              operation: 'updateEditor',
              newFieldExtensionId: 'trustfolio',
            },
          ])
        }
      }),
    )

    await ctx.updatePluginParameters({
      ...ctx.plugin.attributes.parameters,
      migratedFromLegacyPlugin: true,
    })

    await ctx.notice('Plugin upgraded successfully!')
  },
  renderConfigScreen(ctx) {
    render(<ConfigScreen ctx={ctx} />)
  },
  manualFieldExtensions() {
    return [
      {
        id: 'trustfolio',
        name: 'Trustfolio',
        type: 'editor',
        fieldTypes: ['json'] as NonNullable<PluginAttributes['field_types']>,
      },
    ]
  },
  renderFieldExtension(id, ctx) {
    render(<FieldExtension ctx={ctx} />)
  },
  renderModal(modalId: string, ctx: RenderModalCtx) {
    if (modalId === 'browseProducts') {
      render(<BrowseProductsModal ctx={ctx} />)
    } else {
      render(null)
    }
  },
})
