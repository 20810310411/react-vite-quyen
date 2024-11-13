import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table, } from "antd";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import ViewUserDetail from "./view.user.detail";
import { DeleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
  const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return (
          <>
          {(index+1) + (current-1) * pageSize}
          </>
        );
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              setDataDetail(record);
              setIsDetailOpen(true);
            }}
            href="#"
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "25px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc chắn xóa user này?"
            onConfirm={() => {
              handleDeleteUser(record._id);
            }}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDeleteUser = async (id) => {
    const res = await DeleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete User",
        description: "Xóa User thành công!",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Error delete user",
        description: JSON.stringify(res.message)
      });
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // setCurrent, setPageSize
    // Nếu thay đổi số trang : current
    if (pagination && pagination.current){
      if(+pagination.current !== +current){
        setCurrent(+pagination.current)
      }
    }

    // Nếu thay đổi tổng số phần tử : pagesize
    if (pagination && pagination.pageSize){
      if(+pagination.pageSize !== +pageSize){
        setPageSize(+pagination.pageSize)
      }
    }
      
    console.log(">>> check ", pagination, filters, sorter, extra)
  }

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} 
        pagination={
          {
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} </div>)}
        }
      }
        onChange={onChange}
      />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <ViewUserDetail
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
