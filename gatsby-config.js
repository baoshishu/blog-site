const defaultSiteUrl = ""

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://blog.baoshishu.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env

const isNetlifyProduction = NETLIFY_ENV === "production"

const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    siteUrl,
    canonicalUrl: siteUrl,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Source Code Pro`, `Muli:400,400i,500,700`],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md", ".markdown"],
        gatsbyRemarkPlugins: [
          { resolve: "gatsby-remark-copy-linked-files" },
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              disableBgImageOnAlpha: true,
            },
          },
          { resolve: "gatsby-remark-embedder" },
        ],
      },
    },
    "gatsby-remark-reading-time",

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        name: `报时树`,
        short_name: `报时树技术团队`,
        description: "报时树技术团队博客",
        background_color: `#1f2347`,
        theme_color: `#FFCC68`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        localize: [
          // {
          //   start_url: `/fr/`,
          //   lang: `fr`,
          //   name: `Greg Bergé`,
          //   short_name: `gregberge`,
          //   description: `Le site personnel de Greg Bergé. Apprenez et devenez meilleur en React et JavaScript.`,
          // },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: "zh",
        useLangKeyLayout: false,
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-154496255-1",
    //     anonymize: true,
    //   },
    // },
  ],
}
