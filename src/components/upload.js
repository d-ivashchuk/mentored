import React from "react"
import { Upload, message, Button, Icon } from "antd"
import styled from "styled-components"

const StyledUpload = styled(Upload)`
  div {
    display: block !important;
    margin: 20px auto;
  }
  .ant-upload-list {
    margin: 0;
  }
`

const UploadFile = ({ setFile }) => {
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    beforeUpload(file) {
      if (file) {
        setFile(file)
      } else {
        message.error(`File upload failed.`)
      }
    },
  }

  return (
    <StyledUpload {...props}>
      <Button>
        <Icon type="upload" /> Upload your CV
      </Button>
    </StyledUpload>
  )
}

export default UploadFile
