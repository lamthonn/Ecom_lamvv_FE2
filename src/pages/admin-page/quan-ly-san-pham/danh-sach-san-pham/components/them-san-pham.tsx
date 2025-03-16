import { Col, Collapse, Row, Typography, Upload } from "antd";
import MainLayout from "../../../../../layout/MainLayout";
import {PlusOutlined} from '@ant-design/icons';
import { CSSProperties, useState } from "react";
import ShowToast from "../../../../../components/show-toast/ShowToast";
import "./them-san-pham.scss"
import FormItemInput from "../../../../../components/form-input/FormInput";
import FormSelect from "../../../../../components/form-select/FormSelect";
import FormAreaCustom from "../../../../../components/text-area/FormTextArea";
const ThemSanPham:React.FC = () => {
    const labelStyle: CSSProperties = {
        fontWeight: 'bold',
        fontSize: '20px',
        color:"var(--color-primary-7)"
    };

    //thông tin sản phẩm
    const [fileList, setFileList] = useState([]);
    const [fileAnhBia, setFileAnhBia] = useState([]);
    const [tenSanPham, setTenSanPham] = useState<string>('')
    const [xuatXu, setXuatXu] = useState<string>('')
    const [danhMuc, setDanhMuc] = useState<string>('')
    const [moTa, setMoTa] = useState<string>('')

    //thông tin bán hàng

    const handleChange = ({ fileList }: any) => {
        if (fileList.length > 9) {
          ShowToast("warning", "Thông báo", "Tối đa có thể tải lên 9 ảnh", 3)
          return;
        }
        
        setFileList(fileList);
      };
    const handleChangeAnhBia = ({ fileList }: any) => {
        if (!fileList || fileList.length > 1) {
            ShowToast("warning", "Thông báo", "Tối đa có thể tải lên 1 ảnh", 3);
            return;
        }
        setFileAnhBia(fileList);
      };

    const Items1 = [
        {
          key: '1',
          label: <span style={labelStyle}>Thông tin cơ bản</span>,
          children: (
            <div className="thong-tin-san-pham">
                <Row gutter={22} className="anh-san-pham thong-tin-sp">
                    <Col span={4} className="label-sp">
                        <Typography.Text>Hình ảnh sản phẩm <span style={{color:"red"}}>*</span>:</Typography.Text>
                    </Col>
                    <Col span={20}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        accept="image/*"
                        onChange={handleChange}
                        beforeUpload={() => false} // Chặn upload ngay, chỉ xử lý trong React
                    >
                        {fileList.length < 9 && (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Thêm hình ảnh ({fileList.length}/9)</div>
                        </div>
                        )}
                    </Upload>
                    </Col>
                </Row>

                <Row gutter={22} className="anh-bia thong-tin-sp">
                    <Col span={4} className="label-sp">
                        <Typography.Text>Ảnh bìa <span style={{color:"red"}}>*</span>:</Typography.Text>
                    </Col>
                    <Col span={20}>
                    <Upload
                        listType="picture-card"
                        fileList={fileAnhBia}
                        accept="image/*"
                        onChange={handleChangeAnhBia}
                        beforeUpload={() => false} // Chặn upload ngay, chỉ xử lý trong React
                    >
                        {fileAnhBia.length < 1 && (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Thêm hình ảnh ({fileAnhBia.length}/1)</div>
                        </div>
                        )}
                    </Upload>
                    </Col>
                </Row>

                <Row gutter={22} className="ten-san-pham thong-tin-sp">
                    <Col span={4} className="label-sp">
                        <Typography.Text>Tên sản phẩm <span style={{color:"red"}}>*</span>:</Typography.Text>
                    </Col>
                    <Col span={20} >
                        <FormItemInput 
                            placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật" 
                            value={tenSanPham}
                            onChange={(e:any) => setTenSanPham(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row gutter={24} className="danh-muc-san-pham thong-tin-sp">
                    <Col span={4} className="label-sp">
                            <Typography.Text>Danh mục sản phẩm <span style={{color:"red"}}>*</span>:</Typography.Text>
                    </Col>
                    <Col span={20} >
                        <FormSelect 
                            selectType="selectApi"
                            src="/api/DanhMucSanPham/get-all"
                            labelField="ten_danh_muc"
                            valueField="id"
                            style={{width:"100%"}}
                            placeholder="Chọn danh mục sản phẩm"
                            value={danhMuc}
                            onChange={(val:string)=> setDanhMuc(val)}
                            allowClear = {true}
                        />
                    </Col>
                </Row>

                <Row gutter={24} className="xuat-xu-san-pham thong-tin-sp">
                    <Col span={4} className="label-sp">
                        <Typography.Text>Xuất xứ:</Typography.Text>
                    </Col>
                    <Col span={20} >
                        <FormItemInput 
                            placeholder="Nhập xuất xứ" 
                            value={xuatXu}
                            onChange={(e:any) => setXuatXu(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row gutter={24} className="mo-ta-san-pham thong-tin-sp">
                    <Col span={4} className="label-sp">
                        <Typography.Text>Mô tả sản phẩm <span style={{color:"red"}}>*</span>:</Typography.Text>
                    </Col>
                    <Col span={20} >
                        <FormAreaCustom 
                            placeholder="Nhập mô tả sản phẩm"
                            value={moTa}
                            onChange={(e: any) => setMoTa(e.target.value)}
                            style={{height:"200px"}}
                        />
                    </Col>
                </Row>
            </div>
          ),
        },
    ];

    const Items2 = [
        {
          key: '1',
          label: <span style={labelStyle}>Thông tin bán hàng</span>,
          children: (
            <div className="thong-tin-ban-hangss">
                
            </div>
          ),
        },
    ];
    return(<>
         <MainLayout label="Thêm mới sản phẩm">
         <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={() => false}
            items={Items1}
            style={{marginBottom:"16px"}}
        />

        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={() => false}
            items={Items2}
        />
         </MainLayout>
    </>)
}

export default ThemSanPham; 