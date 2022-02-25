import React from 'react'
import {Button} from 'datocms-react-ui'
import {EmptyProps} from '../../types'

import style from './styles.module.css'

const Empty = ({ctx, onSelect}: EmptyProps) => {
  const handleOpenModal = async () => {
    const result = await ctx.openModal({
      id: 'browseProducts',
      title: 'Browse Trustfolio reviews',
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
