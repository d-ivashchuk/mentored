import React, { useState } from "react"
import styled from "styled-components"
import * as yup from "yup"
import axios from "axios"
import moment from "moment"
import { navigate } from "gatsby"
import { Form, Input, Select, SubmitButton } from "formik-antd"
import { Formik } from "formik"

import useWindowSize from "../hooks/useWindowSize"

import { Typography, message, Button, Icon } from "antd"
import Upload from "./upload"
const { Title } = Typography

const StyledContainer = styled.div`
  margin-top: 20px;
`

const StyledForm = styled(Form)`
  max-width: 500px;
  margin: auto !important;
  @media (max-width: 600px) {
    padding: 15px;
    > div {
      margin-bottom: 8px;
    }
    label {
      position: relative;
      top: 3px;
    }
  }
  button {
    display: block;
    margin: auto;
  }
`
const StyledFix = styled.div`
  span {
    top: 6px !important;
  }
`

const StyledUpload = styled.div`
  position: relative;
  overflow: hidden;
  button {
    margin: 8px auto;
    cursor: pointer;
  }

  input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`

const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup
    .string()
    .email()
    .required(),
  age: yup
    .number()
    .required()
    .min(0)
    .max(130),
  experience: yup.number().required(),
  git: yup.string().url(),
  path: yup.number().required(),
  dedication: yup.number().required(),
  outcome: yup.string().required(),
})

const SubmitForm = () => {
  const [file, setFile] = useState()
  const size = useWindowSize()
  const formatFilename = filename => {
    const date = moment().format("YYYYMMDD")
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7)
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const newFilename = `applicantCV/${date}-${randomString}-${cleanFileName}`
    return newFilename.substring(0, 60)
  }
  const itemLayout =
    size.width > 800
      ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }
      : {}
  return (
    <StyledContainer>
      <Title style={{ textAlign: "center" }} level={2}>
        Apply for mentorship slot
      </Title>{" "}
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          axios
            .post("/.netlify/functions/telegramNotification", {
              ...values,
              appContext: "mentored.divdev.io",
            })
            .then(x => {
              setTimeout(() => {
                actions.setSubmitting(false)
              }, 2000)
            })
            .catch(err => {
              if (err) {
                setTimeout(() => {
                  actions.setSubmitting(false)

                  message.warning("Something went wrong")
                }, 2000)
              }
            })
          axios
            .post("/.netlify/functions/createMentee", {
              ...values,
            })
            .then(x => {
              navigate("/success/")
              axios
                .post("/.netlify/functions/uploadFile", {
                  name: formatFilename(file.name),
                  type: file.type,
                })
                .then(response => {
                  actions.setSubmitting(false)
                  message.success(
                    "Thanks for your desire! I will get back to you in case you get selected!!!"
                  )
                  const options = {
                    headers: {
                      "Content-Type": file.type,
                      "x-amz-acl": "public-read",
                    },
                  }
                  axios
                    .put(response.data.uploadURL, file, options)
                    .then()
                    .catch(err => console.log(err))
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              if (err) {
                setTimeout(() => {
                  actions.setSubmitting(false)

                  message.warning("Something went wrong")
                }, 2000)
              }
            })
          setTimeout(() => {
            actions.setSubmitting(false)
          }, 2000)
        }}
        validationSchema={SignupSchema}
        render={({ values, errors }) => (
          <StyledForm layout={size.width > 800 ? "horizontal" : "vertical"}>
            <Form.Item
              colon={false}
              required
              {...itemLayout}
              label="Name"
              name="name"
              showValidateSuccess
            >
              <Input name="name" />
            </Form.Item>
            <Form.Item
              colon={false}
              required
              {...itemLayout}
              label="E-mail"
              name="email"
              showValidateSuccess
            >
              <Input name="email" />
            </Form.Item>
            <Form.Item
              colon={false}
              {...itemLayout}
              label="Age"
              name="age"
              required
              showValidateSuccess
            >
              <Input name="age" />
            </Form.Item>
            <Form.Item
              colon={false}
              {...itemLayout}
              label="Twitter handler"
              name="twitterHandler"
            >
              <Input
                placeholder="Let's hangout together on Twitter :)"
                name="twitterHandler"
              />
            </Form.Item>
            <Form.Item
              colon={false}
              {...itemLayout}
              label="Telegram handler"
              name="telegramHandler"
            >
              <Input
                placeholder="It's easier for me to contact you via telegram"
                name="telegramHandler"
              />
            </Form.Item>
            <Form.Item
              colon={false}
              {...itemLayout}
              label="Background"
              name="background"
            >
              <Input
                placeholder="What were you good at in school/university"
                name="background"
              />
            </Form.Item>

            <Form.Item
              required
              colon={false}
              {...itemLayout}
              label="Experience"
              name="experience"
              showValidateSuccess
            >
              <Select
                placeholder="How long are you doing development"
                name="experience"
                style={{ width: "100%" }}
              >
                <Select.Option value={1}>No experience</Select.Option>
                <Select.Option value={2}>Less than 1 year</Select.Option>
                <Select.Option value={3}>Less than 2 years</Select.Option>
                <Select.Option value={4}>More than 2 years</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              colon={false}
              {...itemLayout}
              label="Github/gitlab"
              name="git"
            >
              <Input
                placeholder="Show off your repositories, if you already have some!"
                name="git"
              />
            </Form.Item>
            <Form.Item
              required
              colon={false}
              {...itemLayout}
              label="Preferred path"
              name="path"
              showValidateSuccess
            >
              <Select
                name="path"
                style={{ width: "100%" }}
                placeholder="What do you want to learn"
              >
                <Select.Option value={1}>Front end</Select.Option>
                <Select.Option value={2}>Backend</Select.Option>
                <Select.Option value={3}>Dev ops</Select.Option>
                <Select.Option value={4}>Mobile applications</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              required
              colon={false}
              {...itemLayout}
              label="Dedicated time"
              name="dedication"
              showValidateSuccess
            >
              <Select
                name="dedication"
                style={{ width: "100%" }}
                placeholder="Dedicated time"
              >
                <Select.Option value={1}>1 hour</Select.Option>
                <Select.Option value={2}>2 hours</Select.Option>
                <Select.Option value={3}>4 hours</Select.Option>
                <Select.Option value={4}>8 hours</Select.Option>
              </Select>
            </Form.Item>

            <StyledFix>
              <Form.Item
                required
                colon={false}
                {...itemLayout}
                label="Outcome"
                name="outcome"
                showValidateSuccess
              >
                <Input.TextArea
                  placeholder="What you want to achieve from this mentorship"
                  name="outcome"
                />
              </Form.Item>
            </StyledFix>
            <StyledUpload>
              <Button>
                {" "}
                <Icon type="upload" /> Upload your CV
              </Button>
              <div style={{ textAlign: "center", marginBottom: "8px" }}>
                {file && file.name}
              </div>
              <input
                label="Upload file"
                type="file"
                onChange={e => {
                  setFile(e.target.files[0])
                  message.success("File uploaded!")
                }}
              />
            </StyledUpload>
            <SubmitButton size="large">Apply for mentorship</SubmitButton>
          </StyledForm>
        )}
      />
    </StyledContainer>
  )
}

export default SubmitForm
