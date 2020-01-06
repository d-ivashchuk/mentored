import React, { useState } from "react"
import styled from "styled-components"
import * as yup from "yup"
import axios from "axios"
import { Form, Input, Select, SubmitButton } from "formik-antd"
import { Formik } from "formik"
import useWindowSize from "../hooks/useWindowSize"

import { Typography, message } from "antd"
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
          const formData = new FormData()
          formData.append("file", file[0])
          actions.setSubmitting(false)
          axios
            .post("/.netlify/functions/uploadFile", {
              name: file[0].name,
              type: file[0].type,
            })
            .then(response => {
              const options = {
                headers: {
                  "Content-Type": file[0].type,
                  "x-amz-acl": "public-read",
                },
              }
              axios
                .put(response.data.uploadURL, formData, options)
                .then()
                .catch(err => console.log(err))
            })

            .catch(err => {
              console.log(err)
            })
        }}
        render={({ values, errors }) => (
          <StyledForm layout={size.width > 800 ? "horizontal" : "vertical"}>
            <input
              label="Upload file"
              type="file"
              onChange={e => {
                setFile(e.target.files)
              }}
            />
            <Upload setFile={setFile} />
            <SubmitButton size="large">Apply for mentorship</SubmitButton>
          </StyledForm>
        )}
      />
    </StyledContainer>
  )
}

export default SubmitForm
