import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Top } from '../components/top'
import '../components/top/index.scss'
import '../styles/lol.scss'
import CountUp from 'react-countup'

export default ({ data }) => {
  const [gameCount, setGameCount] = useState(0)
  const [playTime, setPlayTime] = useState(0)
  useEffect(() => {
    axios
      .get(
        'https://leztgtocqg.execute-api.us-east-1.amazonaws.com/dev/getWeeklyData'
      )
      .then(res => {
        setPlayTime(res.data.currentPlayTime / 60)
        setGameCount(res.data.currentCount)
      })
  }, [])
  return (
    <>
      <Top title={'즐겁게, 코드'} location={location} rootPath={'rootPath'} />
      <div className="container">
        <div>I Love LOL!</div>
        <div className="game-count">
          <div className="content">
            주간 플레이 판수 :{' '}
            <CountUp end={gameCount} start={0} duration={5} /> 판
          </div>
        </div>
        <div className="playtime">
          <div className="content">
            주간 플레이 시간 : <CountUp end={playTime} /> 분
          </div>
        </div>
        <div>지난주 대비 플레이타임 증가율 : 22%</div>
        <div>지난주 대비 판수 증가율 : 14%</div>
      </div>
    </>
  )
}
