import { getColorModeInitScriptElement } from "@xstyled/styled-components"
import React from "react"
import { AppLayout } from "./src/containers/AppLayout"

export function onRenderBody({ setPreBodyComponents, setHeadComponents }) {
  setPreBodyComponents([getColorModeInitScriptElement()])
  setHeadComponents([
    <script
      type="text/javascript"
      src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"
    />,
  ])
}

export const wrapPageElement = ({
  element,
  props: {
    pageContext: { langKey = "zh" },
  },
}) => {
  return <AppLayout langKey={langKey}>{element}</AppLayout>
}
