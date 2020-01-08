import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { Typography } from "antd"
import styled from "styled-components"

const { Title } = Typography

const StyledImage = styled(Img)`
  border-radius: 8px;
  padding: 20px;
  max-width: 700px;
  margin: auto;
  @media (max-width: 600px) {
    max-width: 400px;
  }
`

const success = ({ data }) => {
  console.log(data.file.childImageSharp)
  return (
    <div>
      <Title
        style={{ textAlign: "center", padding: "10px", marginTop: "8px" }}
        level={3}
      >
        Thanks for applying!
      </Title>
      <StyledImage
        alt="https://icons8.com "
        fluid={data.file.childImageSharp.fluid}
      />
      <Title
        style={{ textAlign: "center", padding: "10px", marginTop: "8px" }}
        level={4}
      >
        I will carefully consider your application and get back to you as soon
        as possible if your application gets selected!
      </Title>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default success

export const query = graphql`
  query successImage {
    file(relativePath: { eq: "done.png" }) {
      id
      childImageSharp {
        id
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`
