import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default ({ children }) => (
  <main style={{ margin: "3rem auto", maxWidth: 600 }}>
    <Header />
    {children}
    <Footer />
  </main>
);
