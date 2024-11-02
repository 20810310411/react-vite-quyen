import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { FetchAllUserAPI } from "../../services/api.service";

const UserTable = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    console.log(">>> run useEffect");
    loadUser();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
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
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

  const loadUser = async () => {
    const res = await FetchAllUserAPI();
    setDataUsers(res.data);
  };

  return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};

export default UserTable;
