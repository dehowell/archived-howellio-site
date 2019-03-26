module.exports = {
  siteMetadata: {
    title: "howell.io",
    author: "David Howell",
    description:
      "…as unprincipled as the gods, and as much a jack-of-all-trades.",
    siteUrl: "https://www.howell.io/",
    social: {
      twitter: "dehowell"
    }
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "docs/pages",
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "docs/bibliography",
        name: "bibliography"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "docs/posts",
        name: "posts"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 600,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: "gatsby-remark-prismjs"
          }
        ]
      }
    }
  ]
};
