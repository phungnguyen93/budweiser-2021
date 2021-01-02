import { Select } from "antd";
import asset from "plugins/assets/asset";
import React from "react";
import Header from "../elements/Header";
import MasterPageBasic from "../master/MasterPageBasic";

export const GiftPlaceMobile = () => {
  const { Option } = Select;
  return (
    <MasterPageBasic>
      <Header></Header>
      <div className="giftPlace" id='giftPlaceMobile'>
        <div className="title animate animate__fadeInRight">
          <p>địa điểm nhận quà</p>
        </div>
        <div className="selectPlace animate animate__fadeInRight">
          <Select
            placeholder="chọn thành phố"
            suffixIcon={<img src={asset("/images/down-arrow.png")} />}
          >
            <Option value="hcm">Hồ Chí Minh</Option>
            <Option value="hn">Hà Nội</Option>
            <Option value="dn">Đà Nẵng</Option>
          </Select>
        </div>
        <div className="btnBlock animate animate__fadeInRight">
          <button className="submitBtn">
            <div className="btnText">
              <span>tìm kiếm</span>
            </div>
          </button>
        </div>
        <div className="placeInfo animate animate__fadeInRight">
          <div className="city">
            <p>thành phố hồ chí minh</p>
          </div>
          <div className="placeList">
            <div className="place">
              <p className="placeName">tên địa điểm</p>
              <p className="address">
                <img src={asset("/images/address.png")} />
                <span>
                  Magna sit ut esse laboris anim anim tempor excepteur ut esse
                  non fugiat.
                </span>
              </p>
              <p className="phone">
                <img src={asset("/images/phone.png")} />
                <span>1900-1080</span>
              </p>
            </div>
            <div className="place">
              <p className="placeName">tên địa điểm</p>
              <p className="address">
                <img src={asset("/images/address.png")} />
                <span>
                  Magna sit ut esse laboris anim anim tempor excepteur ut esse
                  non fugiat.
                </span>
              </p>
              <p className="phone">
                <img src={asset("/images/phone.png")} />
                <span>1900-1080</span>
              </p>
            </div>
            <div className="place">
              <p className="placeName">tên địa điểm</p>
              <p className="address">
                <img src={asset("/images/address.png")} />
                <span>
                  Magna sit ut esse laboris anim anim tempor excepteur ut esse
                  non fugiat.
                </span>
              </p>
              <p className="phone">
                <img src={asset("/images/phone.png")} />
                <span>1900-1080</span>
              </p>
            </div>
            <div className="place">
              <p className="placeName">tên địa điểm</p>
              <p className="address">
                <img src={asset("/images/address.png")} />
                <span>
                  Magna sit ut esse laboris anim anim tempor excepteur ut esse
                  non fugiat.
                </span>
              </p>
              <p className="phone">
                <img src={asset("/images/phone.png")} />
                <span>1900-1080</span>
              </p>
            </div>
            <div className="place">
              <p className="placeName">tên địa điểm</p>
              <p className="address">
                <img src={asset("/images/address.png")} />
                <span>
                  Magna sit ut esse laboris anim anim tempor excepteur ut esse
                  non fugiat.
                </span>
              </p>
              <p className="phone">
                <img src={asset("/images/phone.png")} />
                <span>1900-1080</span>
              </p>
            </div>
            <div className="place">
              <p className="placeName">tên địa điểm</p>
              <p className="address">
                <img src={asset("/images/address.png")} />
                <span>
                  Magna sit ut esse laboris anim anim tempor excepteur ut esse
                  non fugiat.
                </span>
              </p>
              <p className="phone">
                <img src={asset("/images/phone.png")} />
                <span>1900-1080</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .giftPlace {
            background: url(${asset("/images/dia-diem-nhan-qua-bg.png")})
              no-repeat center;
            background-size: 100% 100%;
            height: 100%;
            border: 10px solid #d61f38;
            padding: 43% 7%;
            padding-bottom: 0%;
            position: relative;
            font-style: normal;
            font-weight: bold;
            .title {
              margin-bottom: 3%;
              font-size: 30px;
              text-align: center;
              text-transform: uppercase;
              color: #ffffff;
            }
            .selectPlace {
              position: relative;
              z-index: 4;
            }
            .btnBlock {
              margin: 5% 0;
              height: 100%;
              max-height: 50px;
              display: flex;
              justify-content: center;
              z-index: 4;
            }
            .placeInfo {
              height: 68%;
              position: relative;
              z-index: 4;
              .city {
                font-size: 22px;
                text-transform: uppercase;
                color: #ffe5c4;
              }
              .placeList {
                height: 90%;
                overflow-y: scroll;
              }
              .place {
                padding: 3% 0;
                border-bottom: 1px solid #86000b;
                .placeName {
                  font-size: 17px;
                  text-transform: uppercase;
                  color: #ffffff;
                  margin-bottom: 2%;
                }
                .address,
                .phone {
                  display: flex;
                  margin-bottom: 2%;
                  text-transform: uppercase;
                  align-items: center;

                  img {
                    width: 4%;
                    margin-right: 3%;
                  }
                  span {
                    color: #fff;
                    font-size: 12px;
                  }
                }
              }
            }
          }
        `}
      </style>
    </MasterPageBasic>
  );
};
