import Footer from "@/components/website/elements/Footer";
import Header from "@/components/website/elements/Header";
import Loading from "@/components/website/elements/Loading";
import MasterPageBasic from "@/components/website/master/MasterPageBasic";
import { AdminQR } from "@/components/website/pages/Admin/AdminQR";
import { SignIn } from "@/components/website/pages/Admin/SignIn";
import asset from "plugins/assets/asset";
import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";

const admin = () => {
  const [isLoaded, setisLoaded] = useState(false);
  const [_animateLoading, set_animateLoading] = useState({
    from: { opacity: 1, transform: "scale(1)" },
  });
  const animateLoading = useSpring(_animateLoading);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setisLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
      setisLoaded(false);
    }
  }, []);

  return (
    <MasterPageBasic>
      <Header></Header>
      {!isLoaded ? (
        <Loading animateLoading={animateLoading}></Loading>
      ) : (
        <div className="admin">
          <SignIn></SignIn>
        </div>
      )}
      <style jsx>{`
        .admin {
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
      `}</style>
    </MasterPageBasic>
  );
};

export default admin;
