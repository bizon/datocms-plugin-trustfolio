import {RenderModalCtx} from 'datocms-plugin-sdk'
import React, {useEffect, useState} from 'react'
import {Button, TextInput, Canvas} from 'datocms-react-ui'
import {deburr, sortBy} from 'lodash'
import {ReviewProps} from '../../types'
import {fetchTrustfolioData} from '../../utils/references'
import style from './styles.module.css'

import Card from './card'

const BrowseProductsModal = ({ctx}: {ctx: RenderModalCtx}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [data, setData] = useState<any[]>([])
  const [filteredReviews, setFilterReviews] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)

  const apiToken = ctx.plugin.attributes.parameters.apiToken as string
  const locales = ctx.plugin.attributes.parameters.locales as string
  const corsUrlPrefix = ctx.plugin.attributes.parameters.corsUrlPrefix as string

  useEffect(() => {
    setLoading(true)

    const getReferences = async () => {
      const arrayOfPromises = locales
        .split(',')
        .map(async (lang) => fetchTrustfolioData({lang}, corsUrlPrefix, apiToken))

      return Promise.all(arrayOfPromises)
    }

    void getReferences().then((data) => {
      setData(sortBy(data.flat(), ({organization}) => deburr(organization.name).toLowerCase()))
      setLoading(false)
    })
  }, [apiToken, corsUrlPrefix, locales])

  const handleValidation = async (review: ReviewProps) => {
    await ctx.resolve(review)
  }

  useEffect(() => {
    const filteredData = data.filter((review: ReviewProps) =>
      review.organization.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilterReviews(filteredData)
  }, [searchValue, data])

  return (
    <Canvas ctx={ctx}>
      <div className={style.empty}>
        <form className={style.empty__search}>
          <div className={style.empty__search__input}>
            <TextInput
              placeholder='Search for brand name...'
              id='searchValue'
              name='searchValue'
              value={searchValue}
              disabled={isLoading}
              onChange={setSearchValue}
            />
          </div>
          <Button
            type='submit'
            buttonType='primary'
            buttonSize='s'
            className={style.button}
            disabled={isLoading}
          >
            Validate
          </Button>
        </form>
        <div className={isLoading ? style.empty__forms__loading : style.empty__forms}>
          {isLoading ? (
            <p>Reviews are loading...</p>
          ) : (
            filteredReviews.map((review: ReviewProps) => (
              <Card key={review.meta.social.url} value={review} onSelect={handleValidation} />
            ))
          )}
        </div>
      </div>
    </Canvas>
  )
}

export default BrowseProductsModal
