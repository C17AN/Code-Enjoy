import React from 'react'
import { graphql } from 'gatsby'
import { Top } from '../components/top'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'
import '../components/top/index.scss'
import '../styles/portfolio.scss'

export default ({ data, location }) => {
  const pages = data.allMarkdownRemark.edges
  const projects = pages
    .filter(({ node }) => node.frontmatter.title === 'projects')
    .map(({ node }) => node)[0]

  const about = pages
    .filter(({ node }) => node.frontmatter.title === 'about')
    .map(({ node }) => node)[0]

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
        <div className="portfolio__container">
          <div
            className="portfolio__content"
            dangerouslySetInnerHTML={{ __html: about.html }}
          />
          <div
            className="portfolio__content"
            dangerouslySetInnerHTML={{ __html: projects.html }}
          />
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
