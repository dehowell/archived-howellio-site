import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { rhythm } from '../utils/typography';

export default ({ children }) => (
  <div style={{ padding: "1em" }}>
    <main
      style={{
        marginTop: 0,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: rhythm(24)
      }}
    >
      <Header />
      {children}
      <Footer />
    </main>
  </div>
);
