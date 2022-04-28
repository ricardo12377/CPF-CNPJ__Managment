import React from 'react'
import style from './style.module.css'

export default function Button({text}) {
  return (
    <button className={style.button} data-testid="button-element">{text}</button>
  )
}