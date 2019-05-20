import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default ({ children }) => (
  <div style={{ padding: "1em" }}>
    <main style={{ margin: "3rem auto", maxWidth: 600 }}>
      <Header />
      {children}
      <Footer />
    </main>
  </div>
);
