import {RenderModalCtx} from 'datocms-plugin-sdk'
import React, {useEffect, useState} from 'react'
import {TextInput, Canvas} from 'datocms-react-ui'
import {deburr, sortBy} from 'lodash'

import {ReviewProps, SelectReviewProps} from '../../types'
import {groupReviewsById} from '../../utils/group-reviews-by-id'
import {fetchTrustfolioData} from '../../utils/references'

import Card from './card'

import style from './styles.module.css'

const BrowseProductsModal = ({ctx}: {ctx: RenderModalCtx}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [data, setData] = useState<any[]>([])
  const [filteredReviews, setFilterReviews] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)

  const apiToken = ctx.plugin.attributes.parameters.apiToken as string
  const locales = ctx.plugin.attributes.parameters.locales as string
  const corsUrlPrefix = ctx.plugin.attributes.parameters.corsUrlPrefix as string
  const slug = ctx.plugin.attributes.parameters.slug as string

  useEffect(() => {
    setLoading(true)

    const getReferences = async () => {
      const arrayOfPromises = locales
        .split(',')
        .map(async (lang) => fetchTrustfolioData({lang, slug}, corsUrlPrefix, apiToken))

      return Promise.all(arrayOfPromises)
    }

    void getReferences().then(async (data) => {
      const result = await groupReviewsById(data.flat())

      setData(
        sortBy(result, (review: ReviewProps) => deburr(review.organization.name).toLowerCase()),
      )
      setLoading(false)
    })
  }, [apiToken, corsUrlPrefix, locales, slug])

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
              placeholder='Search for a customer…'
              id='searchValue'
              name='searchValue'
              value={searchValue}
              disabled={isLoading}
              onChange={setSearchValue}
            />
          </div>
        </form>
        <div className={isLoading ? style.empty__forms__loading : style.empty__forms}>
          {isLoading ? (
            <p>Reviews are loading...</p>
          ) : (
            filteredReviews.map((review: SelectReviewProps) => (
              <Card key={review.id} value={review} onSelect={handleValidation} />
            ))
          )}
        </div>
      </div>
    </Canvas>
  )
}

export default BrowseProductsModal
