import { Button, Drawer, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import {
  handleUploadFile,
  UpdateUserAvatarAPI,
} from "../../services/api.service";

const ViewUserDetail = (props) => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateUserAvatar = async () => {
    // step 1: Upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      // success
      const newAvatar = resUpload.data.fileUploaded;
      // step 2: Update user
      const resUpdateAvatar = await UpdateUserAvatarAPI(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();

        notification.success({
          message: "Update User Avatar",
          description: "Cập nhật Avatar thành công!",
        });
      } else {
        notification.error({
          message: "Error update avatar",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
      console.log(">>> check newAvatar", newAvatar);
    } else {
      // false
      notification.error({
        message: "Error Upload File",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

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
          <div
            style={{
              marginTop: "10px",
              height: "100px",
              width: "150px",
              border: "1px solid #ccc",
            }}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                dataDetail.avatar
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="btnUpload"
              style={{
                display: "block",
                width: "fit-content",
                marginTop: "15px",
                padding: "5px 10px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Avatar
            </label>
            <input
              type="file"
              hidden
              id="btnUpload"
              // onChange={handleOnChangeFile}
              onChange={(event) => handleOnChangeFile(event)}
            />
          </div>
          {preview && (
            <>
              <div
                style={{
                  marginTop: "10px",
                  height: "100px",
                  width: "150px",
                  border: "1px solid #ccc",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={preview}
                />
                <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
                  Save
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <p>Không có dữ liệu</p>
        </>
      )}
    </Drawer>
  );
};

export default ViewUserDetail;
