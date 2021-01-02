import Footer from "@/components/website/elements/Footer";
import Header from "@/components/website/elements/Header";
import useWindowSize from "@/components/website/hook/useWindowSize";
import MasterPageBasic from "@/components/website/master/MasterPageBasic";
import { GiftPlace } from "@/components/website/pages/GiftPlace";
import { GiftPlaceMobile } from "@/components/website/pages/GiftPlaceMobile";
import asset from "plugins/assets/asset";
import React, { useEffect, useState } from "react";

const DiaDiemNhanQua = () => {
  const [responsiveMobile, setResponsiveMobile] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 480) {
      setResponsiveMobile(true);
    } else {
      setResponsiveMobile(false);
    }
  }, [windowSize]);
  
  useEffect(() => {
    setTimeout(() => {
      const loader = document.querySelector('.loading');
      loader.className += ' hidden';
    }, 800);
      
  }, []);

  return (
    <MasterPageBasic>
      {responsiveMobile ? (
        <GiftPlaceMobile></GiftPlaceMobile>
      ) : (
        <GiftPlace></GiftPlace>
      )}
      <div className="loading">
        <div className="img">
          <img className="loadingLogo" src={asset("/images/logo.png")} />
        </div>
      </div>      
    </MasterPageBasic>
  );
};

export default DiaDiemNhanQua;
