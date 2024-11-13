import UserForm from "../components/user/form.user";
import UserTable from "../components/user/table.user";
import { useEffect, useState } from "react";
import { FetchAllUserAPI } from "../services/api.service";

const UsersPage = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  const loadUser = async () => {
    const res = await FetchAllUserAPI(current, pageSize);
    if (res.data){
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <div style={{padding: "20px"}}> 
      <UserForm loadUser={loadUser}/>
      <UserTable 
      dataUsers={dataUsers}
      loadUser={loadUser}
      current={current}
      pageSize={pageSize}
      total={total}
      setCurrent={setCurrent}
      setPageSize={setPageSize}
      />
    </div>
  );
};

export default UsersPage;
