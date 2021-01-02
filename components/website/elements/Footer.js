import asset from "plugins/assets/asset";
import { useEffect, useState } from "react";
import useWindowSize from "../hook/useWindowSize";

function Footer({showBorder}) {
  
  return (
    <div className='footer' style={{display: `${showBorder ? 'block' : 'none'}`}}>
      <div className="bottle">
        <img src={asset("/images/bottle_updated 2.png")} />
      </div>
    </div>
  );
}

export default Footer;
