import { Select } from "antd";
import asset from "plugins/assets/asset";
import React from "react";
import Header from "../elements/Header";
import MapContainer from "../elements/MapContainer";

export const GiftPlace = () => {
  const { Option } = Select;

  return (
    <div className="giftPlace" id="giftDesk">
      <Header></Header>
      <div className="title">
        <p>địa điểm nhận quà</p>
      </div>
      <div className="searchPlace">
        <div className="searchBlock">
          <Select
            placeholder="chọn thành phố"
            suffixIcon={<img src={asset("/images/down-arrow.png")} />}
          >
            <Option value="hcm">Hồ Chí Minh</Option>
            <Option value="hn">Hà Nội</Option>
            <Option value="dn">Đà Nẵng</Option>
          </Select>
        </div>
        <div className="searchBlock">
          <Select
            placeholder="chọn quận/huyện"
            suffixIcon={<img src={asset("/images/down-arrow.png")} />}
          >
            <Option value="q1">Quận 1</Option>
            <Option value="q2">Quận 2</Option>
            <Option value="q3">Quận 3</Option>
          </Select>
        </div>
        <div className="searchBlock">
          <div className="btnBlock">
            <button className="submitBtn">
              <div className="btnText">
                <span>tìm địa điểm</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="placeBlock">
        <div className="leftBlock">
          <div className="placeInfo">
            <div className="city">
              <p>
                <img src={asset("/images/bud-icon.png")} />
                <span>Quận 1</span>
              </p>
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
        <div className="rigthBlock">
          <MapContainer></MapContainer>
        </div>
      </div>
      <style jsx>
        {`
          .giftPlace {
            background: url(${asset("/images/dia-diem-nhan-qua-bg-desk.png")})
              no-repeat center;
            background-size: 100% 100%;
            height: 100%;
            border: 10px solid #d61f38;
            padding: 2% 8%;
            padding-bottom: 0%;
            position: relative;
            font-style: normal;
            font-weight: bold;
            .title {
              font-size: 40px;
              line-height: 50px;
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
              margin-bottom: 50px;
              margin-top: 5%;
            }
            .searchPlace {
              display: flex;
              height: 100%;
              max-height: 54px;
              padding: 0 13%;
              .searchBlock {
                width: 33%;
                margin-right: 20px;
                height: 100%;
                .btnBlock {
                  height: 100%;
                  margin-left: 10px;
                  .submitBtn {
                    width: 64%;
                    font-size: 18px;
                  }
                }
              }
            }
            .placeBlock {
              margin-top: 2%;
              padding: 0 5%;
              height: 55%;
              display: flex;
              .leftBlock {
                width: 27%;
                height: 100%;
                margin-right: 5%;
                .placeInfo {
                  height: 100%;
                  .city {
                    font-size: 24px;
                    line-height: 30px;
                    text-transform: uppercase;
                    color: #000;
                    margin-bottom: 5%;
                    img {
                      display: inline-block;
                      width: 12%;
                      margin-right: 5px;
                    }
                  }
                  .placeList {
                    height: 100%;
                    overflow-y: scroll;
                    margin-right: 5%;
                    &::-webkit-scrollbar {
                      background-color: #000;
                      height: 40px;
                      width: 4px;
                    }
                    &::-webkit-scrollbar-thumb {
                      background-color: #fff;
                    }
                  }
                  .place {
                    margin-bottom: 5%;
                    padding-bottom: 5%;
                    border-bottom: 1px solid #c30029;
                    .placeName {
                      font-size: 18px;
                      line-height: 23px;
                      text-transform: uppercase;
                      color: #ffe5c4;
                      margin-bottom: 2%;
                    }
                    .address,
                    .phone {
                      display: flex;
                      margin-bottom: 2%;
                      text-transform: uppercase;

                      img {
                        width: 5%;
                        height: 100%;
                        margin-right: 15px;
                      }
                      span {
                        color: #fff;
                        font-size: 14px;
                        line-height: 18px;
                      }
                    }
                  }
                }
              }
              .rigthBlock {
                width: 68%;
                height: 100%;
              }
            }
          }
        `}
      </style>
    </div>
  );
};
