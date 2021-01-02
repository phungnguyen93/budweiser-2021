import { Form, Select, Modal } from "antd";
import asset from "plugins/assets/asset";
import React, { useEffect, useState } from "react";
import useWindowSize from "../hook/useWindowSize";
import Cleave from "cleave.js/react";

export const InfoPage = (props) => {
  const { setStep } = props;

  const { Option } = Select;

  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const windowSize = useWindowSize();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (windowSize.width <= 480) {
      setResponsiveMobile(true);
    } else {
      setResponsiveMobile(false);
    }
  }, [windowSize]);

  const calculate_age = (dob1) => {
    var today = new Date();
    //split '-' from string dob1
    const newStr = dob1.split('-');
    //format string dob1 from DD-MM-YYYY to YYYY-MM-DD
    const newDob = `${newStr[2]}-${newStr[1]}-${newStr[0]}`
    var birthDate = new Date(newDob); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const onFinish = (values) => {
    const age = calculate_age(values.dob);
    if (age >= 21) {
      setStep(2);
    } else {
      setVisible(true);
    }
  };

  return (
    <div className="infoPage animate animate__fadeInRight" id="infoPage">
      <p className={`title ${responsiveMobile ? "" : "titleDesktop"}`}>
        bạn đã trên 21 tuổi chưa?
      </p>
      <p className="extra">
        {responsiveMobile
          ? "Vui lòng nhập ngày tháng năm sinh của bạn"
          : "Vui lòng nhập thông tin của bạn"}
      </p>
      <Form form={form} onFinish={onFinish}>
        <div className="inputGroup">
          <Form.Item
            name="dob"
            rules={[{ required: true, message: "Missing Date of Birth" }]}
          >
            <div className="inputBirthday">
              <Cleave
                className="birthdayBlock"
                placeholder="DD | MM | YYYY"
                options={{
                  date: true,
                  datePattern: ["d", "m", "Y"],
                  delimiter: "-",
                }}
                // onChange={this.onChange.bind(this)}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="area"
            rules={[{ required: true, message: "Please select your area!" }]}
          >
            {/* <div className="selectPlace"> */}
            <Select
              className="selectPlace"
              placeholder="bạn sống ở thành phố nào"
              suffixIcon={<img src={asset("/images/down-arrow.png")} />}
            >
              <Option value="hcm">Hồ Chí Minh</Option>
              <Option value="hn">Hà Nội</Option>
              <Option value="dn">Đà Nẵng</Option>
            </Select>
            {/* </div> */}
          </Form.Item>
        </div>
        <Form.Item>
          <div className="btnBlock">
            <button className="submitBtn" htmltype="submit">
              <div className="btnText">
                <span>tiến vào</span>
              </div>
            </button>
          </div>
        </Form.Item>
      </Form>
      <Modal visible={visible} footer={null} centered={true}>
        <div className="noti">
          <p>Bạn chưa đủ tuổi!</p>
        </div>
        <div className="btnBlock">
          <button className="submitBtn" onClick={() => setVisible(false)}>
            <div className='btnText'>Ok</div>
          </button>
        </div>
      </Modal>
      <style jsx>
        {`
          .infoPage {
            color: #fff;
            height: 50%;
            padding: 0;
            position: relative;
            z-index: 4;
            .title {
              font-size: 24px;
              font-style: normal;
              font-weight: bold;
              text-align: center;
              text-transform: uppercase;
              margin-bottom: 15px;
            }
            .titleDesktop {
              font-size: 40px;
              line-height: 50px;
              background: -webkit-linear-gradient(
                50.02deg,
                #fdfbc0 18.45%,
                #f1cb80 64.21%,
                #f8d281 80.77%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .extra {
              font-style: normal;
              font-weight: bold;
              font-size: 18px;
              text-align: center;
              margin-bottom: 5%;
            }
            .inputGroup {
              height: 100%;
              padding: 0 9%;
              .inputBirthday {
                margin-bottom: 4%;
                height: 100%;
                max-height: 54px;
              }
              .selectPlace {
                height: 100%;
                max-height: 54px;
              }
            }
            .btnBlock {
              display: flex;
              justify-content: center;
              height: 100%;
              max-height: 54px;
              position: relative;
              z-index: 10;
            }
          }
        `}
      </style>
    </div>
  );
};
