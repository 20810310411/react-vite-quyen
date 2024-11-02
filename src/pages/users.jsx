import UserForm from "../components/user/form.user";
import UserTable from "../components/user/table.user";
import { useEffect, useState } from "react";
import { FetchAllUserAPI } from "../services/api.service";

const UsersPage = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await FetchAllUserAPI();
    setDataUsers(res.data);
  };

  return (
    <div style={{padding: "20px"}}> 
      <UserForm loadUser={loadUser}/>
      <UserTable dataUsers={dataUsers}/>
    </div>
  );
};

export default UsersPage;
