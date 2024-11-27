import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { FetchAllBookAPI } from "../../services/api.service";

const BookTable = () => {
  
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
          <a onClick={() => {
            // chuc nang
          }} href="#">
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (price) => {
        if (price)
            return Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price)
      }
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "25px" }}>
          <EditOutlined
            onClick={() => {
                // chuc nang
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc chắn xóa user này?"
            onConfirm={() => {
                // chuc nang
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

  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  const loadBook = async () => {
    const res = await FetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBook(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
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
  }

  return (
    <>
        <div style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <h3>Table Book</h3>
            <Button type="primary">Create Book</Button>
        </div>
      <Table columns={columns} dataSource={dataBook} rowKey={"_id"} 
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
    </>
  );
};

export default BookTable;
