import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Form, Input, Card, message, Modal } from "antd";

import { breakpoint } from "../../breakpoints";
import { updateProfile } from "../../Redux/profileSlice";
import { selectProfile } from "../../Redux/selectors";

import useContainer from "../../Utils/Hooks/useContainer";
import { API } from "../../Utils/api";
import { LeftOutlined } from "@ant-design/icons";

const StyledTitle = styled.h1`
  text-align: center;
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  font-size: var(--font-size-page-title);
  ${breakpoint.md} {
    text-align: left;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: all var(--transition-time-when-switch-theme-mode);
  background: var(--color-bg-container);
  padding-inline: 10px;
  &:hover {
    background: var(--background-affix-hover);
    color: var(--color-text);
  }
  padding: 10px 10px;
  margin-bottom: var(--margin-bottom-page-title);
  border-radius: 5px;
`;

const ChangeEmail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const handleChangeEmail = async ({ password, email }) => {
    if (email === profile.email) {
      message.warning("Please enter a new email and try again.");
      return;
    }
    try {
      const { data } = await API.put("user/update/profile", {
        password,
        email,
      });
      if (data.success) {
        await dispatch(updateProfile({ data: { ...data.user } }));
        message.success(data.message, () => navigate("/settings"));
      }
    } catch (err: any) {
      message.error(err.response.data.message);
    }
  };

  return (
    <>
      <TitleBox>
        <CustomLink to="/settings">
          <LeftOutlined />
        </CustomLink>
        <StyledTitle>Settings</StyledTitle>
      </TitleBox>
      <Card>
        <StyledTitle>Change Email</StyledTitle>
        <Form name="change_email_form" onFinish={handleChangeEmail}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input current password!" },
            ]}
          >
            <Input
              placeholder="Current Password"
              type="password"
              name="password"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input new email!" }]}
          >
            <Input placeholder="New Email" type="email" name="email" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Change Email
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default ChangeEmail;
