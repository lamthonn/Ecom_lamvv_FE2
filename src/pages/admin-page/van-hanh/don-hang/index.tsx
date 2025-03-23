import React, { useState } from "react";
import MainLayout from "../../../../layout/MainLayout";
import { Spin } from "antd";
import TableCustom from "../../../../components/table/table-custom";

type DonHangProps = {

}

const DonHang:React.FC<DonHangProps> = ({

})=> {
    const [loading, setLoading] = useState<boolean>(false);

  return (
    <MainLayout label="Danh sách đơn hàng">
      <Spin spinning={loading}>
        <TableCustom 
            
        />
      </Spin>
    </MainLayout>
  );
}

export default DonHang;