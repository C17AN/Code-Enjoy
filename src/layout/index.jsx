import React from 'react'
import styled from 'styled-components'

import { Top } from '../components/top'
import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'

const Wrapper = styled.div`
  max-width: ${rhythm(30)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  margin-left: ${props => (props.isPost ? 'auto' : '25rem')};
  margin-right: ${props => (props.isPost ? 'auto' : '0rem')};
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`

export const Layout = ({ location, title, children, isPost }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <React.Fragment>
      <Top title={title} location={location} rootPath={rootPath} />
      <Wrapper>
        <ThemeSwitch />
        <Header title={title} location={location} rootPath={rootPath} />
        {children}
        <Footer />
      </Wrapper>
    </React.Fragment>
  )
}
