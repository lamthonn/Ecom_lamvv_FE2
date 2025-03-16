import { CarOutlined, ControlOutlined, DollarOutlined, NotificationOutlined, PieChartOutlined, ProductOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from 'react';


export const config = {
    
}

export const menuItem :MenuProps["items"] = [
    {
      key: "thong-ke",
      icon: React.createElement(PieChartOutlined), 
      label: "Thống kê",
      children: [
        {
          key: "dashboard",
          label: "Dashboard",
        },
        {
          key: "danh-thu-don-hang",
          label: "Dashboard",
        },
      ],
    },
    {
      key: "quan-ly-san-pham",
      icon: React.createElement(ProductOutlined), 
      label: "Quản lý sản phẩm",
      children: [
        {
          key: "quan-ly-danh-muc",
          label: "Quản lý danh mục",
        },
        {
          key: "danh-sach-san-pham",
          label: "Danh sách sản phẩm",
        },
        {
          key: "quan-ly-ton-kho",
          label: "Quản lý tồn kho",
        },
      ],
    },
    {
      key: "van-hanh",
      icon: React.createElement(ControlOutlined), 
      label: "Vận hành",
      children: [
        {
          key: "nhap-kho",
          label: "Nhập kho",
        },
        {
          key: "don-hang",
          label: "Đơn hàng",
        },
      ],
    },
    {
      key: "marketing",
      icon: React.createElement(NotificationOutlined), 
      label: "Marketing",
      children: [
        {
          key: "ma-giam-gia",
          label: "Quản lý mã giảm giá",
        },
        {
          key: "chuong-trinh-marketing",
          label: "Chương trình marketing",
        },
        {
          key: "quang-cao",
          label: "Quảng cáo",
        },
      ],
    },
    {
      key: "don-vi-van-chuyen",
      icon: React.createElement(CarOutlined), 
      label: "Đơn vị vận chuyển",
    },
    {
      key: "tai-chinh",
      icon: React.createElement(DollarOutlined), 
      label: "Tài chính",
      children: [
        {
          key: "doanh-thu",
          label: "Quản lý mã giảm giá",
        },
        {
          key: "so-du",
          label: "Số dư",
        },
        {
          key: "tai-khoan-ngan-hang",
          label: "Tài khoản ngân hàng",
        },
      ],
    },
    {
      key: "cau-hinh-he-thong",
      icon: React.createElement(UserOutlined), 
      label: "Cấu hình hệ thống",
    },
    {
      key: "test-component",
      icon: React.createElement(SettingOutlined), 
      label: "Common Component",
    },
  ];