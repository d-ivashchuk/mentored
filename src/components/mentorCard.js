import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import { Typography, Tag, Card } from "antd"

const { Title } = Typography

const StyledInfo = styled.div`
  margin-bottom: 30px;
`

const StyledImage = styled(Img)`
  height: 160px;
  width: 160px;
  margin: auto;
  border-radius: 100px;
`
const StyledStack = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  flex-wrap: wrap;
  span {
    margin-bottom: 6px;
  }
`

const MentorCard = () => {
  const data = useStaticQuery(graphql`
    query ProfileImage {
      file(relativePath: { eq: "profile.jpg" }) {
        id
        childImageSharp {
          id
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <StyledInfo>
      {" "}
      <Card style={{ width: "300px", margin: "auto" }}>
        <StyledImage fluid={data.file.childImageSharp.fluid} />
        <Title style={{ textAlign: "center" }} level={3}>
          {" "}
          Dimitri Ivashchuk
        </Title>
        <div style={{ textAlign: "center" }}>
          Fullstack engineer/ blogger /egghead.io instructor
        </div>
        <StyledStack>
          <Tag color="red">react</Tag>
          <Tag color="magenta">graphql</Tag>
          <Tag color="blue">docker</Tag>
          <Tag color="purple">gatsby</Tag>
          <Tag color="gold">serverless</Tag>
          <Tag color="green">mongoDB</Tag>
          <Tag color="orange">node</Tag>
          <Tag color="gray">cypress</Tag>
        </StyledStack>
      </Card>
    </StyledInfo>
  )
}

export default MentorCard
