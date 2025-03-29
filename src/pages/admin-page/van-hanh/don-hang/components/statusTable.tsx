import React, { useEffect, useState } from "react";
import TableCustom from "../../../../../components/table/table-custom";
import { title } from "process";
import { axiosConfig, BASE_URL } from "../../../../../config/configApi";
import ShowToast from "../../../../../components/show-toast/ShowToast";
import { DropboxOutlined, InboxOutlined, SendOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { formatDate } from "../../../../../config/common";
import ButtonCustom from "../../../../../components/button/button";
import ShippingLabelModal from "./phieu-giao-hang";
import ShippingLabelModalDetail from "./detail";

type StatusTable = {
    trang_thai?:number
}
type DataTableInterface =  {
    id?: string;
    account_id?: string;
    dvvc_id?: string;
    ma_don_hang?: string;
    trang_thai?: number;
    ngay_mua?: string; // ISO string format for DateTime
    tong_tien?: number;
    thanh_tien?: number;
  }

const StatusTable:React.FC<StatusTable> = ({
    trang_thai
}) => {

    const columns = [
        {
            title:"Hình ảnh",
            dataIndex:"anh_dai_dien",
            render: (item: any) => (
                <div>
                  <Image width={70} src={`${BASE_URL}/${item}`} />
                </div>
              ),
        },
        {
            title:"Tổng hóa đơn",
            dataIndex:"thanh_tien",
            render:(text:any, record:any)=> <>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
        },
        {
            title:"Mã đơn hàng",
            dataIndex:"ma_don_hang",
            render:(text:any, record:any)=> (text)
        },
        {
            title:"Trạng thái",
            dataIndex:"trang_thai",
            render: (item: any) => (
                <>
                  {item === 1 ? (
                    <div className="status-field-3">Đơn mới</div>
                  ) : item === 2 ? (
                    <div className="status-field-4">Chờ lấy hàng</div>
                  ) :  item === 3 ? (
                    <div className="status-field-5">Đang giao hàng</div>
                  ) :  item === 4 ? (
                    <div className="status-field-1">Đã giao</div>
                  ) : <div className="status-field-2">Trả hàng/hủy</div>}
                </>
              ),
        },
        {
            title:"Ngày đặt",
            dataIndex:"created",
            render: (item: any) => {
                return <>{formatDate(item)}</>
            },
        },
    ]

    const [dataSource, setDataSource] = useState<DataTableInterface[]>([])
    const [recordDetail, setRecordDetail] = useState<any>()
    useEffect(()=> {
        axiosConfig.get(`${BASE_URL}/api/don-hang/get-all`,{
            params:{
                trang_thai: trang_thai
            }
        })
        .then((res:any)=> {
            setDataSource(res.data.items)
        })
        .catch((err:any)=> {
            ShowToast("error", "Thông báo", "có lỗi xảy ra", 3)
        })
    },[])

    const [isOpenModalInPhieu, setIsOpenModalInPhieu] = useState<boolean>(false);
    const [isOpenModalInPhieuDetail, setIsOpenModalInPhieuDetail] = useState<boolean>(false);
    const handleDongHang = (selectedRows:any) => {
        console.log(selectedRows);
    }

    const open = (data:any) => {
        setRecordDetail(data)
        setIsOpenModalInPhieuDetail(true);
    }

    return (
    <div>
        <TableCustom 
            columns={columns}
            dataSource={dataSource}
            add_button={false}
            delete_button={false}
            isDeleteOne={false}
            isEditOne={false}
            dieu_kien1={(me:any)=> me.trang_thai !== 4 && me.trang_thai !== 5}
            isViewDetail={true}
            setRecord={setRecordDetail}
            operationButtonCustom={
                <ButtonCustom
                    text="Giao hàng loạt"
                    onClick={handleDongHang}
                />
            }
            handleOpenModalEditCustom={open}
            otherAction={
                <SendOutlined
                    className="action-table-1"
                    onClick={()=> {setIsOpenModalInPhieu(true);}}
                />
            }
        />

        <ShippingLabelModal 
            isVisible={isOpenModalInPhieu}
            onClose={()=> {setIsOpenModalInPhieu(false)}}
            data = {recordDetail}
        />

        <ShippingLabelModalDetail 
            isVisible={isOpenModalInPhieuDetail}
            onClose={()=> {setIsOpenModalInPhieuDetail(false)}}
            data = {recordDetail}
        />

    </div>)
}

export default StatusTable;