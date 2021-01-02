import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap';
import ObjectManager from './ObjectManager';
import ThreeUtils from './ThreeUtils';
import AppEvent from './AppEvent';


const App2D = forwardRef(({
    scene, camera, renderer,
    directLight, ambientLight,
    grid, axes,
    directLightHelper,
    controls,
    lastCalledTime,
    eventListeners = [],
    clock = new THREE.Clock(),
    req,
    ...props }, ref) => {

    const [isInit, setisInit] = useState(false)

    const holderRef = useRef(null)

    useEffect(() => {
        // effect
        init()
        return () => {
            // cleanup
            _dispose();
        }
    }, [])




    const init = (params) => {

        if (typeof window == "undefined") return;

        if (isInit) return;
        setisInit(true);

        props = props || {};
        let transparent = props.hasOwnProperty("transparent") ? props["transparent"] : false;
        let controlEnabled = props.hasOwnProperty("controlEnabled") ? props["controlEnabled"] : true;
        let lightEnabled = props.hasOwnProperty("lightEnabled") ? props["lightEnabled"] : true;
        let gridEnabled = props.hasOwnProperty("gridEnabled") ? props["gridEnabled"] : true;

        let sw = window.innerWidth
        let sh = window.innerHeight;

        // initial setup
        scene = new THREE.Scene();
        scene.background = null;

        // camera = new THREE.PerspectiveCamera(75, sw / sh, 0.1, 10000);
        camera = new THREE.OrthographicCamera(sw / -2, sw / 2, sh / 2, sh / -2, 0.1, 10000);
        camera.position.set(0, 200, 1750);
        scene.add(camera)

        // camera.lookAt(0,0,0)

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: transparent });
        renderer.setPixelRatio(window ? window.devicePixelRatio : 1);
        renderer.setSize(sw, sh);

        if (holderRef.current) holderRef.current.appendChild(renderer.domElement);
        renderer.domElement.style.outline = "none"
        renderer.domElement.style.position = "absolute"
        renderer.domElement.style.top = "0px"
        renderer.domElement.style.left = "0px"

        // lights
        if (lightEnabled) {
            directLight = new THREE.DirectionalLight("#fff", .5)
            directLight.position.set(0, 0, 500)
            scene.add(directLight)

            ambientLight = new THREE.AmbientLight("#fff", 0.4)
            scene.add(ambientLight)
        }

        // helpers
        if (gridEnabled) {
            directLightHelper = new THREE.DirectionalLightHelper(directLight, 10)
            scene.add(directLightHelper)

            grid = new THREE.GridHelper(20000, 2000)
            grid.material.transparent = true
            grid.material.opacity = 0.8
            scene.add(grid)

            axes = new THREE.AxesHelper(1000)
            scene.add(axes)
        }

        if (controlEnabled) {
            controls = new OrbitControls(camera, renderer.domElement)
            controls.minDistance = 10;
            controls.maxDistance = 990;
        }

        // resize
        setTimeout(() => {
            if (window) {
                // console.log("init resize!")
                onResize()
                window.addEventListener("resize", onResize)
            }
        }, 1000);
        onResize()


        function onResize(e) {
            console.log("resize!",)
            sw = window.innerWidth;
            sh = window.innerHeight;
            console.log(sw, sh)

            camera.aspect = sw / sh;
            camera.left = sw / -2
            camera.right = sw / 2
            camera.top = sh / 2
            camera.bottom = sh / -2
            camera.updateProjectionMatrix();

            scene.dispatchEvent({ type: AppEvent.RESIZE, sw, sh });

            renderer.setSize(sw, sh);
            renderer.render(scene, camera);
        }


        // render
        animate()
        function animate(time) {
            req = requestAnimationFrame(animate);
            let deltaTime = clock.getDelta();
            let delta = (new Date() - lastCalledTime) / 1000;
            let fps = 1 / delta;
            lastCalledTime = new Date()

            if (controls && controls.enabled) controls.update();

            scene.dispatchEvent({ type: AppEvent.BEFORE_RENDER, delta, fps, time });

            renderer.render(scene, camera);

            scene.dispatchEvent({ type: AppEvent.AFTER_RENDER, delta, fps, time });

        }

        // let list = [];
        // setapp([renderer.domElement])
        // renderer.domElement.appendChild(renderer.domElement);

        ObjectManager.add("scene", scene);
        ObjectManager.add("camera", camera);
        ObjectManager.add("renderer", renderer);
        ObjectManager.add("controls", controls);


        App2D.scene = scene;
        App2D.camera = camera;
        App2D.renderer = renderer;
        App2D.controls = controls;

        App2D.addEvent = _addEvent;
        App2D.removeEvent = _removeEvent;
        App2D.hideImmediately = _hideImmediately;
        App2D.showImmediately = _showImmediately;
        App2D.hide = _hide;
        App2D.show = _show;
        App2D.hideGrid = _hideGrid;
        App2D.showGrid = _showGrid;
        App2D.toggleGrid = _toggleGrid;
        App2D.enableControl = _enableControl;
        App2D.disableControl = _disableControl;
        App2D.dispose = _dispose;

        if (props.appInit) props.appInit();


    }


    function _addEvent(event, listener) {
        if (!scene) scene = ObjectManager.get("scene");
        scene.addEventListener(event, listener);
    }

    function _removeEvent(event, listener) {
        if (!scene) scene = ObjectManager.get("scene")
        scene.removeEventListener(event, listener);
    }


    function _hideImmediately() {
        renderer.domElement.style.display = "none"
    }

    function _showImmediately() {
        renderer.domElement.style.display = "block"
    }

    /**
     * @param  {number} duration
     */
    function _hide(duration) {
        gsap.to(renderer.domElement, { duration: duration || 0.5, autoAlpha: 0, ease: "sine.in" })
    }
    /**
     * @param  {number} duration
     */
    function _show(duration) {
        gsap.to(renderer.domElement, { duration: duration || 0.5, autoAlpha: 1, ease: "sine.out" })
    }

    function _hideGrid() {
        if (grid) grid.visible = false
        if (axes) axes.visible = false
    }

    function _showGrid() {
        if (grid) grid.visible = true
        if (axes) axes.visible = true
    }

    function _toggleGrid() {
        if (grid) grid.visible = !grid.visible
        if (axes) axes.visible = !axes.visible
    }

    function _enableControl() {
        if (controls) controls.enabled = true;
    }

    function _disableControl() {
        if (controls) controls.enabled = false;
    }

    function _dispose() {
        console.log("dispose...");

        window.cancelAnimationFrame(req);

        ThreeUtils.clearThree(scene)

        try {
            renderer.forceContextLoss();
            renderer.context = null;
            renderer.domElement = null;
        } catch (error) {

        }

        if (holderRef.current) while (holderRef.current.firstChild) {
            holderRef.current.removeChild(holderRef.current.firstChild);
        }

        ObjectManager.dispose();
    }


    return (

        <>
            <style jsx>{`
                .holderRef{
                
                }
            `}</style>
            <div ref={holderRef}>

            </div>

        </>
    )
})

App2D.propTypes = {
    appInit: PropTypes.func,

}

export default App2D
