import { Button, Drawer } from "antd";
import { Content } from "antd/es/layout/layout";

const ViewUserTable = (props) => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;
  return (
    <Drawer
      width={"40vw"}
      title="Chi tiết User"
      open={isDetailOpen}
      onClose={() => {
        setDataDetail(null);
        setIsDetailOpen(false);
      }}
    >
      {dataDetail ? (
        <>
          <p>Id: {dataDetail._id}</p>
          <br />
          <p>Full Name: {dataDetail.fullName}</p>
          <br />
          <p>Email: {dataDetail.email}</p>
          <br />
          <p>Phone number: {dataDetail.phone}</p>
          <br />
          <p>Avatar: </p>
          <div>
            <img height={"250px"} width={"300px"}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}/>
          </div>
          <div>
            <label htmlFor="btnUpload"
            style={{
              display: "block",
              width: "fit-content",
              marginTop: "15px", 
              padding: "5px 10px",
              background: "orange",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            >Upload Avatar</label>
            <input type="file" hidden id="btnUpload"/>
          </div>
          {/* <Button type="primary">Upload Avatar</Button> */}
        </>
      ) : (
        <>
          <p>Không có dữ liệu</p>
        </>
      )}
    </Drawer>
  );
};

export default ViewUserTable;
