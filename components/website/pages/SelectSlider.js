import asset from "plugins/assets/asset";
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import useWindowSize from "../hook/useWindowSize";
import { ApiContext } from "../context/ApiProvider";



export const SelectSlider = ({ setStep }) => {
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const windowSize = useWindowSize();

  const context = useContext(ApiContext)

  useEffect(() => {
    console.log(context.list)
    // setlistTitle(context.list)
    return () => {
      // cleanup
    }
  }, [context.list])

  useEffect(() => {
    if (windowSize.width <= 480) {
      setResponsiveMobile(true);
    } else {
      setResponsiveMobile(false);
    }
  }, [windowSize]);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        src={asset("/images/slider-down-arrow.png")}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        src={asset("/images/slider-up-arrow.png")}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    centerMode: true,
    verticalSwiping: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: function (currentSlide) {
      context.choosingTitle(currentSlide);
      console.log("after change", currentSlide);
    },
  };

  return (
    <div className="wrapSelect animate animate__fadeInRight" id='wrapSelect'>
      <Slider {...settings}>

        {context.list ?
          context.list.map((item, index) => {
            return <div key={item.id}>
              <p><span>{item.name}</span> </p>
            </div>
          })
          :
          <div></div>
        }
        {/* 
        <div>
          <p>
            <span>Khám phá tây bắc</span>
          </p>
        </div>
        <div>
          <p>
            <span>chinh phục một vùng đất mới</span>
          </p>
        </div>
        <div>
          <p>
            <span>thử sức với một cuộc thi âm nhạc hay thể thao</span>
          </p>
        </div>
        <div>
          <p>
            <span>tập luyện thường xuyên để rèn luyện bản thân</span>
          </p>
        </div>
        <div>
          <p>
            <span>thành công ở công việc mới</span>
          </p>
        </div>
        <div>
          <p>
            <span>chinh phục một vùng đất mới</span>
          </p>
        </div>
        <div>
          <p>
            <span>khai xuân khởi sắc</span>
          </p>
        </div> */}
      </Slider>
      <div className="btnBlock">
        <button
          className="submitBtn"
          onClick={() => {
            setStep(4);
          }}
        >
          <div className="btnText">
            <span>chọn lời tuyên thệ</span>
          </div>
        </button>
      </div>
      <style jsx>
        {`
          .wrapSelect {
            height: 50%;
            position: relative;
            padding: 0 8%;
            z-index: 4;
            .btnBlock {
              position: relative;
              z-index: 10;
              width: 100%;
              height: 100%;
              max-height: 54px;
              bottom: -15%;
              left: 0;
              margin-top: 13%;
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};
