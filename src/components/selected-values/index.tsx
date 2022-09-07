import React from 'react'

import type {ValueProps} from '../../types'

import style from './styles.module.css'

function Value({value, onReset}: ValueProps) {
  return (
    <div key={value.id} className={style.value}>
      <div className={style.value__form}>
        <div
          className={style.value__form__image}
          style={{
            backgroundImage: `url(${value.organization.picture.m})`,
          }}
        />
        <div className={style.value__form__info}>
          <div className={style.value__form__title}>
            <a href={value.meta.social.url} target='_blank' rel='noopener noreferrer'>
              {value.organization.name}
            </a>
          </div>
          <div className={style.value__form__description}>
            <p>{value.testimony}</p>
          </div>
        </div>
      </div>
      <button
        type='button'
        className={style.value__reset}
        onClick={() => {
          onReset()
        }}
      />
    </div>
  )
}

export default Value
