import { createBrowserRouter, Navigate } from "react-router-dom";
import React from 'react';
import Dashboard from "../pages/admin-page/Dashboard/index";
import AdminLogin from "../pages/admin-page/Authen/AdminLogin";
import NotFoundPage from "../notFoundPage";
import ProtectedRoute from "./PrivateRoute";
import TestComponent from "../pages/admin-page/TestComponent";
import { routesConfig } from "./routes";
import QuanLyDanhMuc from "../pages/admin-page/quan-ly-san-pham/quan-ly-danh-muc";
import DanhSachSanPham from "../pages/admin-page/quan-ly-san-pham/danh-sach-san-pham";
import ThemSanPham from "../pages/admin-page/quan-ly-san-pham/danh-sach-san-pham/components/them-san-pham";

export const router = createBrowserRouter([
  {
    path: "trang-chu",
    element: <>trang chủ</>
  },
  //người bán
  {
    path: "seller-center",
    children:[
      {
        path: "login",
        element: <AdminLogin />
      },
      {
        path: routesConfig.dashboard,
        element:(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: routesConfig.testComponent,
        element:(
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        )
      },
      //quản lý sản phẩm
      {
        path: routesConfig.quanLyDanhMuc,
        element:(
          <ProtectedRoute>
            <QuanLyDanhMuc />
          </ProtectedRoute>
        )
      },
      {
        path: routesConfig.quanLySanPham,
        element:(
          <ProtectedRoute>
            <DanhSachSanPham />
          </ProtectedRoute>
        ),
      },
      {
        path: routesConfig.themMoiSanPham,
        element:(
          <ProtectedRoute>
            <ThemSanPham />
          </ProtectedRoute>
        )
      }
    ]
  },

  //các trường hợp khác
  //path mặc định
  {
    path: "",
    element: <Navigate to="/seller-center/dashboard" replace />
  },
  //404 not found
  {
    path: "not-found",
    element: <NotFoundPage /> // Hiển thị trang 404
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace /> // Chuyển hướng đến /not-found nếu đường dẫn không hợp lệ
  }
]);
