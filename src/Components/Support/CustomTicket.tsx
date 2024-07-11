import { useState } from "react";

// antd
import { Input, Button, Modal, Form } from "antd";
import { LeftOutlined, PaperClipOutlined } from "@ant-design/icons";

// components
import { UploadButton } from "../UploadButton/UploadButton";
import useContainer from "../../Utils/Hooks/useContainer";

// styles
import * as Styled from "./CustomTicket.styled";
import { API } from "../../Utils/api";
import { useNavigate } from "react-router-dom";


const { TextArea } = Input;

interface File {
  name: string;
  size: number;
  lastModifiedDate: string;
  lastModified: any;
}

const CustomTicket: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);

  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk =  async () => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    fileList.forEach(file => {
      formData.append("files", file.fileObj);
    });
    try{
      await API.post("/support/ticket", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
      });
      navigate("/support");
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancel = () => {
    navigate("/support");
    setOpen(false);
  };

  const getFileList = (images) => {
    const filesWithSerializedDate = images.fileList.map((file) => ({
      // ...file,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate.toISOString(), // Convert Date to string
      name: file.name,
      size: file.size,
      fileObj: file.originFileObj
      // Copy any other needed properties
    }));
    setFileList(filesWithSerializedDate);
  };

  return (
    <>
      <Styled.TitleBox>
        <Styled.CustomLink to="/support">
          <LeftOutlined />
        </Styled.CustomLink>
        <Styled.StyledTitle>Ticket Submission System</Styled.StyledTitle>
      </Styled.TitleBox>
      <Form
        name="ticket_submit_form"
        onFinish={(values) => {
          setSubject(values.subject);
          setDescription(values.description);
          showModal();
        }}
        layout="vertical"
      >
        <Styled.StyledCard>
          <Form.Item
            name="subject"
            rules={[{ required: true, message: "Please input subject!" }]}
            label="Subject"
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
            label="Description"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Attachments">
            <UploadButton getFileList={getFileList} maxCount={2} />
          </Form.Item>
        </Styled.StyledCard>
        <Styled.ButtonWrapper>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Styled.ButtonWrapper>
      </Form>
      <Modal
        title="Review Ticket"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        getContainer={useContainer}
      >
        <Styled.StyledModalTitle>{subject}</Styled.StyledModalTitle>
        <p>{description}</p>
        {fileList.map((item, index) => (
          <p key={index}>
            <PaperClipOutlined />
            {item.name}
          </p>
        ))}
      </Modal>
    </>
  );
};

export default CustomTicket;
