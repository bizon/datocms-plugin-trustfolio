import {Button} from 'datocms-react-ui'
import React from 'react'

import type {EmptyProps} from '../../types'

import style from './styles.module.css'

function Empty({ctx, onSelect}: EmptyProps) {
  const handleOpenModal = async () => {
    const result = await ctx.openModal({
      id: 'browseTrustfolioReviews',
      title: 'Browse Trustfolio Reviews',
      width: 'l',
    })

    onSelect(result)
  }

  return (
    <div className={style.empty}>
      <div className={style.empty__label}>No Trustfolio review selected</div>

      <Button onClick={handleOpenModal}>Browse</Button>
    </div>
  )
}

export default Empty
