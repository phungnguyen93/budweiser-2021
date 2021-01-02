import Header from "@/components/website/elements/Header";
import MasterPageBasic from "@/components/website/master/MasterPageBasic";
import { AdminQR } from "@/components/website/pages/Admin/AdminQR";
import asset from "plugins/assets/asset";
import React from "react";

const checkQrCode = () => {
  return (
    <MasterPageBasic>
      <Header></Header>
      <div className="adminQrCheck">
        <AdminQR></AdminQR>
      </div>
      <style jsx>
        {`
          .adminQrCheck {
            background: url(${asset(
                "/images/Budweiser_homepage_BG_mobile_admin.png"
              )})
              no-repeat center;
            background-size: 100% 100%;
            width: 100%;
            height: 100%;
            border: 10px solid #d61f38;
            padding: 45% 8%;
          }
        `}
      </style>
    </MasterPageBasic>
  );
};

export default checkQrCode;
