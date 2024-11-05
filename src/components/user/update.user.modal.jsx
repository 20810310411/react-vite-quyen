import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import { UpdateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [_id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmitBtn = async () => {
    const res = await UpdateUserAPI(_id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "Update user",
        description: "Cập nhật user thành công",
      });
      resetAndCloseModel();
      await loadUser();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModel = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update a User"
      open={isModalUpdateOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => {
        resetAndCloseModel();
      }}
      maskClosable={false}
      okText={"SAVE"}
    >
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <div>
          <span>Id </span>
          <Input value={_id} disabled />
        </div>
        <div>
          <span>Full Name </span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Phone number </span>
          <Input
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
