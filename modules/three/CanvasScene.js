import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ObjectManager from 'plugins/three/ObjectManager'
import asset from 'plugins/assets/asset'
import * as THREE from 'three';
import Bassic3DScene from 'plugins/three/components/Bassic3DScene'
import AssetLoader, { AssetLoaderEvent } from 'plugins/three/AssetLoader'
import { ConfigLive, IsProd } from 'plugins/utils/ConfigLive'
import { useRouter } from 'next/router';
import StatDebug from 'plugins/three/components/StatDebug';
import { useEventEmitter } from '@umijs/hooks';
import App3D from 'plugins/three/App3D';
import ButtonDebug from 'plugins/three/components/ButtonDebug';
import TBrowser from 'plugins/teexii/TBrowser';
import AssetManager from 'plugins/three/AssetManager';
import { useSpring, animated } from 'react-spring'
import BackgroundCloth from 'modules/website/BackgroundCloth';
import { requestWebcam, stopWebcam, video } from "plugins/utils/Camera"
import SceneCamera from "modules/website/SceneCamera"
import TweenHandle from 'plugins/three/TweenHandle.';
import Image from 'next/image'
import Button from '@/components/diginext/button/Button';
import ParticleHolder from 'modules/website/ParticleHolder';
import Falling from 'modules/website/Falling';
import { ApiContext } from '@/components/website/context/ApiProvider';
const TWEEN = require('@tweenjs/tween.js')


const CanvasScene = forwardRef((props, ref) => {

    const router = useRouter();

    const rootRef = useRef()
    const videoHolderRef = useRef()

    //Khai báo thẻ cần listen bên trên Bassic3DScene
    const initListener = useEventEmitter();
    const loadedListener = useEventEmitter();

    const [countdownScreenshot, setcountdownScreenshot] = useState(3);
    const [isStartScreenshot, setIsStartScreenshot] = useState(false);
    const [listTest, setlistTest] = useState([])

    const [stepName, setstepName] = useState("3d")

    const context = useContext(ApiContext)


    const [alpha, setalpha] = useState({})
    const animate = useSpring({
        ...alpha,
        from: { opacity: 0 }
    })

    const [setanimateFlashProp, setsetanimateFlashProp] = useState({ from: { opacity: 0 } });
    const animateFlash = useSpring({
        ...setanimateFlashProp,
    })

    useEffect(() => {
        console.log(props.stepCanvas)

        switch (props.stepCanvas) {
            case "3d":
                _setup3D();
                break;

            case "2d":

                opencamera((params) => {

                    onCameraReady();

                    setstepName("2d");

                    _moveToUpperLayer();

                    if (props.onCameraReady) props.onCameraReady();
                }, (params) => {
                    createThumbNoCam();
                    stopWebcam();

                    if (props.onCameraReject) props.onCameraReject();
                });
                break;
            default:
                break;
        }
        return () => {
            // cleanup
        }
    }, [props.stepCanvas])


    // useImperativeHandle(
    //     ref,
    //     () => ({
    //         stepScreenshot: function (onReady, onRejected) {
    //             // sertup2D();
    //             opencamera((params) => {

    //                 onCameraReady();

    //                 setstepName("2d");
    //                 if (onReady) onReady();
    //             }, (params) => {
    //                 createThumbNoCam();
    //                 stopWebcam();
    //                 if (onRejected) onRejected();
    //             });
    //         },

    //         moveToUpperLayer: function () {
    //             _moveToUpperLayer();
    //         },

    //         moveToDefaultLayer: function () {
    //             _moveToDefaultLayer();
    //         },

    //         setup3D: _setup3D,
    //         // handler
    //     }),
    //     [],
    // )



    useEffect(() => {

        if (typeof window !== "undefined") {
            // console.log(Ammo)

        } else {
            console.log("window is not ready!!");
        }
        // cleanup
        return () => {

        }
    }, []);


    const onInit = (params) => {
        console.log("onInit")

        const urlBgImg = TBrowser.isMobile()
            ? asset("/images/textures/Budweiser_homepage_BG_mobile.jpg")
            : asset("/images/textures/Budweiser_homepage_BG_desktop.jpg")

        var list = [
            {
                url: asset("/images/textures/circle32x32.png"),
                key: "circle32x32.png"
            }, {
                url: urlBgImg,
                key: "Budweiser_homepage_BG.png"
            },
            { url: asset("/images/textures/captureScene/ffull_f1.png"), },
            { url: asset("/images/textures/captureScene/ffull_f2.png"), },

            { url: asset("/images/textures/captureScene/fw-line.png"), },
            { url: asset("/images/textures/captureScene/fw-dot.png"), },
            { url: asset("/images/textures/captureScene/fw-center.png"), },

            { url: asset("/images/textures/captureScene/thumbsshare_background.jpg"), },

        ];

        var loader = new AssetLoader();

        loader.addEventListener(AssetLoaderEvent.START, function (e) {
            console.log("AssetLoaderEvent.START")
        })
        loader.addEventListener(AssetLoaderEvent.PROGRESS, function (e) {
            console.log("AssetLoaderEvent.PROGRESS");
            onLoading(e.percent);
        })
        loader.addEventListener(AssetLoaderEvent.ERROR, function (e) {
            console.log("AssetLoaderEvent.ERROR");
            onLoadError(e.url);
        })
        loader.addEventListener(AssetLoaderEvent.COMPLETED, function (e) {
            console.log("AssetLoaderEvent.COMPLETED")

            onLoaded();
        })


        let interval = setInterval(() => {
            if (typeof Ammo == "function") {
                Ammo().then(function (AmmoLib) {
                    Ammo = AmmoLib;
                    loader.loadList(list);
                });
                clearInterval(interval);
            }
        }, 1000 / 60);

    }


    const onLoaded = (params) => {
        TweenHandle.setup();

        awake();

        loadedListener.emit();

        if (props.onLoad) props.onLoad();

        //TEST
        // sertup2D();
        // opencamera(onClickScreenshot);
        // onClickScreenshot();
        // setupThumbShare();
    }

    const onLoading = (params) => {
        console.log("onLoading", params)
    }

    const onLoadError = (params) => {
        console.log("onLoadError", params)
    }


    const awake = (params) => {

        console.log('awake');

        const controls = App3D.controls
        console.log("IsProd", IsProd())
        if (!IsProd()) {
            window.OB = ObjectManager;
        }

        if (controls) {
            console.log('controls!')
            controls.enableRotate = true;
            controls.minDistance = 0.00001;
            controls.maxDistance = 20;
        }

        start();
        setupLight();
        setupParticle();
    }

    const setupLight = (params) => {
        const light = new THREE.AmbientLight(0xffffff); // soft white light
        ObjectManager.get("scene").add(light);

    }


    const setupParticle = (params) => {
        const scene = ObjectManager.get("scene");
        const sw = ObjectManager.get("sw");
        const camera = ObjectManager.get("camera");

        const count = TBrowser.isMobile() ? 3 : 5
        const holder = new ParticleHolder({ delay: 0, count });
        holder.MIN_X = -sw / 2;
        holder.MAX_X = sw / 2;

        holder.rotation.set(0, Math.PI / 2, 0);
        holder.position.set(0, camera.position.y, camera.position.z)

        holder.scale.setScalar(.007);
        scene.add(holder);

        const part = new Falling();
        scene.add(part);
    }



    const start = (params) => {
        console.log("start");
        // const app = Bassic3DScene.app;
        setupBackground();

        animateInBackground();

        App3D.renderer.domElement.style.pointerEvents = "none";

        App3D.addEvent("completescreenshot", function (e) {
            console.log(e);
            flashOut();

            const blob = e.blob || {};
            const url = e.url || "";

            _setup3D();
            if (props.onCompletescreenshot) props.onCompletescreenshot(url, blob);
        })



    }


    const animateInBackground = (params) => {
        setalpha({
            delay: 300,
            opacity: 1,
        })

    }


    const setupBackground = (params) => {
        const scene = ObjectManager.get("scene");
        var holder = new THREE.Object3D();
        scene.add(holder);

        var cloth = new BackgroundCloth();
        ObjectManager.add("cloth", cloth)
        holder.add(cloth)
    }


    const _setup3D = (params) => {
        if (stepName == "3d") return;
        setstepName("3d");

        ObjectManager.get("scene").visible = true;

        SceneCamera.dispose();

        ObjectManager.get("cloth").setupCameraPosition();

        _moveToDefaultLayer();

        // video.style.zIndex = 0;
        App3D.resize();

        stopWebcam();

    }

    const sertup2D = (params) => {

        setstepName("2d");

        const scene = ObjectManager.get("scene");
        scene.visible = false

        SceneCamera.init();

        setIsStartScreenshot(false);
        // OverlayScene.init();

    }

    const opencamera = (onReady, onRejected) => {

        requestWebcam({
            container: videoHolderRef.current,
            onRejected: function () {
                if (onRejected) onRejected()
            },
            onReady: function () {
                video.style.zIndex = 0;

                if (onReady) onReady()
            },
            facingMode: "user"
        });
    }

    const onCameraReady = (params) => {
        sertup2D();
        console.log("onCameraReady");
        video.style.pointerEvents = "none";

    }


    // const onRejected = (params) => {
    //     console.log("onRejected");
    // }


    // const onReady = (cb) => {

    //     console.log("onReady");
    //     if (typeof cb == "Function") cb();
    // }

    const onClickScreenshot = (params) => {
        console.log("onClickScreenshot");
        setIsStartScreenshot(true);
        startCountdownScreenshot(flashIn);

    }

    const flashIn = (cb) => {
        setsetanimateFlashProp({
            from: { opacity: 0 },
            to: { opacity: 1 },
            config: {
                duration: 200,
                mass: 1,
                tension: 500,
                friction: 20,
            },
            onRest: function () {
                const titleCurrent = context.list[context.titleIndex]
                // const found = context.list.find((item) => {
                //     return item
                // })
                App3D.scene.dispatchEvent({ type: "screenshot", titleCurrent });
                console.log("onRest");
                if (cb) cb();
            },
            onFrame: function () {
            }
        })
    }

    const flashOut = (cb) => {
        setsetanimateFlashProp({
            // from: { opacity: 1 },
            to: { opacity: 0 },
            config: {
                duration: 200,
                mass: 1,
                tension: 500,
                friction: 20,
            },
            onRest: function () {
                if (cb) cb();
            },
            onFrame: function () {
            }
        })
    }

    const completeScreenShot = (params) => {
    }


    const setupThumbShare = (params) => {
        console.log("setupThumbShare");
        SceneCamera.setupThumbShare();
    }



    const startCountdownScreenshot = (cb) => {

        let obj = {
            count: 3
        }

        let tween = new TWEEN.Tween(obj) // Create a new tween that modifies 'coords'.
            .to({
                count: 0,
            }, obj.count * 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
            .start() //
            .onUpdate((item) => {
                let count = Math.ceil(item.count)
                setcountdownScreenshot(count)
            })
            .onComplete((params) => {
                if (cb) cb();
            })
    }


    const _moveToUpperLayer = (params) => {
        App3D.renderer.domElement.style.zIndex = 10;
    }
    const _moveToDefaultLayer = (params) => {
        App3D.renderer.domElement.style.zIndex = 0;
    }


    const createThumbNoCam = (cb) => {
        console.log("createThumbNoCam");
        // /images/textures/captureScene/thumbsshare_nocam.jpg
        const titleCurrent = context.list[context.titleIndex]
        console.log(titleCurrent)
        const _image = new window.Image();
        _image.addEventListener('load', function (e) {
            handleLoadThumbShareImage(e, titleCurrent.image);
        });
        _image.src = asset("/images/textures/captureScene/thumbsshare_nocam.jpg");


    }

    const handleLoadThumbShareImage = (event, url, cb) => {
        const img = event.currentTarget;
        const canvasWidth = img.width;
        const canvasHeight = img.height;

        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        //Test
        canvas.style.position = "absolute";
        canvas.style.width = "100%";
        canvas.style.top = "100px";
        canvas.style.left = "0px";
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);


        const _image = new window.Image();
        _image.crossOrigin = "Anonymous";
        _image.addEventListener('load', onLoad);
        _image.src = url;

        function onLoad(e) {
            const _img = e.currentTarget;
            const _width = _img.width;
            const _height = _img.height;

            ctx.drawImage(_img, 80, 324, _width, _height);

            canvas.toBlob(function (blob) {
                let urlCreator = window.URL || window.webkitURL;
                let _url = urlCreator.createObjectURL(blob);

                if (props.onCompletescreenshot) props.onCompletescreenshot(_url, blob);

                if (cb) cb(_url, blob);
            });


        }
        // document.body.appendChild(canvas);
    }



    return (
        <>

            <style jsx>{`
                .videoHolder{
                    //display: none;
                }

                .buttonHolder{
                    position: absolute;
                    top: 90%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    z-index: 99;
                }            
       
                .debug{
                    position: absolute;
                    z-index: 1000;
                    bottom: 0px;
                    //display: inline-flex;
                    display: none;
                    align-items: flex-end;
                }

                .countdownText{
                    color:  grey;
                }

                .flash {
                    position: fixed;
                    top:0px;
                    left:0px;
                    width:100%;
                    height:100%;
                    color:white;
                    z-index: 99999;
                      pointer-events: none;

                }

            `}</style>


            <style global jsx>{`
                html, body{
                    overflow: hidden;
                    background-color: "#d71f39";
                }
            `}</style>



            {!IsProd() ?
                <div className='debug'>
                    <StatDebug
                        initListener={initListener}
                    >

                        {listTest.map((item, index) => {
                            return <p key={index}>{item.title}: {item.value} </p>
                        })}


                    </StatDebug>
                    <ButtonDebug />
                </div>
                :
                <></>
            }

            <animated.div style={animate}>


                <div className="root" ref={rootRef}>
                    <Bassic3DScene
                        initListener={initListener}
                        onInit={onInit}

                        transparent={true}
                        lightEnabled={false}
                        controlEnabled={false}
                        gridEnabled={false}
                    />
                </div>

            </animated.div>

            <div className="videoHolder" ref={videoHolderRef}>

            </div>

            {stepName == "2d" ?
                <div className="buttonHolder">
                    {/* <DashkitButton onClick={setup3D}>sertup3D</DashkitButton> */}
                    {/* <DashkitButton onClick={() => router.push("/examples")}>VIEW EXAMPLES</DashkitButton>
             <DashkitButton onClick={sertup2D}>sertup2D</DashkitButton>
             <DashkitButton onClick={opencamera}>opencamera</DashkitButton>
             <DashkitButton onClick={setupThumbShare}>setupThumbShare</DashkitButton> */}


                    {isStartScreenshot ?
                        <h1 className="countdownText">{countdownScreenshot}</h1>
                        :
                        <Button bgColor="none" bgColorActive="none" onClick={onClickScreenshot} >
                            <Image width={50} height={50} alt="screenshot" src={asset("/images/textures/captureScene/capture.png")}></Image>
                        </Button>
                    }
                </div> :
                <></>
            }



            <animated.div style={{
                position: "fixed", top: "0px", left: "0px"
                , width: "100%"
                , height: "100%"
                , color: "white"
                , backgroundColor: "white"
                , zIndex: 999
                , pointerEvents: "none"
                , ...animateFlash
            }} >
            </animated.div>




        </>

    )
})


CanvasScene.propTypes = {

}

export default CanvasScene
