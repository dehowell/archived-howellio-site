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
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography"
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
      resolve: "gatsby-transformer-remark"
    }
  ]
};
