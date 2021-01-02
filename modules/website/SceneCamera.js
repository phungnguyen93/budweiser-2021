import * as THREE from 'three';
import Object3DExtend from 'plugins/three/Object3DExtend'
import OverlayScene from 'plugins/three/OverlayScene';
import AssetManager from 'plugins/three/AssetManager';
import ObjectManager from 'plugins/three/ObjectManager';
import ParticleFirework from './ParticleFirework';
import ParticleHolder from './ParticleHolder';
import App3D from 'plugins/three/App3D';
import { webcam, video } from 'plugins/utils/Camera';
import TBrowser from 'plugins/teexii/TBrowser';
import { Texture } from 'three';
import AssetLoader, { AssetLoaderEvent } from 'plugins/three/AssetLoader';
import asset from 'plugins/assets/asset';
const TWEEN = require('@tweenjs/tween.js')


export default class SceneCamera {

    // constructor(props) {
    //     super(props);
    //     this.props = props || {};

    //     this.#awake();
    // }
    static videoPlane = null;

    static particleHolder;

    static init() {

        // this.loadText();

        OverlayScene.dispose();

        OverlayScene.init();

        const scene = OverlayScene.scene;

        const sw = ObjectManager.get("sw");
        const sh = ObjectManager.get("sh");

        OverlayScene.resize({ sw, sh });

        const light = new THREE.AmbientLight(0xffffff); // soft white light
        scene.add(light);

        const width = sh * .37;
        const POSITION = new THREE.Vector3(sw * .23, -sh * .13, 0);

        const layerParticle = new THREE.Object3D();
        layerParticle.position.z = -2;
        scene.add(layerParticle);

        const layerBottle = new THREE.Object3D();
        scene.add(layerBottle);


        let geometry = new THREE.PlaneBufferGeometry(width, width, 2);
        let material = new THREE.MeshBasicMaterial({ map: AssetManager.get("ffull_f1.png"), transparent: true });
        let bottle = new THREE.Mesh(geometry, material);
        bottle.position.copy(POSITION);
        layerBottle.add(bottle);

        let delay = 2000;
        let duration = 500;

        let tween = new TWEEN.Tween(bottle) // Create a new tween that modifies 'coords'.
            .delay(delay)
            .to({
                material: { opacity: 0 },
                scale: { x: 0, y: 0, z: 0 },
            }, duration) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Back.In) // Use an easing function to make the animation smooth.
            .start() // Start the tween immediately.


        material = new THREE.MeshBasicMaterial({ map: AssetManager.get("ffull_f2.png"), opacity: 0, transparent: true });
        bottle = new THREE.Mesh(geometry, material);
        bottle.position.copy(POSITION);
        bottle.scale.setScalar(0);
        layerBottle.add(bottle);

        delay += 300;
        tween = new TWEEN.Tween(bottle) // Create a new tween that modifies 'coords'.
            .delay(delay)
            .to({
                material: { opacity: 1 },
                scale: { x: 1, y: 1, z: 1 },
            }, duration) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Back.Out) // Use an easing function to make the animation smooth.
            .start() //


        SceneCamera.particleHolder = new ParticleHolder();
        layerParticle.add(SceneCamera.particleHolder);


        window.addEventListener("webcamloadedmetadata", SceneCamera.onwebcamloadedmetadata)

        App3D.addEvent("screenshot", SceneCamera.onscreenshot)

    }

    static onwebcamloadedmetadata(e) {
        const scene = OverlayScene.scene;
        const sw = ObjectManager.get("sw");
        const sh = ObjectManager.get("sh");

        const scale = e.detail.scale;
        var obj = SceneCamera.getSizeByRatio(e.detail.videoWidth, e.detail.videoHeight, sw, sh);
        const width = obj.width;
        const height = obj.height

        const texture = new THREE.VideoTexture(video);
        const geometry = new THREE.PlaneBufferGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

        const videoPlane = SceneCamera.videoPlane = new THREE.Mesh(geometry, material)
        videoPlane.position.z = -10;
        videoPlane.scale.x = scale;

        videoPlane.visible = false;

        scene.add(videoPlane);
    }

    static onscreenshot(e) {
        console.log("onscreenshot")
        console.log(e)
        SceneCamera.screenshot(function (url, blob) {

            SceneCamera.setupThumbShare(url, blob, e.titleCurrent)
        });

    }

    static loadText(id) {
        var loader = new AssetLoader();

        loader.addEventListener(AssetLoaderEvent.START, function (e) {
            console.log("AssetLoaderEvent.START")
        })
        loader.addEventListener(AssetLoaderEvent.PROGRESS, function (e) {
            console.log("AssetLoaderEvent.PROGRESS");
            // onLoading(e.percent);
        })
        loader.addEventListener(AssetLoaderEvent.ERROR, function (e) {
            console.log("AssetLoaderEvent.ERROR");
            // onLoadError(e.url);
        })
        loader.addEventListener(AssetLoaderEvent.COMPLETED, function (e) {
            console.log("AssetLoaderEvent.COMPLETED")

        })

        loader.load(asset("/images/textures/text/ftext_1.png"), "text_thumbshare");
    }



    static createBorder() {
        const scene = OverlayScene.scene;

        const BORDER_WIDTH = 10;
        const HALF_BORDER_WIDTH = BORDER_WIDTH / 2;

        const sw = ObjectManager.get("sw");
        const sh = ObjectManager.get("sh");


        let geometry = new THREE.PlaneBufferGeometry(BORDER_WIDTH, sh, 4);
        let material = new THREE.MeshBasicMaterial({ color: 0xD61F38 });
        let plane = new THREE.Mesh(geometry, material);
        plane.position.set(-sw / 2 + HALF_BORDER_WIDTH, 0, 0);
        scene.add(plane);

        material = new THREE.MeshBasicMaterial({ color: 0xD61F38 });
        plane = new THREE.Mesh(geometry, material);
        plane.position.set(sw / 2 - HALF_BORDER_WIDTH, 0, 0);
        scene.add(plane);

        geometry = new THREE.PlaneBufferGeometry(sw, BORDER_WIDTH, 4);
        material = new THREE.MeshBasicMaterial({ color: 0xD61F38 });
        plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, sh / 2 - HALF_BORDER_WIDTH, 0);
        scene.add(plane);

        material = new THREE.MeshBasicMaterial({ color: 0xD61F38 });
        plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, -sh / 2 + HALF_BORDER_WIDTH, 0);
        scene.add(plane);
    }


    static getSizeByRatio(videoWidth, videoHeight, compareWidth, compareHeight) {
        const ratio_1 = videoWidth / videoHeight;
        const ratio_2 = compareWidth / compareHeight;

        if (ratio_1 < ratio_2) {
            return {
                width: compareWidth,
                height: compareWidth / videoWidth * videoHeight,
            };
        }

        if (videoHeight < compareHeight) {
            return {
                width: compareHeight / videoHeight * videoWidth,
                height: compareHeight,
            };
        }
        return {
            width: videoWidth,
            height: videoHeight,
        };
    }


    static setupThumbShare(url, blob, titleCurrent) {
        OverlayScene.dispose();
        OverlayScene.init();

        const NEW_WIDTH = 1200;
        const NEW_HEIGHT = 630;

        OverlayScene.resize({ sw: NEW_WIDTH, sh: NEW_HEIGHT });
        const renderer = ObjectManager.get("renderer")
        renderer.domElement.style.width = "100%"
        renderer.domElement.style.height = "auto"

        const scene = OverlayScene.scene;
        const camera = OverlayScene.camera;

        let geometry = new THREE.PlaneBufferGeometry(NEW_WIDTH, NEW_HEIGHT, 2);
        let material = new THREE.MeshBasicMaterial({ map: AssetManager.get("thumbsshare_background.jpg") });
        let background = new THREE.Mesh(geometry, material);
        scene.add(background);


        var loader = new AssetLoader();

        loader.addEventListener(AssetLoaderEvent.START, function (e) {
            // console.log("AssetLoaderEvent.START")
        })
        loader.addEventListener(AssetLoaderEvent.PROGRESS, function (e) {
            // console.log("AssetLoaderEvent.PROGRESS");
            // onLoading(e.percent);
        })
        loader.addEventListener(AssetLoaderEvent.ERROR, function (e) {
            // console.log("AssetLoaderEvent.ERROR");
            // onLoadError(e.url);
        })
        loader.addEventListener(AssetLoaderEvent.COMPLETED, function (e) {
            // console.log("AssetLoaderEvent.COMPLETED")
            onLoadImageCaptured();

        })


        const holder = new THREE.Object3D();
        scene.add(holder);

        loader.loadList([
            { key: "onLoadImageCaptured", url: url, type: "png" },
            { key: "titleCurrent.image", url: titleCurrent.image },
        ]
        );



        function onLoadImageCaptured() {
            let texture = AssetManager.get("onLoadImageCaptured");
            let spriteHeight = NEW_HEIGHT * .8;
            let spriteWdith = texture.image.width / texture.image.height * spriteHeight;

            geometry = new THREE.PlaneBufferGeometry(spriteWdith, spriteHeight, 4);
            material = new THREE.MeshBasicMaterial({ map: texture });
            let captureImg = new THREE.Mesh(geometry, material);
            captureImg.position.x = NEW_WIDTH / 2 * .5;
            scene.add(captureImg);


            texture = AssetManager.get("titleCurrent.image");
            spriteWdith = NEW_WIDTH * .4;
            spriteHeight = texture.image.height / texture.image.width * spriteWdith;

            geometry = new THREE.PlaneBufferGeometry(spriteWdith, spriteHeight, 4);
            material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, });
            let plane = new THREE.Mesh(geometry, material);
            plane.position.x = spriteWdith / 2;
            plane.position.y = spriteHeight / 2;
            // plane.position.x = NEW_WIDTH / 2 * .5;
            holder.add(plane);

            holder.position.x = -(NEW_WIDTH / 2) + 80;
            holder.position.y = -(NEW_HEIGHT / 2) + 60;



            setTimeout(() => {
                renderer.render(scene, camera);
                renderer.domElement.toBlob(function (blob) {
                    let urlCreator = window.URL || window.webkitURL;
                    let url = urlCreator.createObjectURL(blob);

                    scene.visible = false;

                    // window.open(url);

                    App3D.scene.dispatchEvent({ type: "completescreenshot", url, blob });

                }, 'image/jpeg', 1.0)
            }, 100);
        }








        // thumbsshare_template.png
    }



    static screenshot(callback) {

        SceneCamera.videoPlane.visible = true;
        SceneCamera.createBorder();

        const renderer = App3D.renderer;
        const scene = OverlayScene.scene;
        const camera = OverlayScene.camera;

        renderer.render(scene, camera);

        renderer.domElement.toBlob(function (blob) {
            let urlCreator = window.URL || window.webkitURL;
            let url = urlCreator.createObjectURL(blob);
            // window.open(url)
            SceneCamera.videoPlane.visible = false;

            // App3D.scene.dispatchEvent({ type: "completescreenshot", url, blob });

            if (callback) callback(url, blob);

        }, 'image/jpeg', 1.0)

    }



    static start() {

    }

    static dispose() {
        App3D.removeEvent("screenshot", SceneCamera.onscreenshot)
        window.removeEventListener("webcamloadedmetadata", SceneCamera.onwebcamloadedmetadata)

        if (SceneCamera.particleHolder) SceneCamera.particleHolder.dispose();
        OverlayScene.dispose();

    }
}