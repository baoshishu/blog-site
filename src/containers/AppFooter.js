/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react"
import { Link } from "gatsby"
import styled, { Box } from "@xstyled/styled-components"
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaRegGem,
} from "react-icons/fa"
import { Location } from "@reach/router"
import { Container } from "../components/Container"
import { useLangKey, toEnglish, toFrench } from "../components/I18nContext"

const Copyright = styled.div`
  color: light400;
  font-size: 12;
  font-family: monospace;
`

const Socials = styled.div`
  margin-left: auto;
  margin-right: -2;
  display: flex;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44;
  width: 44;
  color: lighter;
  transition: base;

  &:hover,
  &:focus {
    outline: none;
    color: accent;
  }
`

const currentYear = new Date().getFullYear()

const locales = {
  en: {
    github: "GitHub",
    site: "Vipkit网站",
    email: "发送邮件",
  },
}

export function AppFooter() {
  const langKey = useLangKey()
  const t = locales[langKey]
  return (
    <Container display="flex" alignItems="center" mt={4} pb={4}>
      <Copyright>报时树 © {currentYear}</Copyright>
      <Socials>
        <SocialLink title={t.github} href="https://github.com/baoshishu">
          <FaGithub />
        </SocialLink>
        <SocialLink title={t.site} href="https://vipkit.com">
          <FaRegGem />
        </SocialLink>
        <SocialLink title={t.email} href="mailto:dev@baoshishu.com">
          <FaEnvelope />
        </SocialLink>
      </Socials>
    </Container>
  )
}
