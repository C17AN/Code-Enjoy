import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { Top } from '../components/top'
import { Guest } from '../components/guest/index'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'
import '../components/top/index.scss'
import '../styles/guestBook.scss'

export default ({ data, location }) => {
  useEffect(() => {
    fetch('https://api.github.com/repos/c17an/Merrily-Code/issues')
      .then(res => res.json())
      .then(data => {
        setGuestList(
          data
            .filter(issue => {
              // 실제 이슈 리스트에서 정보 가공하는 단계
              // 유지보수 할때 참고 - labels[0]은 GuestBook 라벨, labels[1] 은 Secret(비밀글) 라벨임
              if (issue.labels[0] && issue.labels[0].name === 'GuestBook') {
                return true
              } else {
                return false
              }
            })
            .map(guest => {
              return {
                title: guest.title,
                body: guest.body,
                labels: guest.labels.map(label => label),
              }
            })
        )
      })
  }, [])
  const [guestList, setGuestList] = useState([])
  const [guestName, setGuestName] = useState('')
  const [message, setMessage] = useState('')
  const [secret, setSecret] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const tok1 = '6efc985955a7e'
  const tok2 = '7098f4fcf35f9'
  const tok3 = '44172b55f71deb'
  const handleSubmit = e => {
    const timestamp = new Date().getTime()
    e.preventDefault()
    fetch('https://api.github.com/repos/c17an/Merrily-Code/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${tok1}${tok2}${tok3}`,
      },
      body: JSON.stringify({
        title: `${guestName}`,
        body: `${message} - ${new Date(timestamp).toLocaleString()}`,
        labels: secret ? ['GuestBook', 'Secret'] : ['GuestBook'],
      }),
    })
      .then(res => res.json())
      .then(data => {
        setGuestList([
          {
            title: guestName,
            body: message + ` - ${new Date(timestamp).toLocaleString()}`,
            labels: secret ? ['GuestBook', 'Secret'] : ['GuestBook'],
          },
          ...guestList,
        ])
      })
    setGuestName('')
    setMessage('')
  }
  const handleNameChange = e => {
    setGuestName(e.target.value)
  }
  const handleMessageChange = e => {
    setMessage(e.target.value)
  }
  const handleSecretCheck = e => {
    setSecret(!secret)
  }
  return (
    <>
      <Top title={'즐겁게, 코드'} location={location} rootPath={'rootPath'} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(50),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }}
      >
        <h1 className="guestBook__title">📝 방명록</h1>
        <div className="guestBook__container">
          <div className="guestBook__guestList">
            {guestList.map((guest, idx) => (
              <Guest
                key={idx}
                title={guest.title}
                message={guest.body}
                labels={guest.labels}
              ></Guest>
            ))}
          </div>
          <form className="guestBook__form" onSubmit={e => handleSubmit(e)}>
            <input
              className={'guestBook__name'}
              type="text"
              placeholder="이름을 입력하세요"
              name="name"
              onChange={e => handleNameChange(e)}
              autoComplete="off"
              value={guestName}
            ></input>
            <textarea
              className={'guestBook__message'}
              type="text"
              placeholder="남길 메시지를 입력하세요"
              name="message"
              onChange={e => handleMessageChange(e)}
              value={message}
            ></textarea>
            <div className="guestBook__secret__container">
              <input
                type="checkbox"
                name="guestBook__secret"
                id="guestBook__secret"
                className="guestBook__secret__checkbox"
                onChange={handleSecretCheck}
              />
              <label
                for="guestBook__secret"
                className="guestBook__secret__label"
              >
                비밀 메시지
              </label>
              <button
                className="guestBook__button"
                disabled={!(guestName && message)}
              >
                방명록 남기기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`
