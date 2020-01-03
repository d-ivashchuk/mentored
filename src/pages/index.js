import React from "react"
import "antd/dist/antd.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Form />
  </Layout>
)

export default IndexPage
