import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import theme from "../styles/theme"
import styled from "styled-components"
import { Layout, Menu } from "antd"
import { Link } from "gatsby"
import "antd/dist/antd.css"

const { Header, Footer, Content } = Layout

const StyledHeader = styled(Header)`
  display: flex;
  color: white;
`

const StyledMenu = styled(Menu)`
  @media (max-width: 600px) {
    margin: auto;
  }
`

const SiteLayout = ({ children, location: { pathname } }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <StyledHeader>
          <StyledMenu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            selectedKeys={[pathname]}
          >
            <Menu.Item key="/">
              {" "}
              <Link to="/">About</Link>
            </Menu.Item>
            <Menu.Item key="/application">
              {" "}
              <Link to="/application">Application</Link>
            </Menu.Item>
            <Menu.Item key="/blog">
              {" "}
              <a
                href="https://www.divdev.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
            </Menu.Item>
          </StyledMenu>
        </StyledHeader>
        <Content>{children}</Content>
        <Footer style={{ textAlign: "center", marginTop: "30px" }}>
          Mentored @ divdev.io ©2020 Created by Dimitri Ivashchuk
        </Footer>
      </Layout>
    </ThemeProvider>
  )
}

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteLayout
