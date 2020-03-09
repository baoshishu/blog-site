import React from "react"
import styled from "@xstyled/styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { PageContainer } from "../components/Container"
import { SectionDescription } from "../components/Section"
import Img404 from "../images/star_wars_kyloren_ren.gif"
// import Img404 from "../images/social.jpg"

const Title = styled.h1`
  color: lighter;
  margin: 2 0;
`

export default function NotFound() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          canonicalUrl
        }
      }
    }
  `)
  return (
    <PageContainer style={{ textAlign: "center" }}>
      <Title>Page not found</Title>
      <SectionDescription>
        We couldn’t find what you were looking for... <br />
        You should leave this page as soon as possible 😰.
      </SectionDescription>
      <div>
        <a href="https://dribbble.com/shots/2402048-Kylo-is-waiting">
          <img
            alt="Kylo is waiting"
            src={`${siteMetadata.canonicalUrl}${Img404}`}
            // src={Img404}
            style={{ width: "100%" }}
          />
        </a>
      </div>
    </PageContainer>
  )
}
