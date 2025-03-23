import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, Divider, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MainLayout from '../../../layout/MainLayout';
import { axiosConfig } from '../../../config/configApi';

const { Title, Text } = Typography;
const { Option } = Select;
interface AccountData {
    phone: string;
    email: string;
    subAccountStatus: string;
  }

const AccountInfo: React.FC = () => {
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const getData = async () => {
        
        setLoading(true);
        axiosConfig.get("", )
            .then((response: any) => {
                console.log(response);
                setAccountData(response.data);
            })
            .catch((error: any) => {})
            .finally(() => {
                setLoading(false);
            })
 
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
                <Text>{accountData?.phone ?? "hah"}</Text>
                </Col>
                <Col>
                <Button icon={<EditOutlined />} type="default">
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
                <Text>{accountData?.email}</Text>
                </Col>
                <Col>
                <Button icon={<EditOutlined />} type="default">
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
                <Button type="default">Cập nhật</Button>
                </Col>
            </Row>

            {/* Xóa tài khoản phụ */}
            <Row justify="space-between" align="middle" style={{ padding: '10px 0' }}>
                <Col>
                <Text strong>Xóa tài khoản phụ ?</Text>
                </Col>
                <Col>
                <Select defaultValue={accountData?.subAccountStatus} style={{ width: 150 }}>
                    <Option value="not-set">Không được thiết lập</Option>
                    <Option value="delete">Xóa</Option>
                </Select>
                </Col>
            </Row>

            {/* Nút Cập nhật */}
            <Divider />
            <Button type="primary" block>
                Cập nhật
            </Button>
            </Card>
  
        </MainLayout>
    );
};

export default AccountInfo;