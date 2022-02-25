import React from 'react'
import {ReviewProps, ValueProps} from '../../types'
import style from './styles.module.css'

export default function Value({value, onReset}: ValueProps) {
  return value.map((review: ReviewProps) => (
    <div key={value.id} className={style.value}>
      <div className={style.value__form}>
        <div
          className={style.value__form__image}
          style={{
            backgroundImage: `url(${review.organization.picture.m})`,
          }}
        />
        <div className={style.value__form__info}>
          <div className={style.value__form__title}>
            <a href={review.meta.social.url} target='_blank' rel='noopener noreferrer'>
              {review.organization.name}
            </a>
          </div>
          <div className={style.value__form__description}>
            <p>{review.testimony}</p>
          </div>
        </div>
      </div>
      <button
        type='button'
        className={style.value__reset}
        onClick={() => {
          onReset(review.id)
        }}
      />
    </div>
  ))
}
