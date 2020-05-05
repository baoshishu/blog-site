import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import styled, { up, css, th } from "@xstyled/styled-components"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import Markdown from "react-markdown"
import { Disqus } from "gatsby-plugin-disqus"

import { Location, useLocation } from "@reach/router"
import { useLangKey } from "../components/I18nContext"
import { PageContainer } from "../components/Container"
import { Code } from "../components/Code"
// import { Share } from "../components/Share"
import { Seo } from "../containers/Seo"
import Newsletter from "../components/Newsletter"
// import wx from "../static/weixin"

export function formatReadingTime(minutes) {
  minutes = Math.round(minutes)
  const cups = Math.round(minutes / 5)
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill("🍳")
      .join("")} ${minutes} min read`
  }
  return `${new Array(cups || 1).fill("🥐").join("")} ${minutes} min read`
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date, lang) {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date
  }

  date = new Date(date)
  const args = [
    lang,
    { day: "numeric", month: "long", year: "numeric" },
  ].filter(Boolean)
  return date.toLocaleDateString(...args)
}

const components = {
  code: ({ children, className, ...props }) => {
    const lang = className && className.split("-")[1]
    return (
      <Code lang={lang} {...props}>
        {children}
      </Code>
    )
  },
}

const Article = styled.article`
  font-size: 18;
  line-height: 1.6;

  .metadata {
    font-size: 15;
    display: flex;
    justify-content: center;

    time {
      &:after {
        content: "-";
        margin: 0 2;
      }
    }
  }

  pre {
    font-family: monospace;
  }

  code {
    font-family: monospace;
    color: lighter;
  }

  figure {
    margin: 5 -4;

    .gatsby-image-wrapper {
      box-shadow: 0 20px 50px ${th.color("shadow-dark")};

      ${up(
        "md",
        css`
          border-radius: 20;
        `
      )}
    }
  }

  figcaption {
    margin: 2;
    font-size: 16;
    text-align: center;
    color: light400;
  }

  dl,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ol,
  p,
  pre,
  ul {
    width: 100%;
    word-wrap: break-word;
  }

  h1 {
    margin: 0;
    font-size: 25;
    line-height: 1.3;
    text-align: center;
    font-weight: 500;
    color: lighter;

    ${up(
      "md",
      css`
        font-size: 40;
      `
    )}
  }

  h2 {
    font-size: 24;
    font-weight: 500;
    color: lighter;
    margin: 5 0 2;
  }

  h3 {
    font-size: 20;
    font-weight: 500;
    color: lighter;
    margin: 4 0 2;
  }

  h4 {
    font-size: 18;
    font-weight: 500;
    color: lighter;
    margin: 4 0 2;
  }

  li,
  p {
    margin: 3 0;
    /* text-align: justify; */
  }

  a:not(.anchor) {
    border-bottom: 1px solid;
    border-bottom-color: textLink;
  }
  a {
    transition: base;
    /* color: lighter; */
    color: textLink;

    * {
      transition: base;
    }

    &:hover {
      color: accent;
      border-bottom: none;
      /* border-bottom-color: accent; */

      * {
        color: accent;
        border-bottom-color: accent;
      }
    }
  }

  abbr {
    cursor: help;
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
  }

  blockquote {
    margin: 5 3;
    text-align: center;
    font-size: 24;
    line-height: 30rpx;
    font-style: italic;
    quotes: "“" "”";
  }

  blockquote:before {
    color: accent;
    content: open-quote;
    font-size: 70;
    line-height: 0;
    margin-left: -22;
    vertical-align: -28;
  }

  blockquote p {
    display: inline;
  }

  .gatsby-resp-image-link {
    border-bottom: 0;
  }

  .gatsby-resp-image-wrapper,
  img {
    max-width: 100%;
    margin: 4 auto;
  }

  .top-img img {
    margin: 0;
    max-width: auto;
  }

  ${up(
    "md",
    css`
      font-size: 21;
    `
  )};
`

const Alternate = styled.div`
  font-size: 0.8em;
  border: 1px solid;
  border-color: light500;
  border-radius: 6;
  padding: 2;
  background-color: light800;
`

const DiscussEdit = styled.box`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 5 -2;

  font-size: 18;

  > * {
    padding: 0 2;
  }

  a {
    color: lighter;
    transition: base;

    &:hover {
      color: accent;
    }
  }
`

const langs = {
  // fr: "Français",
  en: "English",
  zh: "中文",
}

const locales = {
  zh: {
    alternate: `This article is also available in:`,
    discuss: "Discuss on Twitter",
    edit: "去 GitHub 编辑",
  },
}

// function getDiscussUrl(location) {
//   return encodeURI(
//     `https://twitter.com/search?q=https://gregberge.com${location.pathname}`
//   )
// }

export default function Post({ data }) {
  const langKey = useLangKey()
  const t = locales[langKey]
  const { alternate } = data
  const { frontmatter, body } = data.mdx

  const location = useLocation()
  const shareUrl = `${data.site.siteMetadata.canonicalUrl}${location.pathname}`
  const disqusConfig = {
    url: shareUrl,
    identifier: frontmatter.slug,
    title: frontmatter.title,
  }

  const shareImageUrl = `${data.site.siteMetadata.canonicalUrl}${frontmatter.banner.childImageSharp.social.src}`
  useEffect(() => {
    fetch(
      `https://api.vipkit.com/wx-tpd/sign_jsapi?url=${encodeURIComponent(
        window.location.href.split("#")[0]
      )}`
    )
      .then(res => res.json())
      .then(data => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wx4f8c186240583bb0", // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表
        })
        wx.ready(function() {
          // 需在用户可能点击分享按钮前就先调用
          console.log("start config")
          wx.updateAppMessageShareData({
            title: frontmatter.title, // 分享标题
            desc: frontmatter.description, // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImageUrl, // 分享图标
            success() {
              console.log("config share message success")
            },
          })
          wx.updateTimelineShareData({
            title: frontmatter.title, // 分享标题
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImageUrl, // 分享图标
            success() {
              console.log("config share timeline success")
            },
          })
        })
      })
  }, [shareUrl, frontmatter, shareImageUrl])

  return (
    <>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.banner.childImageSharp.social.src}
        datePublished={frontmatter.date}
        isBlogPost
      />
      <MDXProvider components={components}>
        <PageContainer>
          <Article>
            <h1>{frontmatter.title}</h1>
            <section className="metadata">
              <time dateTime={frontmatter.date}>
                {formatPostDate(frontmatter.date, "en")}
              </time>
              <span>
                {formatReadingTime(data.mdx.fields.readingTime.minutes)}
              </span>
            </section>
            <figure className="top-img">
              <Img fluid={frontmatter.banner.childImageSharp.fluid} />
              <Markdown renderers={{ paragraph: "figcaption" }}>
                {frontmatter.bannerCredit}
              </Markdown>
            </figure>
            {alternate && (
              <Alternate>
                {t.alternate}{" "}
                <Link to={alternate.fields.link}>
                  {langs[alternate.fields.langKey]}
                </Link>
              </Alternate>
            )}
            <Markdown>{frontmatter.description}</Markdown>
            <MDXRenderer>{body}</MDXRenderer>
          </Article>
          <Location>
            {() => (
              <>
                <DiscussEdit>
                  {/* <a href={getDiscussUrl(location)}>{t.discuss}</a>
                  <span>•</span> */}
                  <a href={data.mdx.fields.editLink}>{t.edit}</a>
                </DiscussEdit>
                {/* <Share
                  url={`${data.site.siteMetadata.canonicalUrl}${location.pathname}`}
                  title={frontmatter.title}
                /> */}
              </>
            )}
          </Location>
          <Newsletter />
          <Disqus config={disqusConfig} />
        </PageContainer>
      </MDXProvider>
    </>
  )
}

export const pageQuery = graphql`
  query($id: String!, $slug: String!, $langKey: String!) {
    site {
      siteMetadata {
        canonicalUrl
      }
    }

    mdx(id: { eq: $id }) {
      body
      timeToRead
      fields {
        editLink
        readingTime {
          text
          minutes
        }
      }
      frontmatter {
        title
        description
        author
        slug
        date
        banner {
          childImageSharp {
            social: fixed(width: 1280, height: 640) {
              src
            }
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        bannerCredit
        slug
      }
    }

    alternate: mdx(fields: { slug: { eq: $slug }, langKey: { ne: $langKey } }) {
      fields {
        langKey
        link
      }
    }
  }
`
