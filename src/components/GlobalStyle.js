import { createGlobalStyle, th } from "@xstyled/styled-components"
import { normalize } from "polished"

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html, body { 
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    -webkit-font-smoothing: antialiased;
    color: text;
    line-height: 1.4;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    background-color: bg;
  }


  ::selection {
    background-color: light500; 
    color: lighter;
  }

  * {
    box-sizing: border-box;
  }

  *:focus {
    outline-color: ${th.color("accent")};
  }

  button {
    font-family: sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  [type="search"] {
    appearance: none;
  }
`
