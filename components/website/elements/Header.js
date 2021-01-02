import Link from "next/link";
import { useRouter } from "next/router";
import asset from "plugins/assets/asset";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hook/useWindowSize";

export default function Header({ step, setStep }) {
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const windowSize = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (windowSize.width <= 480) {
      setResponsiveMobile(true);
    } else {
      setResponsiveMobile(false);
    }

    return () => {
      //clean up
      setResponsiveMobile(false);
    };
  }, [windowSize.width]);

  return (
    <div className="header">
      <div className="logoMenu">
        <div className="logo">
          <Link href="/">
            <img src={asset("/images/logo.png")} />
          </Link>
        </div>

        <div className="wrapNav">
          <div
            className="menuBlock"
            style={{
              display: `${router.asPath === "/admin" || step === 4 ? "none" : "block"}`,
            }}
          >
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                <li>
                  {router.asPath === "/" ? (
                    <div onClick={() => setStep(1)}>Trang chủ</div>
                  ) : (
                    <Link href="/">Trang chủ</Link>
                  )}
                </li>
                <li>
                  <Link href="/dia-diem-nhan-qua">Địa điểm nhận quà</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="menu">
          <ul>
            <li className={router.asPath === "/" ? "active-item" : "item"}>
              {router.asPath === "/" ? (
                <div onClick={() => setStep(1)}>Trang chủ</div>
              ) : (
                <Link href="/">Trang chủ</Link>
              )}
            </li>
            <li
              className={
                router.asPath === "/dia-diem-nhan-qua" ? "active-item" : "item"
              }
            >
              <Link href="/dia-diem-nhan-qua">Địa điểm nhận quà</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="headerText">
        {responsiveMobile ? (
          <>
            {step === 3 || step === 4 || step === 5 ? (
              <>
                <p className="year2020">2020 ấp ủ khát khao</p>
                <p className="year2021">2021 tôi sẽ</p>
              </>
            ) : (
              <p>
                bud trọn khát khao <br /> khai xuân khởi sắc
              </p>
            )}
          </>
        ) : (
          <>
            {router.asPath === "/dia-diem-nhan-qua" ? (
              ""
            ) : (
              <>
                <p className="year2020">2020 ấp ủ khát khao</p>
                <div className="img">
                  <img src={asset("/images/2021.png")} />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <style jsx>
        {`
          .headerText {
            text-align: ${step === 4 && "unset"};
            .img {
              margin: ${step === 4 && "unset"};
            }
          }
        `}
      </style>
    </div>
  );
}
