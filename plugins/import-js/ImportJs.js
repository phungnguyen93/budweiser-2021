import React from 'react'
import PropTypes from 'prop-types'
import CanvasScene from 'modules/three/CanvasScene'
// const DemoScene = dynamic(() => import('@/modules/three/DemoScene'))
// modules/three/DemoScene.js
import renderHTML from 'react-render-html';
import asset from 'plugins/assets/asset';

let isLoaded = false;

const ImportJs = (scriptContent, lib, callback) => {
    if (isLoaded) return;
    if (typeof window == "undefined") return;

    // console.log("ImportJs", lib);

    // let interval = setInterval(() => {
    //     console.log(typeof window, window[lib], lib)
    //     if (typeof window[lib] != "undefined") {
    //         console.log("isLoaded", isLoaded)
    //         console.log(typeof this[lib], lib)

    //         if (callback) callback();
    //         isLoaded = true;
    //         clearInterval(interval);
    //     }
    // }, 1000 / 60);
    // console.log(this[lib]);

    return renderHTML(scriptContent)
}


export default ImportJs
