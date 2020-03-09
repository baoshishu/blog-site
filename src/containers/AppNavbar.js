import React from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarBrandLink,
  NavbarSecondary,
  // NavbarLink,
} from "../components/Navbar"
// import { useLangKey, I18nLink } from "../components/I18nContext"
import { I18nLink } from "../components/I18nContext"

// const locales = {
//   en: {
//     site: "网站",
//     blog: "Blog",
//     workshops: "Workshops",
//     projects: "Projects",
//   },
// }

export function AppNavbar() {
  // const langKey = useLangKey()
  // const t = locales[langKey]
  return (
    <Navbar>
      <NavbarBrandLink as={I18nLink} to="/">
        <NavbarBrand>报时树技术博客</NavbarBrand>
      </NavbarBrandLink>
      <NavbarSecondary></NavbarSecondary>
    </Navbar>
  )
}
