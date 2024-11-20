import { FireFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Row,
  Col,
  Divider,
  message,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext)

  const onFinish = async (values) => {
    setLoading(true);
    const res = await LoginAPI(values.email, values.password);
    if (res.data) {
      message.success("Đăng nhập thành công");
      localStorage.setItem("access_token", res.data.access_token)
      setUser(res.data.user)
      navigate("/");
    } else {
      notification.error({
        message: "Error Login",
        description: JSON.stringify(res.message),
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={12} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solix #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng nhập</legend>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "Email không đúng định dạng!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="">Forgot password</a>
                </Flex>
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    loading={loading}
                    onClick={() => form.submit()}
                    type="primary"
                  >
                    Log in
                  </Button>
                  <Link to={"/"}>Go to homepage</Link>
                </div>
                <Divider />
                <div style={{ textAlign: "center" }}>
                  Chưa có tài khoản?{" "}
                  <Link to={"/register"}>Đăng ký tại đây</Link>
                </div>
              </Form.Item>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
