import type {RenderModalCtx} from 'datocms-plugin-sdk'
import {Canvas, TextInput} from 'datocms-react-ui'
import {deburr, sortBy} from 'lodash'
import React, {useEffect, useState} from 'react'

import type {ReviewProps, SelectReviewProps} from '../../types'
import {groupReviewsById} from '../../utils/group-reviews-by-id'
import {fetchTrustfolioData} from '../../utils/references'

import Card from './card'
import style from './styles.module.css'

function BrowseProductsModal({ctx}: {ctx: RenderModalCtx}) {
  const [searchValue, setSearchValue] = useState<string>('')
  const [data, setData] = useState<any[]>([])
  const [filteredReviews, setFilteredReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const apiToken = ctx.plugin.attributes.parameters.apiToken as string
  const locales = ctx.plugin.attributes.parameters.locales as string
  const slug = ctx.plugin.attributes.parameters.slug as string

  useEffect(() => {
    setIsLoading(true)

    const getReferences = async () => {
      const arrayOfPromises = locales
        .split(',')
        .map(async (lang) => fetchTrustfolioData({lang, slug}, apiToken))

      return Promise.all(arrayOfPromises)
    }

    void getReferences().then(async (data) => {
      const result = await groupReviewsById(data.flat())

      setData(
        sortBy(result, (review: ReviewProps) => deburr(review.organization.name).toLowerCase()),
      )
      setIsLoading(false)
    })
  }, [apiToken, locales, slug])

  const handleValidation = async (review: ReviewProps) => {
    await ctx.resolve(review)
  }

  useEffect(() => {
    const filteredData = data.filter((review: ReviewProps) =>
      review.organization.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredReviews(filteredData)
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
