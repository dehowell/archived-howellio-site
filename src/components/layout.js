import React from "react";
import Helmet from "react-helmet";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default ({ children }) => (
  <main style={{ margin: "3rem auto", maxWidth: 600 }}>
    <Helmet title="howell.io" meta={[]} />
    <Header />
    {children}
    <Footer />
  </main>
);
