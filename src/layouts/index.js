import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'

const TemplateWrapper = ({ children }) => (
  <div style={{ margin: '3rem auto', maxWidth: 600 }}>
    <Helmet
      title="howell.io - Home"
      meta={[]}
    />
    <Header />
    <div>
      {children()}
    </div>
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
