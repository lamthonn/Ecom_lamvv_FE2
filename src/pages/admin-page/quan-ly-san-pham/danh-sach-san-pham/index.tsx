import { Col, Form, Row } from "antd";
import TableCustom from "../../../../components/table/table-custom";
import { formatDate } from "../../../../config/common";
import MainLayout from "../../../../layout/MainLayout";
import FormItemInput from "../../../../components/form-input/FormInput";
import DatePickerCustomOld from "../../../../components/datepicker/DatePickerCustomOld";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../../../routes/routes";

type DanhSachSanPhamProps = {

}

const DanhSachSanPham:React.FC<DanhSachSanPhamProps> = ({

}) => {
    const navigate = useNavigate();
    const columns = [
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
        },
        {
          title: "Mô tả",
          dataIndex: "mo_ta",
        },
        {
          title: "Giá sản phẩm",
          dataIndex: "gia",
          render: (item: any) => <>{item.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>,
        },
        {
          title: "Giá khuyến mãi",
          render: (item: any) => <>{item.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>,
          dataIndex: "khuyen_mai",
        },
        {
          title: "Số lượng",
          dataIndex: "khuyen_mai",
        },
        {
          title: "Trạng thái",
          dataIndex: "is_active ",
          render: (item: any) => <>{item === true ? "Hoạt động" : "Không hoạt động"}</>,
        },
        {
          title: "Ngày tạo",
          dataIndex: "created",
          render: (item: any) => <>{formatDate(item)}</>,
        },
      ];

    const handleAddSanPham =() => {
      navigate(`${routesConfig.themMoiSanPham}`)
    }
    return (
        <div>
            <MainLayout label="Quản lý danh sách sản phẩm">
                <TableCustom
                    columns={columns}
                    DeleteTitle="Xóa sản phẩm"
                    get_list_url="/api/DanhSachSanPham/get-all"
                    handleOpenModalAddCustom={handleAddSanPham}
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
                          <Form.Item name="ten_danh_muc">
                            <FormItemInput
                              label="Tên danh mục"
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
            </MainLayout>
        </div>
    )
}

export default DanhSachSanPham;