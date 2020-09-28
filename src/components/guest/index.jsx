import React from 'react'
import './index.scss'

export const Guest = ({ title, message }) => {
  return (
    <div className="guest">
      <h3 className="guest__name">{title}</h3>
      <div className="guest__message">{message}</div>
    </div>
  )
}
