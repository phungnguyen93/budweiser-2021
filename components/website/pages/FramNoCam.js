import asset from "plugins/assets/asset";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiProvider";

export const FramNoCam = ({ setStep }) => {
  const context = useContext(ApiContext);
  const titleCurrent = context.list[context.titleIndex];
  return (
    <div className="wrapNoCam animate animate__fadeInRight" id="wrapNoCam">
      <div className="blurText">
        <img src={titleCurrent.image} />
      </div>
      <div className="btnBlock">
        <button
          className="submitBtn"
          onClick={() => {
            setStep(5);
          }}
        >
          <div className="btnText">
            <span>Tạo lời tuyên thệ</span>
          </div>
        </button>
      </div>
      <style jsx>
        {`
          .wrapNoCam {
            position: relative;
            z-index: 5;
            .blurText {
              position: relative;
              width: 100%;
              max-width: 385px;
              img {
                width: 100%;
              }
            }
            .btnBlock {
              height: 100%;
              max-height: 54px;
              padding: 0 33%;
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};
