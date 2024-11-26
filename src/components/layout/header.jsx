import { Link, NavLink } from "react-router-dom";
import {
  UsergroupAddOutlined,
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  LoginOutlined,
  AliwangwangOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { Children, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState("");

  const {user} = useContext(AuthContext)
  console.log("check user", user)

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <BookOutlined />,
    },

    ...(!user.id ? [{
      label: <Link to={"/login"}>Đăng nhập</Link>,
      key: "login",
      icon: <LoginOutlined />,
    }] : []),

    ...(user.id ? [{
      label: `Welcome MTF ${user.fullName}`,
      key: "settings",
      icon: <AliwangwangOutlined />,
      children: [
        {
          label: "Đăng xuất",
          key: "logout",
        },
      ],
    }] : []),
    
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
