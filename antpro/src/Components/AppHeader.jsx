import React from "react";
import { Image, Typography, Space , Badge } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import imag from "../assets/leads.png";

const AppHeader = () => {
  return (
    <div className="AppHeader">
      <Image width={60} src={imag}></Image>
      <Typography.Title>Leads Management</Typography.Title>
      <Space>
        <Badge count={10} dot>
          <MailOutlined style={{ fontSize: 24 }}></MailOutlined>
        </Badge>
        <Badge count={12}>
          <BellFilled style={{ fontSize: 24 }}></BellFilled>
        </Badge>
      </Space>
    </div>
  );
};

export default AppHeader;
