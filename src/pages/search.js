import React from "react";

import Head from "../components/Head";
import Layout from "../components/layout";
import Search from "../components/Search";

export default () => {
  return (
    <Layout>
      <Head title="Search" />
      <article>
        <h1>Search</h1>
        <Search />
      </article>
    </Layout>
  );
};
