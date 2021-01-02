import React, { useContext } from "react";
import { ApiContext } from "@/components/website/context/ApiProvider";

export const WrapWithCam = () => {
  const context = useContext(ApiContext);
  const titleCurrent = context.list[context.titleIndex];
  return (
    <div className="wrapWithCam">
      <img src={titleCurrent.image} />
      <style jsx>
        {`
          .wrapWithCam {
              width: 100%;
              img{
                  width: 100%;
              }
          }
        `}
      </style>
    </div>
  );
};
