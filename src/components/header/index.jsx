import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Header = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    isRoot && (
      <h1 className="home-header">
        <Link to={`/`} className="link">
          <div className="note_1">♬</div>
          <span> </span>
          {title} <div className="note_2">♪</div>
        </Link>
      </h1>
    )
  )
}
