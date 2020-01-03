import React from "react"
import styled from "styled-components"
import { Typography, Button } from "antd"
import { Link } from "gatsby"
import MentorCard from "../components/mentorCard"

const { Title, Paragraph } = Typography

const StyledContainer = styled.div`
  max-width: 700px;
  margin: 30px auto;
  @media (max-width: 600px) {
    padding: 0 30px;
  }
  div {
    text-align: justify;
  }
  button {
    display: block;
    margin: auto;
  }
`

const About = () => {
  return (
    <StyledContainer>
      <MentorCard></MentorCard>
      <Title style={{ textAlign: "center" }} level={3}>
        My idea of Mentorship
      </Title>
      <Paragraph>
        Mentorship is something that can't be defined once and for all, I think
        that's something that many people will agree to. I consider the role of
        mentor to have one single <b>purpose</b> which is to be in the{" "}
        <i>right place</i> in the <i>right time</i> for a mentee.
        <br />
        <br />
        It can happen that one of your mentors could be a{" "}
        <b>
          <i>colleague</i>
        </b>{" "}
        at work who is always ready to share some helpful tips,{" "}
        <b>
          <i>your friend</i>
        </b>{" "}
        giving you life advice or a{" "}
        <b>
          <i>taxi-driver</i>
        </b>{" "}
        who gives you some valueable insights during the ride. The important
        part that relationship with mentor shall shape a better person out of
        your current self.
        <br />
        <br />
        The same applies in mentorship for developers. It can be a long lasting
        relationship which brings you from zero to hero, or just a short
        messaging that gives you a perspective on a better career choices,
        better salary or more fun job.
      </Paragraph>

      <Title style={{ textAlign: "center" }} level={3}>
        How it works?
      </Title>
      <Paragraph>
        Right now I don't have time, desire or motivation to do paid mentorship.
        My purpose with this little side project is to share as much as possible
        with the community and provide some guidance to the people who need it.
        That may change in the future, but for now I only offer{" "}
        <b>
          <i>MERIT BASED</i>
        </b>{" "}
        slots for the mentees. Which means that I have <b>3-4</b> slots which I
        can handle at the same time, and I offer them to the students of my
        choice.
      </Paragraph>

      <Title style={{ textAlign: "center" }} level={3}>
        How can one apply?
      </Title>
      <Paragraph>
        It's very easy to apply for a slot - just fill in the{" "}
        <Link to="/application">form</Link>, try to include honest information
        about yourself and write your extended thoughts with regards to what you
        want to achieve. I will review your application, and will contact you if
        you get selected!
      </Paragraph>

      <Title style={{ textAlign: "center" }} level={3}>
        What if you don't get selected?
      </Title>
      <Paragraph>
        Don't worry, it would not be a problem at all as you could still write
        me on{" "}
        <a href="twitter.com/divdev_" target="blank">
          twitter
        </a>{" "}
        and we can chat. In the future there will always be new slots as I try
        to give as much as I can, and when I see that there is nothing more to
        share I look for new mentees! Be sure to follow me on twitter, and you
        will get the necessary updates to be up to date with open slots!
      </Paragraph>
      <Link to="/application">
        <Button type="primary" size="large">
          Apply now
        </Button>
      </Link>
    </StyledContainer>
  )
}

export default About
