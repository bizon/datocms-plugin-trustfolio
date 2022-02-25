import {RenderModalCtx} from 'datocms-plugin-sdk'
import React, {useEffect, useMemo, useState} from 'react'
import {Button, TextInput, Canvas} from 'datocms-react-ui'
import {deburr, sortBy} from 'lodash'
import {OnSelectType, ReviewProps} from '../../types'
import {fetchTrustfolioData} from '../../utils/references'
import style from './styles.module.css'

import Card from './card'

const BrowseProductsModal = ({ctx}: {ctx: RenderModalCtx}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedReviews, setSelectedReviews] = useState<any[]>([])
  const [data, setData] = useState<any[]>([])
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

  const handleValidation = async () => {
    await ctx.resolve(selectedReviews)
  }

  // Const handleReset: OnSelectType = (id) => {
  //   const reviews = selectedReviews
  //   const removeIndex = reviews.findIndex((review: any) => review.id === id)
  //   reviews.splice(removeIndex, 1)
  //
  //   setSelectedReviews(reviews)
  // }

  const handleSelect: OnSelectType = (review) => {
    setSelectedReviews([...selectedReviews, review])
  }

  const renderedResults = useMemo(() => {
    return data
      .filter((review: ReviewProps) => review.organization.name.includes(searchValue))
      .map((review: ReviewProps) => <Card key={review.id} value={review} onSelect={handleSelect} />)
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
            buttonType='negative'
            buttonSize='s'
            className={style.button}
            disabled={isLoading}
            onClick={() => {
              void handleValidation()
            }}
          >
            Validate
          </Button>
        </form>
        <div className={isLoading ? style.empty__forms__loading : style.empty__forms}>
          {isLoading ? <div>Loading...</div> : renderedResults}
        </div>
      </div>
    </Canvas>
  )
}

export default BrowseProductsModal
