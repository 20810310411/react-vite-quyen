import UserForm from "../components/user/form.user";
import UserTable from "../components/user/table.user";

const UsersPage = () => {
  return (
    <div style={{padding: "20px"}}> 
      <UserForm />
      <UserTable />
    </div>
  );
};

export default UsersPage;
