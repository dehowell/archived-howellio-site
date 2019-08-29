import Typography from 'typography'
import gray from 'gray-percentage'

const indexCardBlue = "rgba(58, 178, 236, 0.33)";

const MarginaliaTheme = {
  title: 'Marginalia',
  baseFontSize: '18px',
  baseLineHeight: 1.4,
  scaleRatio: 1.4,
  googleFonts: [
    {
      name: 'Playfair Display',
      styles: ['400']
    },
    {
      name: 'Spectral',
      styles: ['400', '400i', '600', '600i']
    }
  ],
  headerFontFamily: ['Playfair Display', 'serif'],
  bodyFontFamily: ['Spectral', 'serif'],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => (
    {
      'a:link': {
        color: gray(41),
        textDecorationColor: indexCardBlue
      },
      'a:visited': {
        color: gray(41),
        textDecorationColor: indexCardBlue
      },
      blockquote: {
        ...adjustFontSizeTo('15px'),
        lineHeight: 1.3,
        marginLeft: rhythm(0),
        paddingLeft: rhythm(1),
        paddingRight: rhythm(1),
        // borderLeft: `${rhythm(1/16)} solid ${gray(96)}`,
        borderLeft: `${rhythm(1/16)} solid ${indexCardBlue}`
      }
    }
  )
}

const typography = new Typography(MarginaliaTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
