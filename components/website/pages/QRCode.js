import Link from "next/link";
import asset from "plugins/assets/asset";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiProvider";
import useWindowSize from "../hook/useWindowSize";

export const QRCode = () => {
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const windowSize = useWindowSize();

  const context = useContext(ApiContext);


  useEffect(() => {
    if (windowSize.width <= 480) {
      setResponsiveMobile(true);
    } else {
      setResponsiveMobile(false);
    }
  }, [windowSize]);

  return (
    <div className="qrCode animate animate__fadeInRight" id="qrCode">
      <div className="thanks">
        {responsiveMobile ? (
          <p>
            cám ơn bạn đã tạo quyết tâm cùng budweiser. Hãy lưu mã qr và chọn
            địa điểm nhận quà từ budweiser nhé.
          </p>
        ) : (
            <p>
              cám ơn bạn đã tạo quyết tâm cùng budweiser. Hãy quan tâm đến
              budweiser trên zalo, sau đó tải lên qr code bên dưới để thu thập 9
              lộc đỏ đặc biệt. hoặc chụp ảnh màn hình để lưu mã qr
            </p>
          )}
      </div>
      <div className="qr">
        <img src={context.urlBlobImageSharing} />
      </div>
      <div className="btnGroup">
        <div className="btnBlock">
          <button className="submitBtn">
            <div className="btnText">
              <a href={context.urlBlobImageSharing} download={true} > <span>tải mã qr </span></a>
            </div>
          </button>
        </div>
        <div className="btnBlock">
          <Link href="/dia-diem-nhan-qua">
            <button className="submitBtn">
              <div className="btnText">
                <span>chọn địa điểm nhận quà </span>
              </div>
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .qrCode {
          height: 70%;
          position: relative;
          z-index: 4;
          .thanks {
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 23px;
            text-align: center;
            text-transform: uppercase;
            color: #ffffff;
            padding: 0 11%;
          }
          .qr {
            width: 100%;
            max-width: 220px;
            margin: 5% auto;
          }
          .btnGroup {
            display: flex;
            height: 100%;
            max-height: 54px;
          }
          .btnBlock {
            width: 100%;
            height: 100%;
            max-height: 54px;
            margin: 4% auto;
            display: flex;
            justify-content: center;

            .submitBtn {
              width: 70%;
              .btnText{
                a{
                  color: #fff;
                }
              }
            }
          }
        }
      `}</style>
    </div>
  );
};
