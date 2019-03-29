import styled from "@emotion/styled";
import React from "react";

import Head from "../components/Head";
import Layout from "../components/layout";

const Quote = styled.p`
  font-style: italic;
`;

const NotFoundPage = () => (
  <Layout>
    <Head title="Page Not Found" />
    <h1>Page Not Found</h1>
    <Quote>It is not down in any map; true places never are.</Quote>
  </Layout>
);

export default NotFoundPage;
