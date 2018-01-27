module.exports = {
  siteMetadata: {
    title: `howell.io`,
    author: `David Howell`
  },
  plugins: [
    `gatsby-plugin-glamor`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `docs/blog`,
    //     name: `blog`
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `docs/pages`,
        name: `pages`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `docs/bibliography`,
        name: `bibliography`
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // TODO This doesn't work yet & depends on an update to the remark plugin.
        excerpt_separator: `<!-- break -->`,
        plugins: [
          {
            resolve: `gatsby-plugin-typography`,
            options: {
              pathToConfigModule: `src/utils/typography.js`,
            }
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              // Remove the default behavior of adding a link to each
              // image.
              linkImagesToOriginal: false
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
            }
          },
          `gatsby-remark-smartypants`,
        ]
      }
    },
    // Note: this plugin _must_ come last in the list.
    `gatsby-plugin-netlify`
  ],
}
