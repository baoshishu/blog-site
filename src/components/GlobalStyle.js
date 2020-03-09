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
  a.anchor {
    stroke: ${th.color("accent")};
    box-shadow: none;
    border-bottom: none;
  }
  .anchor {
      float: left;
      padding-right: 4px;
      margin-left: -20px;
    }
    h1 .anchor svg,
    h2 .anchor svg,
    h3 .anchor svg,
    h4 .anchor svg,
    h5 .anchor svg,
    h6 .anchor svg {
      visibility: hidden;
    }
    h1:hover .anchor svg,
    h2:hover .anchor svg,
    h3:hover .anchor svg,
    h4:hover .anchor svg,
    h5:hover .anchor svg,
    h6:hover .anchor svg,
    h1 .anchor:focus svg,
    h2 .anchor:focus svg,
    h3 .anchor:focus svg,
    h4 .anchor:focus svg,
    h5 .anchor:focus svg,
    h6 .anchor:focus svg {
      visibility: visible;
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
