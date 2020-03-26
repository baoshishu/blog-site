import React from "react"
import { graphql } from "gatsby"
import { SectionTitle } from "../components/Section"
import { Container } from "../components/Container"
import { Hero, HeroIntro, HeroTitle, HeroTeaser } from "../containers/Hero"
import { LatestArticles } from "../containers/LatestArticles"
import { Seo } from "../containers/Seo"

export default function IndexPage({ data }) {
  return (
    <>
      <Hero>
        <Seo />
        <HeroIntro>你好, 我们是报时树技术团队。</HeroIntro>
        <HeroTitle>
          我们希望用技术为线下商家提供更加优质的导流获客和会员营销服务。
        </HeroTitle>
        <HeroTeaser>如果你有兴趣，欢迎加入我们。</HeroTeaser>
      </Hero>
      <Container forwardedAs="section" pb={5}>
        <SectionTitle forwardedAs="h2">博客</SectionTitle>
        <LatestArticles edges={data.allMdx.edges} />
      </Container>
    </>
  )
}

export const pageQuery = graphql`
  query($langKey: String!) {
    allMdx(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false } }
        fields: { langKey: { eq: $langKey } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            link
          }
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
