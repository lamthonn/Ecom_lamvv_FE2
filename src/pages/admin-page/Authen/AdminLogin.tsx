import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  notification,
  Spin,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./AdminLogin.scss";
import { loginAdmin } from "../../../services/AuthenServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowToast from "../../../components/show-toast/ShowToast";

const { Title, Text } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const body = {
      tai_khoan: values.tai_khoan,
      mat_khau: values.mat_khau,
      is_super_admin: true,
    };
    await loginAdmin(body)
      .then((res: any) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/seller-center/dashboard");
        ShowToast(
          "success",
          "Đăng nhập thành công",
          "Chào mừng bạn đến với Delias Seller Center"
        );
      })
      .catch((err: any) => {
        ShowToast(
          "error",
          "Đăng nhập thất bại",
          "Tài khoản hoặc mật khẩu không đúng"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading}>
      <div className="admin-login-container">
        <Card className="login-card">
          <div className="login-title">
            <img
              src="/images/logo2.png"
              alt="Delias Logo"
              style={{ width: "50%" }}
            />
            <Title level={3}>Delias Seller Center</Title>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="tai_khoan"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="mat_khau"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                size="large"
              >
                LOGIN
              </Button>
            </Form.Item>

            <div className="login-links">
              <Text>
                <a href="#">Quên mật khẩu?</a>
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};

export default AdminLogin;
