module.exports = {
  siteMetadata: {
    title: `howell.io`,
    author: `David Howell`
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `e6e0f28b.wordpress.com`,
        protocol: `https`,
        hostingWPCOM: true,
        useACF: false,
        auth: {
          wpcom_app_clientSecret: process.env.WP_CLIENT_SECRET,
          wpcom_app_clientId: process.env.WP_CLIENT_ID,
          wpcom_user: process.env.WP_USER,
          wpcom_pass: process.env.WP_PASS
        }
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
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
              linkImagesToOriginal: false,
              // Analyze images' pixel density to make decisions about
              // target image size. This is what GitHub is doing when
              // embedding images in tickets. This is a useful setting
              // for documentation pages with a lot of screenshots.
              // It can have unintended side effects on high pixel
              // density artworks.
              //
              // Example: A screenshot made on a retina screen with a
              // resolution of 144 (e.g. Macbook) and a width of 100px,
              // will be rendered at 50px.
              //
              // Defaults to false.
              sizeByPixelDensity: true,
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
  ],
}
