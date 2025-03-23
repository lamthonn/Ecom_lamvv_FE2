import {
  Col,
  Divider,
  Form,
  Modal,
  Pagination,
  PaginationProps,
  Row,
  Skeleton,
  Space,
  Table,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import "./table-custom.scss";
import {
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { title } from "process";
import ButtonCustom from "../button/button";
import { axiosConfig } from "../../config/configApi";
import { create } from "domain";
import ShowToast from "../show-toast/ShowToast";
import SearchLayout from "../../layout/search-layout";
import FormItemInput from "../form-input/FormInput";
import { TableProps } from "antd/lib";
import { TableRowSelection } from "antd/es/table/interface";

type TableCustomProps = {
  //table
  columns?: ColumnsType<AnyObject>;
  setCurrent?: (val: any) => void;
  dataSource?: any;
  rowKey?: string;

  //action
  isViewDetail?: boolean;
  isEditOne?: boolean;
  isDeleteOne?: boolean;
  EditTitle?: string;
  DeleteTitle?: string;
  EditComponent?: React.ReactNode;
  width_edit?: number;
  action_width?: number;
  get_list_url?: string;
  edit_url?: string;
  add_url?: string;
  delete_one_url?: string;
  delete_any_url?: string;
  export_url?: string;
  handleOpenModalAddCustom?: () => void;

  //operation button
  add_button?: boolean;
  export_button?: boolean;
  delete_button?: boolean;
  isCheckable?: boolean;

  //MODAL
  isShowButtonEdit?: boolean;
  isShowButtonAdd?: boolean;

  //search
  searchComponent?: React.ReactNode;
};

const TableCustom: React.FC<TableCustomProps> = ({
  columns,
  setCurrent,
  dataSource,
  isViewDetail = false,
  isEditOne = true,
  isDeleteOne = true,
  handleOpenModalAddCustom,
  EditTitle,
  DeleteTitle,
  EditComponent,
  width_edit = 600,
  action_width = 100,
  add_button = true,
  export_button = true,
  delete_button = true,
  isCheckable = true,
  get_list_url,
  edit_url,
  add_url,
  delete_one_url,
  delete_any_url,
  isShowButtonEdit = true,
  isShowButtonAdd = true,
  searchComponent,
  rowKey = "id",
  export_url,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState<boolean>(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10); // Default page size
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [auth, setAuth] = useState<any | null>(null);
  const [dataTable, setDataTable] = useState<any>([]);

  //phân trang
  const [curentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalRecord, setTotalRecord] = useState<number>(1)

  useEffect(() => {
    const authValue = localStorage.getItem("auth");

    if (authValue) {
      const decoded = jwtDecode(authValue);
      setAuth(decoded);
    }
  }, []);

  //get data
  const getData = (curentPage:number, pageSize:number) => {
    setLoading(true);
    axiosConfig
      .get(get_list_url, {
      params: {
        pageNumber: curentPage,
        pageSize: pageSize,
      },
      })
      .then((res: any) => {
        setTotalRecord(res.data.totalRecord);
        setCurrentPage(res.data.pageIndex);
        setTotalPage(res.data.totalPages);
        setDataTable(res.data.items);
      })
      .catch((err: any) => {
      console.log("err::", err);
      })
      .finally(() => {
      setLoading(false);
      });
  };

  useEffect(() => {
    getData(curentPage, pageSize);
  }, []);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPageSize(pageSize);
    setCurrent?.(current);
    getData(current, pageSize)
  };

  //thay đổi pazeSize
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent?.(page);
    getData(page, pageSize)
  };

  //mở modal edit
  const [idEditRecord, setIdEditRecord] = useState<string | null>(null);
  const handleOpenEditModal = (data: any) => {
    console.log("data::", data);
    setIdEditRecord(data.id);
    form.setFieldsValue(data);
    setIsShowModalEdit(true);
  };

  //open add modal
  const handelOpenAddModal = () => {
    setIsShowModalAdd(true);
  };

  const handleOkAdd = () => {
    setLoading(true);
    formAdd
      .validateFields()
      .then((values) => {
        // Add data
        const data = formAdd.getFieldsValue();
        axiosConfig
          .post(add_url, {
            ...data,
            createdBy: auth?.tai_khoan ? `${auth.tai_khoan}` : "system",
          })
          .then((res: any) => {
            ShowToast("success", "Thông báo", "Thêm mới thành công", 3);
            // Load lại table
            getData(1, pageSize);
            // Clear form data
            formAdd.resetFields();
            setIsShowModalAdd(false);
          })
          .catch((err: any) => {
            ShowToast("error", "Thông báo", `Có lỗi xảy ra: ${err}`, 3);
          });
      })
      .catch((errorInfo) => {
        // Form validation failed
        ShowToast("error", "Thông báo", `Chưa nhập đủ dữ liệu`, 3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOkEdit = () => {
    //add data
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        // Add data
        const data = form.getFieldsValue();

        axiosConfig
          .put(`${edit_url}/${idEditRecord}`, {
            ...data,
            LastModifiedBy: auth?.tai_khoan ? `${auth.tai_khoan}` : "system",
          })
          .then((res: any) => {
            ShowToast("success", "Thông báo", "Sửa bản ghi thành công", 3);
            // Load lại table
            getData(curentPage, pageSize);
            setIsShowModalEdit(false);
          })
          .catch((err: any) => {
            ShowToast("error", "Thông báo", `Có lỗi xảy ra: ${err}`, 3);
          });
      })
      .catch((errorInfo) => {
        // Form validation failed
        ShowToast("error", "Thông báo", `Chưa nhập đủ dữ liệu`, 3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //delete one confirm
  const handleDeleteConfirm = (data: any) => {
    Modal.confirm({
      title: DeleteTitle ? DeleteTitle : "Xoá dữ liệu",
      centered: true,
      icon: <WarningOutlined />,
      content: <p>Bạn chắc chắn muốn xóa</p>,
      className: "modal-custom danger",
      okButtonProps: {
        className: "btn btn-filled--danger",
      },
      cancelButtonProps: {
        className: "btn btn-outlined",
      },
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => handleDeleteOne(data),
      onCancel: () => {},
    });
  };

  const handleDeleteOne = (record: any) => {
    //xóa 1
    setLoading(true);
    axiosConfig
      .delete(`${delete_one_url}/${record.id}`)
      .then((res: any) => {
        ShowToast("success", "Thông báo", "Xóa bản ghi thành công", 3);
        getData(curentPage, pageSize);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", `Có lỗi xảy ra: ${err}`, 3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteAny = () => {
    // Ensure selectedRowKeys is not empty
    if (selectedRowKeys.length === 0) {
      ShowToast("error", "Thông báo", "Không có bản ghi nào được chọn", 3);
      return;
    }

    const requestData = selectedRowKeys; // Directly use selectedRowKeys as the request data
    setLoading(true);
    //xóa nhiều
    axiosConfig
      .delete(`${delete_any_url}`, {
        data: requestData,
      })
      .then((res: any) => {
        ShowToast("success", "Thông báo", "Xóa bản ghi thành công", 3);
        getData(curentPage, pageSize);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", `Có lỗi xảy ra: ${err}`, 3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //delete any confirm
  const handleDeleteAnyConfirm = () => {
    Modal.confirm({
      title: DeleteTitle ? DeleteTitle : "Xoá dữ liệu",
      centered: true,
      icon: <WarningOutlined />,
      content: <p>Bạn chắc chắn muốn xóa</p>,
      className: "modal-custom danger",
      okButtonProps: {
        className: "btn btn-filled--danger",
      },
      cancelButtonProps: {
        className: "btn btn-outlined",
      },
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: handleDeleteAny,
      onCancel: () => {},
    });
  };


  const customColumn = [
    {
      title: "STT",
      dataIndex: "stt",
      fixed: 'left' as 'left',
      key: "stt",
      width: 5,

      render: (text: string, record: any, index: number) =>
        ((curentPage ?? 1) - 1) * pageSize + index + 1,
    },
    ...(columns || []),
    {
      title: "Thao tác",
      key: "action",
      width: action_width,
      fixed: 'right' as 'right',
      render: (text: any, record: any) => (
        <div className="action-table">
          {isViewDetail ? (
            <EyeOutlined
              className="action-table-edit"
              onClick={() => handleOpenEditModal(record)}
            />
          ) : null}

          {isEditOne ? (
            <EditOutlined
              className="action-table-edit"
              onClick={() => handleOpenEditModal(record)}
            />
          ) : null}

          {isDeleteOne ? (
            <DeleteOutlined
              className="action-table-delete"
              onClick={() => handleDeleteConfirm(record)}
            />
          ) : null}
        </div>
      ),
    },
  ];

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log(selectedRowKeys);

      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      // Customize the checkbox properties if needed
      disabled: record.disabled, // Example: Disable checkbox for specific rows
    }),
  };

  const handleSearch = () => {
    setLoading(true);
    const dataQuery = formSearch.getFieldsValue();
    if (dataQuery.created) {
      const [fromdate, todate] = dataQuery.created;
      dataQuery.fromDate = fromdate ? fromdate.format("YYYY-MM-DD") : undefined;
      dataQuery.toDate = todate ? todate.format("YYYY-MM-DD") : undefined;
      delete dataQuery.created; // Remove the original created field
    }

    axiosConfig
      .get(get_list_url, { params: dataQuery })
      .then((res: any) => {
        setDataTable(res.data.items);
      })
      .catch((err: any) => {
        console.log("err::", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handelExportExcel = async () => {
    await axiosConfig
      .post(`${export_url}`,dataSource ? dataSource : dataTable, { responseType: "blob" })
      .then((res: any) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err: any) => {
        console.log("err::", err);
      });
  };

  const [formSearch] = Form.useForm();
  return (
    <div className="table-custom">
      {/* thêm formFilter vào đây */}
      <SearchLayout
        //children truyền từ ngoài vào
        children={<Form form={formSearch}>{searchComponent}</Form>}
        handleSearch={handleSearch}
      />

      <Space className="operation-button">
        {add_button ? (
          <ButtonCustom text="Thêm mới" onClick={handleOpenModalAddCustom ? handleOpenModalAddCustom : handelOpenAddModal} />
        ) : null}
        {export_button ? (
          <ButtonCustom
            text="Xuất excel"
            variant="outlined"
            onClick={handelExportExcel}
          />
        ) : null}
        {delete_button ? (
          <ButtonCustom
            text="Xóa"
            variant="outlined"
            className="btn-custom-delete"
            onClick={handleDeleteAnyConfirm}
          />
        ) : null}
      </Space>
      <Skeleton loading={loading}>
        <Table
          className="table-custom-style"
          columns={customColumn}
          scroll={{ x: 'max-content' }}
          dataSource={dataSource ? dataSource : dataTable}
          bordered
          rowKey={(record) => record[`${rowKey}`]}
          pagination={false}
          rowSelection={isCheckable ? rowSelection : undefined}
          footer={() => (
            <Pagination
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              align="end"
              current={curentPage}
              total={totalRecord}
              pageSize={pageSize}
              showSizeChanger
            />
          )}
        />
      </Skeleton>
      {/* modal edit */}
      <Modal
        title={
          <div>
            {EditTitle ? EditTitle : "Chỉnh sửa dữ liệu"}
            <Divider />
          </div>
        }
        open={isShowModalEdit}
        onCancel={() => setIsShowModalEdit(false)}
        centered
        width={width_edit}
        footer={
          isShowButtonEdit ? (
            <Space className="modal-footer-custom">
              <ButtonCustom
                text="Huỷ"
                variant="outlined"
                onClick={() => setIsShowModalEdit(false)}
              />
              <ButtonCustom text="Lưu" variant="solid" onClick={handleOkEdit} />
            </Space>
          ) : (
            false
          )
        }
      >
        <Form form={form}>{EditComponent}</Form>
      </Modal>

      {/* modal add */}
      <Modal
        title={
          <div>
            {EditTitle ? EditTitle : "Thêm mới dữ liệu"}
            <Divider />
          </div>
        }
        open={isShowModalAdd}
        onCancel={() => {
          setIsShowModalAdd(false);
        }}
        centered
        width={width_edit}
        footer={
          isShowButtonAdd ? (
            <Space className="modal-footer-custom">
              <ButtonCustom
                text="Huỷ"
                variant="outlined"
                onClick={() => setIsShowModalAdd(false)}
              />
              <ButtonCustom text="Lưu" variant="solid" onClick={handleOkAdd} />
            </Space>
          ) : (
            false
          )
        }
      >
        <Form form={formAdd}>{EditComponent}</Form>
      </Modal>
    </div>
  );
};

export default TableCustom;
