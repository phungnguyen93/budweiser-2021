// import CONFIG from "web.config";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
import MasterPageBasic from "@/components/website/master/MasterPageBasic";
import Header from "@/components/website/elements/Header";
import asset from "plugins/assets/asset";
import Footer from "@/components/website/elements/Footer";
import { InfoPage } from "@/components/website/pages/InfoPage";
import { useEffect, useRef, useState } from "react";
import { Intro } from "@/components/website/pages/Intro";
import { SelectSlider } from "@/components/website/pages/SelectSlider";
import { FramNoCam } from "@/components/website/pages/FramNoCam";
import { Modal } from "@/components/website/pages/Modal";
import { QRCode } from "@/components/website/pages/QRCode";
import { WrapWithCam } from "@/components/website/pages/WrapWithCam";
import useWindowSize from "@/components/website/hook/useWindowSize";
import CanvasScene from "modules/three/CanvasScene";
import Button from "@/components/diginext/button/Button";
import { IsProd } from "plugins/utils/ConfigLive";
import { useSpring, animated } from "react-spring";
import Loading from "@/components/website/elements/Loading";
import { isWebcamSupport } from "plugins/utils/Camera";

const testStep = [1, 2, 3, 4, 5, 6];

export default function Home(props) {
  const [step, setStep] = useState(1);
  const [blurOn, setBlurOn] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [showBorder, setshowBorder] = useState(true);

  const [urlImageSharing, seturlImageSharing] = useState("");
  const [blobImageSharing, setBlobImageSharing] = useState({});

  const [_animateLoading, set_animateLoading] = useState({
    from: { opacity: 1, transform: "scale(1)" },
  });
  const animateLoading = useSpring(_animateLoading);

  const canvasRef = useRef();

  const [stepCanvas, setStepCanvas] = useState("3d");

  const [main, setMain] = useState(<> </>);

  useEffect(() => {
    // effect
    setshowBorder(step != 4);
    setStepCanvas(step != 4 ? "3d" : "2d");
    switch (step) {
      case 1:
        // setStepCanvas("3d");
        setMain(<InfoPage setStep={stepHandle}></InfoPage>);
        break;
      case 2:
        setMain(<Intro setStep={stepHandle}></Intro>);
        break;
      case 3:
        setMain(<SelectSlider setStep={stepHandle}></SelectSlider>);
        break;
      case 4:
        // setStepCanvas("2d");
        setMain(<WrapWithCam></WrapWithCam>);
        break;
      case 5:
        setMain(
          <Modal
            blobImageSharing={blobImageSharing}
            urlImageSharing={urlImageSharing}
            setStep={stepHandle}
          ></Modal>
        );
        break;
      case 6:
        setMain(<QRCode></QRCode>);
        break;
      default:
        break;
    }

    return () => {
      // cleanup
      setMain(<></>);
    };
  }, [step]);

  const stepHandle = (_step) => {
    if (_step == step) return;
    setStep(_step);
  };

  const onLoadedCanvas = (params) => {
    set_animateLoading({
      isShow: false,
      delay: 500,
      opacity: 0,
      transform: "scale(3)",
      onRest: function () {
        setisLoaded(true);
      },
    });
  };

  const onCameraReady = (params) => {
    console.log("onCameraReady");
    setBlurOn(true);
  };

  const onCameraReject = (params) => {
    setStepCanvas("3d");
    setBlurOn(false);
    setMain(<FramNoCam setStep={stepHandle}></FramNoCam>);
  };

  const onCompletescreenshot = (url, blob) => {
    seturlImageSharing(url);
    setBlobImageSharing(blob);
    if (isWebcamSupport) {
      handleSharing(url);
    }
  };

  const handleSharing = (params) => {
    stepHandle(5);
  };

  return (
    <MasterPageBasic
      externalScripts={[{ type: "", src: asset("/scripts/ammo/ammo.wasm.js") }]}
    >
      <Header step={step} setStep={stepHandle}></Header>

      {/* TEST SECTOR */}
      {!IsProd() ? (
        <div className="testSector">
          {testStep.map((item, index) => {
            return (
              <Button
                key={index}
                style={{ padding: "2px" }}
                onClick={(params) => {
                  stepHandle(item);
                }}
              >
                step {item}
              </Button>
            );
          })}
        </div>
      ) : (
          <></>
        )}
      {/* END TEST SECTOR */}

      <CanvasScene
        ref={canvasRef}
        stepCanvas={stepCanvas}
        onLoad={onLoadedCanvas}
        onCameraReady={onCameraReady}
        onCameraReject={onCameraReject}
        onCompletescreenshot={onCompletescreenshot}
      />

      {!isLoaded ? (
        <Loading animateLoading={animateLoading}></Loading>
      ) : (
          <div className="homePage" id="homePageDesk">
            <div
              className={`${step === 4 && blurOn ? "blurLayout" : ""}`}
              style={{ height: `${step === 3 ? "98%" : "100%"}` }}
            >
              {main}
            </div>
          </div>
        )}
      <Footer showBorder={showBorder}></Footer>

      <style jsx>{`
        .testSector {
          position: absolute;
          z-index: 999;
          display: none;
        }
        .homePage {
          border: ${showBorder ? "10px solid #d61f38" : "none"};
        }
      `}</style>
    </MasterPageBasic>
  );
}
