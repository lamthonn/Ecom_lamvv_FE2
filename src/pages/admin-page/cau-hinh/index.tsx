import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Typography, Divider, Modal, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MainLayout from '../../../layout/MainLayout';
import { getDetailAcc, UpdateEmail, UpdatePassword, UpdatePhone } from '../../../services/AuthenServices';

const { Title, Text } = Typography;

interface AccountData {
  so_dien_thoai: string;
  email: string;
}

const AccountInfo: React.FC = () => {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState<boolean>(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState<boolean>(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState<boolean>(false);

  // Tạo các instance form riêng biệt cho từng modal
  const [phoneForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Hàm lấy dữ liệu tài khoản
  const getData = async () => {
    setLoading(true);
    await getDetailAcc()
      .then((response) => {
        setAccountData(response.data);
      })
      .catch((error) => {
        message.error('Không thể lấy thông tin tài khoản. Vui lòng thử lại sau.');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Hàm mở modal chỉnh sửa số điện thoại
  const showPhoneModal = () => {
    phoneForm.setFieldsValue({ so_dien_thoai: accountData?.so_dien_thoai });
    setIsPhoneModalVisible(true);
  };

  // Hàm mở modal chỉnh sửa email
  const showEmailModal = () => {
    emailForm.setFieldsValue({ email: accountData?.email });
    setIsEmailModalVisible(true);
  };

  // Hàm mở modal cập nhật mật khẩu
  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsPhoneModalVisible(false);
    setIsEmailModalVisible(false);
    setIsPasswordModalVisible(false);
    // Reset form tương ứng khi đóng modal
    phoneForm.resetFields();
    emailForm.resetFields();
    passwordForm.resetFields();
  };

  // Hàm cập nhật số điện thoại
  const handleUpdatePhone = async (values: { so_dien_thoai: string }) => {
    const postData = {
      so_dien_thoai: values.so_dien_thoai,
    };
    await UpdatePhone(postData)
      .then((response) => {
        setAccountData((prev) => (prev ? { ...prev, so_dien_thoai: values.so_dien_thoai } : null));
        message.success('Cập nhật số điện thoại thành công!');
        handleCancel();
      })
      .catch((error) => {
        message.error('Cập nhật số điện thoại thất bại. Vui lòng thử lại.');
        console.error(error);
      });
  };

  // Hàm cập nhật email
  const handleUpdateEmail = async (values: { email: string }) => {
    const postData = {
      email: values.email,
    };
    await UpdateEmail(postData)
      .then((response) => {
        message.success('Cập nhật email thành công!');
        setAccountData((prev) => (prev ? { ...prev, email: values.email } : null));
        handleCancel();
      })
      .catch((error) => {
        message.error('Cập nhật email thất bại. Vui lòng thử lại.');
        console.error(error);
      });
  };

  // Hàm cập nhật mật khẩu
  const handleUpdatePassword = async (values: { oldPassword: string; newPassword: string }) => {
    const postData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    await UpdatePassword(postData)
      .then((response) => {
        message.success('Cập nhật mật khẩu thành công!');
        handleCancel();
      })
      .catch((error) => {
        message.error('Cập nhật mật khẩu thất bại. Vui lòng thử lại.');
        console.error(error);
      });
  };

  return (
    <MainLayout label="Cấu hình hệ thống">
      <Card
        style={{
          maxWidth: 600,
          margin: '20px auto',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title level={3}>Thông Tin Tài Khoản</Title>

        {/* Số điện thoại */}
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}
        >
          <Col>
            <Text strong>Số điện thoại</Text>
            <br />
            <Text>{accountData?.so_dien_thoai ?? 'Chưa có dữ liệu'}</Text>
          </Col>
          <Col>
            <Button icon={<EditOutlined />} type="default" onClick={showPhoneModal}>
              Sửa
            </Button>
          </Col>
        </Row>

        {/* Email */}
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}
        >
          <Col>
            <Text strong>Email</Text>
            <br />
            <Text>{accountData?.email ?? 'Chưa có dữ liệu'}</Text>
          </Col>
          <Col>
            <Button icon={<EditOutlined />} type="default" onClick={showEmailModal}>
              Sửa
            </Button>
          </Col>
        </Row>

        {/* Mật khẩu đăng nhập */}
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}
        >
          <Col>
            <Text strong>Mật khẩu đăng nhập</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Nhấn nút: Bạn nên thường xuyên thay đổi mật khẩu để tránh các sự cố về vấn đề bảo mật
            </Text>
          </Col>
          <Col>
            <Button type="default" onClick={showPasswordModal}>
              Cập nhật
            </Button>
          </Col>
        </Row>

        {/* Nút Cập nhật */}
        <Divider />
        <Button type="primary" block>
          Cập nhật
        </Button>
      </Card>

      {/* Modal chỉnh sửa số điện thoại */}
      <Modal
        title="Chỉnh sửa số điện thoại"
        open={isPhoneModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={phoneForm} onFinish={handleUpdatePhone}>
          <Form.Item
            name="so_dien_thoai"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số!' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chỉnh sửa email */}
      <Modal
        title="Chỉnh sửa email"
        open={isEmailModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={emailForm} onFinish={handleUpdateEmail}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal cập nhật mật khẩu */}
      <Modal
        title="Cập nhật mật khẩu"
        open={isPasswordModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={passwordForm} onFinish={handleUpdatePassword}>
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu cũ" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default AccountInfo;