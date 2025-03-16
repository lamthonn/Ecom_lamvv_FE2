import {  RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { router } from "../routes/router";
import "../global.scss";

import React from "react";
import { Layout, Menu, MenuProps } from "antd";
import { menuItem } from "../config";
import HeaderLayout from "./Header";
import ProtectedRoute from "../routes/PrivateRoute";
import { routesConfig } from "../routes/routes";
import GroupLabel from "../components/group-label";

const { Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  backgroundColor: "var(--color-primary-9)"
};

const MainLayout: React.FC<{children?: React.ReactNode, label?:string }> = ({
  children,
  label = "Chưa có tiêu đề"
}) => {
  const location = useLocation(); // Lấy thông tin route hiện tại
  const navigate = useNavigate();
  const handleChangeMenu: MenuProps['onClick']  = (item:any) => {
    if(item.key === "dashboard") {
      navigate(routesConfig.dashboard);
    }
    if(item.key === "test-component") {
      navigate(routesConfig.testComponent);
    }
    if(item.key === "quan-ly-danh-muc") {
      navigate(routesConfig.quanLyDanhMuc);
    }
    if(item.key === "danh-sach-san-pham") {
      navigate(routesConfig.quanLySanPham);
    }
  }
  // Kiểm tra nếu route là "/login"
  if (location.pathname === "/login") {
    return <RouterProvider router={router} />;
  }

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "var(--color-primary-9)" }}
          defaultSelectedKeys={["1"]}
          items={menuItem}
          onClick={handleChangeMenu}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <HeaderLayout />
        <GroupLabel label={label}/>
        <Content style={{ margin: "24px 16px 0", overflow: "initial", minHeight: "80vh" }}>
          <div
            style={{
              padding: 24,
              background: "var(--color-primary-1)"
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "end",
            background: "var(--color-primary-1)",
            borderTop: "1px solid var(--color-primary-2)"
          }}
        >
          Delias ©{new Date().getFullYear()} Created by Vũ Vương Lâm
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
