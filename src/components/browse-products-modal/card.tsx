import React from 'react'
import {CardProps} from '../../types'
import style from './card.style.module.css'

const Card = ({value, onSelect}: CardProps) => {
  return (
    <div
      className={style.card}
      onClick={() => {
        onSelect(value)
      }}
    >
      <div className={style.card__form}>
        <div
          className={style.card__form__image}
          style={{
            backgroundImage: `url(${value.organization.picture.m})`,
          }}
        />
        <div className={style.card__form__info}>
          <div className={style.card__form__title}>
            <p>{value.organization.name}</p>
          </div>
          <div className={style.card__form__description}>
            <p>{value.testimony}</p>
          </div>
        </div>
      </div>
      {/* <button type='button' className={style.value__reset} onClick={onReset} /> */}
    </div>
  )
}

export default Card
