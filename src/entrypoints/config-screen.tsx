import type {RenderConfigScreenCtx} from 'datocms-plugin-sdk'
import {Button, Canvas, FieldGroup, Form, TextField} from 'datocms-react-ui'
import React from 'react'
import {Field, Form as FormHandler} from 'react-final-form'

import type {ConfigParameters} from '../types'

import style from './styles.module.css'

interface ConfigScreenProps {
  ctx: RenderConfigScreenCtx
}

function ConfigScreen({ctx}: ConfigScreenProps) {
  return (
    <Canvas ctx={ctx}>
      <div className={style.inspector}>
        <FormHandler<ConfigParameters>
          initialValues={ctx.plugin.attributes.parameters}
          validate={(values) => {
            const errors: Record<string, string> = {}

            if (!('apiToken' in values) || !values.apiToken) {
              errors.apiToken = 'This field is required!'
            }

            if (!('locales' in values) || !values.locales) {
              errors.locales = 'This field is required!'
            }

            if (!('slug' in values) || !values.slug) {
              errors.locales = 'This field is required!'
            }

            return errors
          }}
          onSubmit={async (values) => {
            await ctx.updatePluginParameters(values as Record<string, unknown>)
            await ctx.notice('Settings updated successfully!')
          }}
        >
          {({handleSubmit, submitting, dirty}) => (
            <Form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field name='apiToken'>
                  {({input, meta: {error}}) => (
                    <TextField
                      required
                      id='apiToken'
                      label='Trustfolio access token'
                      placeholder='XXX'
                      hint='Please insert your Trustfolio access token.'
                      error={error}
                      {...input}
                    />
                  )}
                </Field>
                <Field name='slug'>
                  {({input, meta: {error}}) => (
                    <TextField
                      required
                      id='slug'
                      label='Account slug'
                      placeholder='Insert your account slug'
                      hint='You can find it on your profile url https://trustfolio.co/profil/[SLUG]'
                      error={error}
                      {...input}
                    />
                  )}
                </Field>
                <Field name='locales'>
                  {({input, meta: {error}}) => (
                    <TextField
                      required
                      id='locales'
                      label='Locales from Trustfolio you want to fetch'
                      placeholder='en-GB'
                      hint='Separate each value with a comma (example: "fr-FR,en-GB").'
                      error={error}
                      {...input}
                    />
                  )}
                </Field>
              </FieldGroup>
              <Button
                fullWidth
                type='submit'
                buttonSize='l'
                buttonType='primary'
                disabled={submitting || !dirty}
              >
                Save settings
              </Button>
            </Form>
          )}
        </FormHandler>
      </div>
    </Canvas>
  )
}

export default ConfigScreen
