import { Col, Form, Modal, Row, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../../layout/MainLayout";
import TableCustom from "../../../../components/table/table-custom";
import { formatDate } from "../../../../config/common";
import FormItemInput from "../../../../components/form-input/FormInput";
import DatePickerCustomOld from "../../../../components/datepicker/DatePickerCustomOld";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../../../routes/routes";

type NhapKhoProps = {};

const NhapKho: React.FC<NhapKhoProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reacordDetail, setReacordDetail] = useState<any>();
  const navigate = useNavigate();
  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "ma",
      key: "ma",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Ngày nhận dự kiến",
      dataIndex: "ngay_du_kien",
      key: "ngay_du_kien",
      render: (item: any) => <>{formatDate(item)}</>,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ngay_het_han",
      key: "ngay_het_han",
      render: (item: any) => <>{formatDate(item)}</>,
    },
    {
      title: "Nhà Cung cấp",
      dataIndex: "nha_cung_cap",
      key: "nha_cung_cap",
      render: (item: any) => <>{item}</>,
    },
    {
        title: "Trạng thái",
        dataIndex: "trang_thai",
        key: "trang_thai",
        render: (item: any) => (
          <>
            {item === 1 ? (
              <div className="status-field-1">Phiếu mới</div>
            ) : item === 2 ? (
              <div className="status-field-2">Hết hạn</div>
            ) : (
              <div className="status-field-3">Hoàn thành</div>
            )}
          </>
        ),
      },
    {
      title: "Ngày tạo phiếu",
      dataIndex: "created",
      key: "created",
      render: (item: any) => <>{formatDate(item)}</>,
    },
  ];

  const handleOpenDetailModalCustom =() => {

  }

  useEffect(()=> {
    console.log("reacordDetail:: ", reacordDetail);
    
  },[reacordDetail])

  return (
    <MainLayout label="Danh sách yêu cầu nhập kho">
      <Spin spinning={loading}>
        <TableCustom
          columns={columns}
          get_list_url="/api/phieu-nhap-kho"
          delete_one_url="/api/phieu-nhap-kho"
          export_url="/api/phieu-nhap-kho/export"
          handleOpenModalAddCustom={()=>navigate(routesConfig.themPhieuNhap)}
          otherAction ={
            <InboxOutlined
                className="action-table-1"
              />
          }
          edit_url_page={routesConfig.chiTietPhieuNhap}
          edit_url_page_filter_field="id"
          setRecord={setReacordDetail}
          action_width={120}
          searchComponent={
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="ma_danh_muc">
                  <FormItemInput
                    label="Mã danh mục"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="ngay_du_kien">
                  <DatePickerCustomOld
                    mode="range"
                    label="Ngày dự kiến"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="created">
                  <DatePickerCustomOld
                    mode="range"
                    label="Ngày tạo"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          }
        />
      </Spin>

      <Modal >

      </Modal>
    </MainLayout>
  );
};

export default NhapKho;
