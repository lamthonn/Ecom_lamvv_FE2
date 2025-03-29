import { Header } from "antd/es/layout/layout";
import React from "react";
import "./Header.scss";
import { Avatar, Badge, Dropdown, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ShowToast from "../components/show-toast/ShowToast";

const HeaderLayout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      console.log("Đăng xuất")
        localStorage.removeItem("auth");
        ShowToast("success", "Đăng xuất thành công", "Hẹn gặp lại bạn sau!");
        navigate("/seller-center/login");
        
    };

    const itemsMenu = [
        {
            key: 'dang-xuat',
            label: 'Đăng xuất',
            onClick: handleLogout,
        }
    ];
    
    return (
        <Header
            className="header-layout"
            style={{ padding: 0, background: "var(--color-primary-1)" }}
        >
            <div className="left-header">
                <img src="/images/logo2.png" alt="Delias Logo" style={{ width: "12%" }} />
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
