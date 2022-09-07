import React from 'react'

import type {CardProps} from '../../types'

import style from './card.style.module.css'

function Card({value, onSelect}: CardProps) {
  return (
    <div className={style.card}>
      <div className={style.card__form}>
        <div className={style.card__form__info}>
          <div className={style.card__form__title}>
            <img src={value.organization.picture.m} className={style.card__form__image} />
            <p>{value.organization.name}</p>
          </div>

          <p className={style.card__info__text}>
            Choose a customer review available in the following languages:
          </p>

          <div className={style.card__review__container}>
            {value.data.length > 0 ? (
              value.data.map((review) => (
                <div
                  key={review.meta.social.url}
                  className={style.card__form__description__container}
                  onClick={() => {
                    onSelect(review)
                  }}
                >
                  {review.testimony ? (
                    <p className={style.card__form__description}>“{review.testimony}”</p>
                  ) : (
                    <p className={style.card__form__description}>
                      <i>There are no customer reviews available right now.</i>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>
                <i>There are no customer reviews available right now.</i>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
