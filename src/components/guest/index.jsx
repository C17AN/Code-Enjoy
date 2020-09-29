import React from 'react'
import './index.scss'

export const Guest = ({ title, message, labels }) => {
  return (
    <div className="guest">
      <h3 className="guest__name">
        {(labels[1] && labels[1].name === 'Secret') || labels[1] === 'Secret'
          ? '비밀 메시지입니다.'
          : title}
      </h3>
      <div className="guest__message">
        {(labels[1] && labels[1].name === 'Secret') || labels[1] === 'Secret'
          ? ''
          : message}
      </div>
    </div>
  )
}
