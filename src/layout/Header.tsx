import { Header } from "antd/es/layout/layout";
import React from "react";
import "./Header.scss";
import { Avatar, Badge, Dropdown, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const HeaderLayout = () => {
    const itemsMenu = [
        {
            key: 'tai-khoan',
            label: 'Tài khoản',
        }
    ]
    
  return (
    <Header
      className="header-layout"
      style={{ padding: 0, background: "var(--color-primary-1)" }}
    >
      <div className="left-header">
        <img src="/images/logo2.png" alt="Delias Logo" style={{width:"12%"}}/>
      </div>

      <div className="right-header">
        <div className="thong-bao">
          <Badge count={5}>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </div>
        <div className="nguoi-dung-avt">
        <Dropdown menu={{ items: itemsMenu }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar icon={<UserOutlined />} /> Administrator
                </Space>
            </a>
        </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderLayout;
