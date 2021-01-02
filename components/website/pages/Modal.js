import ApiPath from "modules/website/ApiPath";
import asset from "plugins/assets/asset";
import React, { useContext, useEffect, useState } from "react";
import CONFIG from "web.config";
import { ApiContext } from "../context/ApiProvider";
import useWindowSize from "../hook/useWindowSize";

export const Modal = ({ setStep, urlImageSharing, blobImageSharing, ...props }) => {
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const windowSize = useWindowSize();

  const context = useContext(ApiContext)

  useEffect(() => {
    // effect

    return () => {
      // cleanup
    }
  }, [])

  useEffect(() => {
    if (windowSize.width <= 480) {
      setResponsiveMobile(true);
    } else {
      setResponsiveMobile(false);
    }
  }, [windowSize]);


  const share = async (params) => {
    // context
    const formdata = new FormData();
    formdata.append("image", blobImageSharing, "imageshareing.png");
    console.log('formdata', formdata)
    const res = await context.post(ApiPath.generateCode, {
      params: formdata
    })

    if (res) {
      console.log(res.id);
    }

    const url = CONFIG.getBasePath() + `/admin/${res.id}`;

    await context.genQrCode(url);

    await shareFB();
    // blobImageSharing
  }

  const shareFB = (params) => {
    setStep(6);

  }

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  return (
    <div className="modal" id="modal">
      <div className="img">
        <img src={urlImageSharing} />
      </div>
      <div className="btnBlock">
        <button
          className="submitBtn"
          onClick={() => {
            share();
          }}
        >
          <div className="btnText">
            <span>
              <img src={asset("/images/fb.png")} />
              Chia sẻ lên trang cá nhân
            </span>
          </div>
        </button>
      </div>
      <style jsx>
        {`
          .modal {
            padding-top: 8%;
            padding-left: 8%;
            padding-right: 8%;
            height: calc(100vh + 8px);
            width: 103.5%;
            background: rgba(0, 0, 0, 0.7);
            position: absolute;
            top: -2%;
            left: -3%;
            z-index: 9;
            .img {
              border: 4px solid #fff;
              border-radius: 4px;
              width: 100%;
              max-width: 816px;
              margin: 3% auto;
              img {
                width: 100%;
              }
            }
            .btnBlock {
              text-align: center;
              height: 100%;
              max-height: 54px;
              margin: 0 auto;
              padding: 0 40%;
              position: relative;
              z-index: 10;
              .submitBtn {
                width: 100%;
                .btnText {
                  padding: 2% 0;
                  img {
                    width: 10%;
                    display: inline-block;
                    margin-right: 3%;
                    padding-bottom: 0;
                  }
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
};
