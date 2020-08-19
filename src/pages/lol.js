import React from 'react'
import { Top } from '../components/top'
import '../components/top/index.scss'

export default ({ data }) => {
  console.log(data)
  return (
    <>
      <Top title={'즐겁게, 코드'} location={location} rootPath={'rootPath'} />
      <div>
        <p>이번 주의 롤 기록!</p>
        <div></div>
      </div>
    </>
  )
}
