import asset from "plugins/assets/asset";
import React, { useEffect, useState } from "react";
import useWindowSize from "../hook/useWindowSize";

export const Intro = (props) => {
  const { setStep } = props;
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 480) {
      setResponsiveMobile(true);
    } else {
      setResponsiveMobile(false);
    }
  }, [windowSize]);

  return (
    <div className="wrapIntro animate animate__fadeInRight" id="wrapIntro">
      <div className="smallTitle">
        <p className={responsiveMobile ? "" : "smallTitleDesk"}>
          tuyên thệ khát khao cho tết vươn cao với bud để có cơ hội nhận ngay
        </p>
      </div>
      <div className="largeTitle">
        {/* <div className="img">
          <div></div>
          <img src={asset("/images/thumb-nail.gif")} />
        </div> */}
        {responsiveMobile ? (
          <img src={asset("/images/phien-ban-budweiser.png")} />
        ) : (
          <img src={asset("/images/phien-ban-budweiser-desk.png")} />
        )}
      </div>
      <div className="btnBlock">
        <button
          className="submitBtn"
          onClick={() => {
            setStep(3);
          }}
        >
          <div className="btnText">
            <span>trải nghiệm ngay</span>
          </div>
        </button>
      </div>
      <style jsx>
        {`
          .wrapIntro {
            height: 48%;
            text-transform: uppercase;
            text-align: center;
            position: relative;
            z-index: 4;
            .smallTitle {
              font-style: normal;
              font-weight: bold;
              font-size: 36px;
              line-height: 45px;
              color: #fdfbc0;
              padding: 0 17%;
              margin-bottom: 7px;
              .smallTitleDesk {
                background: -webkit-linear-gradient(
                  50.02deg,
                  #fdfbc0 18.45%,
                  #f1cb80 64.21%,
                  #f8d281 80.77%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            .largeTitle {
              position: relative;
              margin-bottom: 40px;
              img{
                width: 100%;
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
