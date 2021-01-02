import React, { useContext, useEffect, useState } from "react";
import { Input, Form, Modal } from "antd";
import { ApiContext } from "../../context/ApiProvider";
import ApiPath from "modules/website/ApiPath";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

export const SignIn = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const context = useContext(ApiContext);
  const [id, setId] = useState("");

  const onFinish = async (values) => {
    const res = await context.post(ApiPath.login, {
      params: { email: values.id, password: values.pass },
    });
    if (isEmpty(res)) {
      setVisible(true);
    } else {
      localStorage.setItem("token", res.token);
      router.push(`/admin/${id}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("qr");
    if(id){
      setId(id);
    }
    if (token) {
      if (id) router.push(`/admin/${id}`);
    }
  }, []);

  return (
    <div className="signIn" id="signIn">
      <div className="title">
        <p>Đăng nhập</p>
      </div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="id"
          rules={[{ required: true, message: "Missing ID" }]}
        >
          <Input placeholder="tên đăng nhập" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="pass"
          rules={[{ required: true, message: "Missing Pass" }]}
        >
          <Input.Password placeholder="mật khẩu" autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <div className="btnBlock">
            <button className="submitBtn" htmltype="submit">
              <div className="btnText">
                <span> Đăng nhập</span>
              </div>
            </button>
          </div>
        </Form.Item>
      </Form>
      <Modal visible={visible} footer={null} centered={true}>
        <div className="noti">
          <p>Tài khoản không đúng!</p>
        </div>
        <div className="btnBlock">
          <button className="submitBtn" onClick={() => setVisible(false)}>
            <div className="btnText">Ok</div>
          </button>
        </div>
      </Modal>
      <style jsx>
        {`
          .signIn {
            margin-top: 20%;
            height: 50%;
            padding: 5%;
            .title {
              font-style: normal;
              font-weight: bold;
              font-size: 40px;
              text-align: center;
              text-transform: uppercase;
              color: #ffffff;
              margin-bottom: 5%;
            }
            .inputGroup {
              margin-bottom: 5%;
              .inputBlock:first-child {
                margin-bottom: 5%;
              }
            }
            .btnBlock {
              height: 100%;
              max-height: 50px;
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};
