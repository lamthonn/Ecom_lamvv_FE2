import React, { CSSProperties, useState } from "react";
import MainLayout from "../../../../../layout/MainLayout";
import { Collapse, Form, Image, Modal, Spin } from "antd";
import ButtonCustom from "../../../../../components/button/button";
import { routesConfig } from "../../../../../routes/routes";
import { useNavigate } from "react-router-dom";
import "./CtPhieuNhap.scss";
import FormItemInput from "../../../../../components/form-input/FormInput";
import dayjs, { Dayjs } from "dayjs";
import DatePickerCustomOld from "../../../../../components/datepicker/DatePickerCustomOld";
import { useForm } from "antd/es/form/Form";
import DatePickerCustom from "../../../../../components/datepicker/DatePickerCustom";
import TableCustom from "../../../../../components/table/table-custom";
import ThemSanPhamVaoPhieuNhap from "./them-san-pham";
import { axiosConfig, BASE_URL } from "../../../../../config/configApi";
import FormInputNumber from "../../../../../components/form-input-number/FormInputNumber";
import FormAreaCustom from "../../../../../components/text-area/FormTextArea";
import ShowToast from "../../../../../components/show-toast/ShowToast";

type ChiTietPhieuNhapProps = {
  type: "add" | "edit";
  label?: string;
};

const labelStyle: CSSProperties = {
  fontWeight: "bold",
  fontSize: "20px",
  color: "var(--color-primary-7)",
};

type dataSourceInterface = {
  key: string;
  san_pham_id?: string;
  duong_dan_anh_bia?: string;
  ma_san_pham?: string;
  ten_san_pham?: string;
  ten_danh_muc?: string;
  sku?: string;
  so_luong?: number;
  don_gia?: number;
};

const ChiTietPhieuNhap: React.FC<ChiTietPhieuNhapProps> = ({ label, type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  //#region thông tin nhập kho
  const [form1] = useForm();
  const [ma_phieu_nhap, set_ma_phieu_nhap] = useState<string>("");
  const [ngay_du_kien, set_ngay_du_kien] = useState<Dayjs | null>();
  const [ngay_het_han, set_ngay_het_han] = useState<Dayjs | null>();
  const [nha_cung_cap, set_nha_cung_cap] = useState<string>("");
  const [ghi_chu, set_ghi_chu] = useState<string>("");

  const Items1 = [
    {
      key: "1",
      label: <span style={labelStyle}>Thông tin nhập kho</span>,
      children: (
        <Form form={form1}>
          <div className="thong-tin-nhap-kho">
            <Form.Item name="ma_phieu_nhap">
              <FormItemInput
                label="Mã phiếu nhập"
                disabled={type === "edit" ? true : false}
                required={true}
                placeholder="Nhập mã phiếu"
                value={ma_phieu_nhap}
                onChange={(e: any) => set_ma_phieu_nhap(e.target.values)}
              />
            </Form.Item>

            <Form.Item name="ngay_du_kien">
              <DatePickerCustom
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
                label="Ngày dự kiến đến"
                value={ngay_du_kien ? [ngay_du_kien, ngay_du_kien] : null}
                onChange={(dates: Dayjs | null) => set_ngay_du_kien(dates)}
              />
            </Form.Item>

            <Form.Item name="ngay_het_han">
              <DatePickerCustom
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
                label="Ngày hết hạn"
                value={ngay_het_han ? [ngay_het_han, ngay_het_han] : null}
                onChange={(dates: Dayjs | null) => set_ngay_het_han(dates)}
              />
            </Form.Item>

            <Form.Item name="nha_cung_cap">
              <FormItemInput
                label="Nhà cung cấp"
                placeholder="Nhà cung cấp"
                value={nha_cung_cap}
                onChange={(e: any) => set_ma_phieu_nhap(e.target.values)}
              />
            </Form.Item>
          </div>
          <Form.Item name="ghi_chu">
            <FormAreaCustom
              label="Nhà cung cấp"
              placeholder="Nhà cung cấp"
              value={ghi_chu}
              onChange={(e: any) => set_ghi_chu(e.target.values)}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];
  //#endregion

  //#region thông tin sản phẩm nhập kho
  const [dataSource, setDataSource] = useState<dataSourceInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "duong_dan_anh_bia",
      key: "duong_dan_anh_bia",
      render: (item: any) => (
        <>
          <Image width={100} src={`${BASE_URL}/${item}`} />
        </>
      ),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "ma_san_pham",
      key: "ma_san_pham",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten_san_pham",
      key: "ten_san_pham",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Danh mục",
      dataIndex: "ten_danh_muc",
      key: "ten_danh_muc",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (item: any) => <>{item}</>,
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
      key: "so_luong",
      width: 200,
      render: (item: any, me: any) => (
        <div>
          <FormInputNumber
            style={{ width: "100%" }}
            onChange={(value: number | null, values: string | null) => {
              const updatedDataSource = dataSource.map(
                (record): dataSourceInterface =>
                  record.key === me.key
                    ? { ...record, so_luong: value ?? 1 }
                    : record
              );
              setDataSource(updatedDataSource);
            }}
          />
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "don_gia",
      key: "don_gia",
      width: 200,
      render: (item: any, me: any) => (
        <div>
          <FormInputNumber
            afterPrefixIcon="VND"
            style={{ width: "100%" }}
            onChange={(value: number | null, values: string | null) => {
              const updatedDataSource = dataSource.map(
                (record): dataSourceInterface =>
                  record.key === me.key
                    ? { ...record, don_gia: value ?? 0 }
                    : record
              );
              setDataSource(updatedDataSource);
            }}
          />
        </div>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "thanh_tien",
      key: "thanh_tien",
      width: 200,
      render: (item: any, me: any) => (
        <div>
          <FormItemInput
            afterPrefixIcon="VND"
            value={(me.so_luong ?? 0) * (me.don_gia ?? 0)}
            disabled
          />
        </div>
      ),
    },
  ];

  //hàm xóa sản phẩm trong phiếu nhập
  const DeleteSanPhamTrongPhieuNhap = () => {};

  //hàm để mở ra modal thêm sản phẩm vào dataSource
  const handleOpenModalCustom = () => {
    // hàm này làm nhiệm vụ khi click vào thì mở ra 1 table danh sách sản phẩm và khi chọn vào các sản phẩm nào thì add sản phẩm đó vào dataSource
    setIsModalOpen(true);
  };

  const Items2 = [
    {
      key: "1",
      label: <span style={labelStyle}>Sản phẩm nhập kho</span>,
      children: (
        <div className="san-pham-nhap-kho">
          <TableCustom
            isCheckable={false}
            isEditOne={false}
            export_button={false}
            delete_button={false}
            columns={columns}
            dataSource={dataSource}
            handleDeleteCustom={DeleteSanPhamTrongPhieuNhap}
            handleOpenModalAddCustom={handleOpenModalCustom}
          />
        </div>
      ),
    },
  ];
  //#endregion

  //xử lý lưu thoogn tin nhập kho
  const handleOk = () => {
    form1
      .validateFields()
      .then((values) => {
        console.log("DataSource: ", dataSource);
        const data = {
          ma: values.ma_phieu_nhap,
          ngay_du_kien: values.ngay_du_kien,
          ngay_het_han: values.ngay_het_han,
          nha_cung_cap: values.nha_cung_cap,
          ghi_chu:values.ghi_chu,
          ls_san_phan_nhap_kho: dataSource
        };
        axiosConfig.post(`api/phieu-nhap-kho/create`, data)
        .then((res:any)=> {
          
        })
        .catch((err:any)=> {
          ShowToast("warning", "Thống báo", "Có lỗi xảy ra", 3)
        })
      })
      .catch((errorInfo) => {
        console.error("Validation failed: ", errorInfo);
      });
  };

  return (
    <MainLayout label={label}>
      <Spin spinning={loading}>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={() => false}
          items={Items1}
          style={{ marginBottom: "16px" }}
        />

        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={() => false}
          items={Items2}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <ButtonCustom
            text="Hủy"
            variant="outlined"
            style={{ width: "100px" }}
            onClick={() => {
              navigate(routesConfig.nhapKho);
            }}
          />
          <ButtonCustom
            text="Lưu"
            variant="solid"
            style={{ width: "100px" }}
            onClick={handleOk}
          />
        </div>
      </Spin>

      <Modal
        centered
        title="Chọn sản phẩm"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
        width={1200}
      >
        <ThemSanPhamVaoPhieuNhap
          onCancel={() => setIsModalOpen(false)}
          setDataSource={setDataSource}
        />
      </Modal>
    </MainLayout>
  );
};

export default ChiTietPhieuNhap;
