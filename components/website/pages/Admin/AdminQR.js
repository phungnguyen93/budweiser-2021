import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiProvider";
import ApiPath from "modules/website/ApiPath";
import Modal from "antd/lib/modal/Modal";

export const AdminQR = () => {
  const router = useRouter();
  const context = useContext(ApiContext);
  const [qualify, setQualify] = useState(false);
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const isLogin = () => {
    const token = localStorage.getItem("token");
    return !isEmpty(token);
  };

  const getQrInfo = async () => {
    const token = localStorage.getItem("token");

    const res = await context.get(ApiPath.shareInfoById(router.query.id), {
      token,
    });
    console.log("getQRInfo", res);
    if (!isEmpty(res) || res != undefined) {
      res.data.status ? setQualify(true) : setQualify(false);
    } else {
      setQualify(false);
    }
  };

  const confirmQr = async () => {
    const token = localStorage.getItem("token");
    const res = await context.put(ApiPath.adminShareInfoById(id), { token });
    setVisible(true);
  };

  useEffect(() => {
    if (isLogin() && router.query.id) {
      getQrInfo();
    } else {
      router.push("/admin");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("qr", router.query.id);
    setId(router.query.id);
  }, [router.query.id]);

  return (
    <div className="adminQR">
      <div className="title">
        <p>{qualify ? "mã qr code hợp lệ" : "mã qr code không hợp lệ"}</p>
      </div>
      <div className="noti">
        <p>
          cám ơn bạn đã tham gia chương trình "bud trọn khát khao - khai xuân
          khởi sắc" cùng budweriser
        </p>
      </div>
      <div className="btnBlock">
        {qualify ? (
          <button className="submitBtn" onClick={confirmQr}>
            <div className="btnText">
              <span>xác nhận đổi quà</span>
            </div>
          </button>
        ) : (
          <button className="submitBtn">
            <div className="btnText">
              <span>Quét lại mã QR</span>
            </div>
          </button>
        )}
      </div>
      <Modal visible={visible} footer={null} centered={true}>
        <div className="noti">
          <p>Xác nhận thành công</p>
        </div>
        <div className="btnBlock">
          <button className="submitBtn" onClick={() => setVisible(false)}>
            <div className="btnText">Ok</div>
          </button>
        </div>
      </Modal>
      <style jsx>
        {`
          .adminQR {
            font-style: normal;
            font-weight: bold;
            height: 50%;
            position: relative;
            padding: 5% 0;
            .title {
              font-size: 24px;
              margin-bottom: 5%;
              text-align: center;
              text-transform: uppercase;
              background: -webkit-linear-gradient(
                50.02deg,
                #fdfbc0 18.45%,
                #f1cb80 64.21%,
                #f8d281 80.77%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .noti {
              font-size: 15px;
              text-align: center;
              text-transform: uppercase;
              color: #ffffff;
              margin-bottom: 5%;
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
