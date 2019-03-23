import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default ({ children }) => (
  <main>
    <Header />
    {children}
    <Footer />
  </main>
);
