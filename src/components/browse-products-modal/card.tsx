import React from 'react'
import {CardProps} from '../../types'
import style from './card.style.module.css'

const Card = ({value, onSelect}: CardProps) => {
  return (
    <div className={style.card}>
      <div className={style.card__form}>
        <div className={style.card__form__info}>
          <div className={style.card__form__title}>
            <img src={value.organization.picture.m} style={{width: 60, marginRight: '8px'}} />
            <p>{value.organization.name}</p>
          </div>

          <p style={{marginLeft: '5px'}}>
            Choose one of customer reviews available in the following languages :
          </p>

          <div style={{display: 'flex'}}>
            {value.data.length > 0 ? (
              value.data.map((review) => (
                <div
                  key={review.meta.social.url}
                  className={style.card__form__description}
                  onClick={() => {
                    onSelect(review)
                  }}
                >
                  {review.testimony ? (
                    <p>“{review.testimony}”</p>
                  ) : (
                    <p>
                      Sorry, a review exists for this customer in a certain locale but the content
                      cannot be found
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>Sorry, there is no customer review available right now</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
