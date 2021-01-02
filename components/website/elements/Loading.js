import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from "react-spring";
import PropTypes from 'prop-types'
import asset from 'plugins/assets/asset';

const Loading = props => {

    const [classHide, setclassHide] = useState("hide");
    const imgRef = useRef();

    useEffect(() => {
        if (imgRef.current) if (imgRef.current.complete) onLoad();
        return () => {
        }
    }, [])


    const onLoad = (params) => {
        console.log("onlo fsda fsad fsadfad")

        setclassHide("animation-target");

        setTimeout(() => {
            setclassHide("animation-loop");
        }, 1500);
    }

    return (
        <>
            <style jsx>{`

            .hide{
                display: none;
            }

            .animation-target {
                -webkit-animation: animation 1500ms linear both;
                animation: animation 1500ms linear both;
            }

            /* Generated with Bounce.js. Edit at http://bouncejs.com#%7Bs%3A%5B%7BT%3A%22r%22%2Ce%3A%22b%22%2Cd%3A1000%2CD%3A0%2Cf%3A90%2Ct%3A0%2Cs%3A3%2Cb%3A4%7D%2C%7BT%3A%22k%22%2Ce%3A%22s%22%2Cd%3A1000%2CD%3A0%2Cf%3A%7Bx%3A0%2Cy%3A0%7D%2Ct%3A%7Bx%3A30%2Cy%3A30%7D%2Cs%3A3%2Cb%3A4%7D%2C%7BT%3A%22c%22%2Ce%3A%22b%22%2Cd%3A1000%2CD%3A0%2Cf%3A%7Bx%3A0%2Cy%3A0%7D%2Ct%3A%7Bx%3A1%2Cy%3A1%7D%2Cs%3A3%2Cb%3A4%7D%5D%7D */

            @-webkit-keyframes animation { 
                0% { -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                3.2% { -webkit-transform: matrix3d(0.181, 0.351, 0, 0, -0.288, 0.27, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.181, 0.351, 0, 0, -0.288, 0.27, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                4.3% { -webkit-transform: matrix3d(0.314, 0.415, 0, 0, -0.296, 0.429, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.314, 0.415, 0, 0, -0.296, 0.429, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                6.41% { -webkit-transform: matrix3d(0.594, 0.421, 0, 0, -0.195, 0.701, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.594, 0.421, 0, 0, -0.195, 0.701, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                8.61% { -webkit-transform: matrix3d(0.835, 0.308, 0, 0, -0.026, 0.89, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.835, 0.308, 0, 0, -0.026, 0.89, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                12.71% { -webkit-transform: matrix3d(1.054, 0.038, 0, 0, 0.195, 1.036, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.054, 0.038, 0, 0, 0.195, 1.036, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                12.91% { -webkit-transform: matrix3d(1.058, 0.028, 0, 0, 0.201, 1.039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.058, 0.028, 0, 0, 0.201, 1.039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                17.22% { -webkit-transform: matrix3d(1.09, -0.102, 0, 0, 0.217, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.09, -0.102, 0, 0, 0.217, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                18.92% { -webkit-transform: matrix3d(1.084, -0.113, 0, 0, 0.191, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.084, -0.113, 0, 0, 0.191, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                25.23% { -webkit-transform: matrix3d(1.04, -0.07, 0, 0, 0.068, 1.04, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.04, -0.07, 0, 0, 0.068, 1.04, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                28.33% { -webkit-transform: matrix3d(1.02, -0.04, 0, 0, 0.026, 1.02, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.02, -0.04, 0, 0, 0.026, 1.02, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                31.43% { -webkit-transform: matrix3d(1.006, -0.017, 0, 0, 0.001, 1.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.006, -0.017, 0, 0, 0.001, 1.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                39.44% { -webkit-transform: matrix3d(0.994, 0.006, 0, 0, -0.014, 0.994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.994, 0.006, 0, 0, -0.014, 0.994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                56.46% { -webkit-transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                61.66% { -webkit-transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                81.48% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                83.98% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
            }

            @keyframes animation { 
                0% { -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                3.2% { -webkit-transform: matrix3d(0.181, 0.351, 0, 0, -0.288, 0.27, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.181, 0.351, 0, 0, -0.288, 0.27, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                4.3% { -webkit-transform: matrix3d(0.314, 0.415, 0, 0, -0.296, 0.429, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.314, 0.415, 0, 0, -0.296, 0.429, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                6.41% { -webkit-transform: matrix3d(0.594, 0.421, 0, 0, -0.195, 0.701, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.594, 0.421, 0, 0, -0.195, 0.701, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                8.61% { -webkit-transform: matrix3d(0.835, 0.308, 0, 0, -0.026, 0.89, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.835, 0.308, 0, 0, -0.026, 0.89, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                12.71% { -webkit-transform: matrix3d(1.054, 0.038, 0, 0, 0.195, 1.036, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.054, 0.038, 0, 0, 0.195, 1.036, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                12.91% { -webkit-transform: matrix3d(1.058, 0.028, 0, 0, 0.201, 1.039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.058, 0.028, 0, 0, 0.201, 1.039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                17.22% { -webkit-transform: matrix3d(1.09, -0.102, 0, 0, 0.217, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.09, -0.102, 0, 0, 0.217, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                18.92% { -webkit-transform: matrix3d(1.084, -0.113, 0, 0, 0.191, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.084, -0.113, 0, 0, 0.191, 1.073, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                25.23% { -webkit-transform: matrix3d(1.04, -0.07, 0, 0, 0.068, 1.04, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.04, -0.07, 0, 0, 0.068, 1.04, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                28.33% { -webkit-transform: matrix3d(1.02, -0.04, 0, 0, 0.026, 1.02, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.02, -0.04, 0, 0, 0.026, 1.02, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                31.43% { -webkit-transform: matrix3d(1.006, -0.017, 0, 0, 0.001, 1.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.006, -0.017, 0, 0, 0.001, 1.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                39.44% { -webkit-transform: matrix3d(0.994, 0.006, 0, 0, -0.014, 0.994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.994, 0.006, 0, 0, -0.014, 0.994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                56.46% { -webkit-transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                61.66% { -webkit-transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0.001, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                81.48% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                83.98% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
                100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
            }




            .animation-loop {
  -webkit-animation: animation2 1550ms linear infinite both;
  animation: animation2 1550ms linear infinite both;
}

/* Generated with Bounce.js. Edit at http://bouncejs.com#%7Bl%3A1%2Cs%3A%5B%7BT%3A%22k%22%2Ce%3A%22s%22%2Cd%3A750%2CD%3A0%2Cf%3A%7Bx%3A0%2Cy%3A0%7D%2Ct%3A%7Bx%3A40%2Cy%3A60%7D%2Cs%3A3%2Cb%3A4%7D%2C%7BT%3A%22c%22%2Ce%3A%22b%22%2Cd%3A750%2CD%3A0%2Cf%3A%7Bx%3A1%2Cy%3A1%7D%2Ct%3A%7Bx%3A1.5%2Cy%3A1.5%7D%2Cs%3A2%2Cb%3A4%7D%2C%7BT%3A%22c%22%2Ce%3A%22b%22%2Cd%3A1200%2CD%3A350%2Cf%3A%7Bx%3A1%2Cy%3A1%7D%2Ct%3A%7Bx%3A0.66%2Cy%3A0.66%7D%2Cs%3A3%2Cb%3A4%7D%5D%7D */

/* Generated with Bounce.js. Edit at http://bouncejs.com#%7Bl%3A1%2Cs%3A%5B%7BT%3A%22k%22%2Ce%3A%22s%22%2Cd%3A1500%2CD%3A0%2Cf%3A%7Bx%3A0%2Cy%3A0%7D%2Ct%3A%7Bx%3A20%2Cy%3A40%7D%2Cs%3A3%2Cb%3A4%7D%2C%7BT%3A%22c%22%2Ce%3A%22b%22%2Cd%3A750%2CD%3A0%2Cf%3A%7Bx%3A1%2Cy%3A1%7D%2Ct%3A%7Bx%3A1.2%2Cy%3A1.2%7D%2Cs%3A2%2Cb%3A4%7D%2C%7BT%3A%22c%22%2Ce%3A%22b%22%2Cd%3A1200%2CD%3A350%2Cf%3A%7Bx%3A1%2Cy%3A1%7D%2Ct%3A%7Bx%3A0.83333%2Cy%3A0.83333%7D%2Cs%3A3%2Cb%3A4%7D%5D%7D */

@-webkit-keyframes animation2 { 
  0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  2.18% { -webkit-transform: matrix3d(1.097, 0.164, 0, 0, 0.081, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, 0.164, 0, 0, 0.081, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  3.1% { -webkit-transform: matrix3d(1.135, 0.212, 0, 0, 0.105, 1.135, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.135, 0.212, 0, 0, 0.105, 1.135, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  4.36% { -webkit-transform: matrix3d(1.176, 0.258, 0, 0, 0.128, 1.176, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.176, 0.258, 0, 0, 0.128, 1.176, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  6.2% { -webkit-transform: matrix3d(1.213, 0.285, 0, 0, 0.141, 1.213, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.213, 0.285, 0, 0, 0.141, 1.213, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  6.54% { -webkit-transform: matrix3d(1.217, 0.285, 0, 0, 0.141, 1.217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.217, 0.285, 0, 0, 0.141, 1.217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  8.67% { -webkit-transform: matrix3d(1.228, 0.264, 0, 0, 0.13, 1.228, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.228, 0.264, 0, 0, 0.13, 1.228, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  12.3% { -webkit-transform: matrix3d(1.215, 0.182, 0, 0, 0.09, 1.215, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.215, 0.182, 0, 0, 0.09, 1.215, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.05% { -webkit-transform: matrix3d(1.206, 0.14, 0, 0, 0.07, 1.206, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.206, 0.14, 0, 0, 0.07, 1.206, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  16.76% { -webkit-transform: matrix3d(1.199, 0.084, 0, 0, 0.042, 1.199, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.199, 0.084, 0, 0, 0.042, 1.199, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.31% { -webkit-transform: matrix3d(1.197, 0.058, 0, 0, 0.029, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.197, 0.058, 0, 0, 0.029, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  19.42% { -webkit-transform: matrix3d(1.197, 0.042, 0, 0, 0.021, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.197, 0.042, 0, 0, 0.021, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  22.48% { -webkit-transform: matrix3d(1.198, 0.011, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.198, 0.011, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  22.58% { -webkit-transform: matrix3d(1.198, 0.01, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.198, 0.01, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  24.41% { -webkit-transform: matrix3d(1.141, -0.001, 0, 0, -0.001, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.141, -0.001, 0, 0, -0.001, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  25.91% { -webkit-transform: matrix3d(1.097, -0.007, 0, 0, -0.003, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, -0.007, 0, 0, -0.003, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  29.25% { -webkit-transform: matrix3d(1.025, -0.011, 0, 0, -0.005, 1.025, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.025, -0.011, 0, 0, -0.005, 1.025, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  30.18% { -webkit-transform: matrix3d(1.011, -0.011, 0, 0, -0.006, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.011, -0.011, 0, 0, -0.006, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  30.42% { -webkit-transform: matrix3d(1.008, -0.011, 0, 0, -0.006, 1.008, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.008, -0.011, 0, 0, -0.006, 1.008, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  32.58% { -webkit-transform: matrix3d(0.99, -0.01, 0, 0, -0.005, 0.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99, -0.01, 0, 0, -0.005, 0.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  35.91% { -webkit-transform: matrix3d(0.981, -0.007, 0, 0, -0.004, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.981, -0.007, 0, 0, -0.004, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  40.98% { -webkit-transform: matrix3d(0.989, -0.003, 0, 0, -0.002, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.989, -0.003, 0, 0, -0.002, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  44.51% { -webkit-transform: matrix3d(0.996, -0.001, 0, 0, -0.001, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.996, -0.001, 0, 0, -0.001, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  48.39% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  53.11% { -webkit-transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  54.64% { -webkit-transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  70.32% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  78.85% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  87.6% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  96.77% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}

@keyframes animation2 { 
  0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  2.18% { -webkit-transform: matrix3d(1.097, 0.164, 0, 0, 0.081, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, 0.164, 0, 0, 0.081, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  3.1% { -webkit-transform: matrix3d(1.135, 0.212, 0, 0, 0.105, 1.135, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.135, 0.212, 0, 0, 0.105, 1.135, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  4.36% { -webkit-transform: matrix3d(1.176, 0.258, 0, 0, 0.128, 1.176, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.176, 0.258, 0, 0, 0.128, 1.176, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  6.2% { -webkit-transform: matrix3d(1.213, 0.285, 0, 0, 0.141, 1.213, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.213, 0.285, 0, 0, 0.141, 1.213, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  6.54% { -webkit-transform: matrix3d(1.217, 0.285, 0, 0, 0.141, 1.217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.217, 0.285, 0, 0, 0.141, 1.217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  8.67% { -webkit-transform: matrix3d(1.228, 0.264, 0, 0, 0.13, 1.228, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.228, 0.264, 0, 0, 0.13, 1.228, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  12.3% { -webkit-transform: matrix3d(1.215, 0.182, 0, 0, 0.09, 1.215, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.215, 0.182, 0, 0, 0.09, 1.215, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.05% { -webkit-transform: matrix3d(1.206, 0.14, 0, 0, 0.07, 1.206, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.206, 0.14, 0, 0, 0.07, 1.206, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  16.76% { -webkit-transform: matrix3d(1.199, 0.084, 0, 0, 0.042, 1.199, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.199, 0.084, 0, 0, 0.042, 1.199, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.31% { -webkit-transform: matrix3d(1.197, 0.058, 0, 0, 0.029, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.197, 0.058, 0, 0, 0.029, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  19.42% { -webkit-transform: matrix3d(1.197, 0.042, 0, 0, 0.021, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.197, 0.042, 0, 0, 0.021, 1.197, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  22.48% { -webkit-transform: matrix3d(1.198, 0.011, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.198, 0.011, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  22.58% { -webkit-transform: matrix3d(1.198, 0.01, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.198, 0.01, 0, 0, 0.005, 1.198, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  24.41% { -webkit-transform: matrix3d(1.141, -0.001, 0, 0, -0.001, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.141, -0.001, 0, 0, -0.001, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  25.91% { -webkit-transform: matrix3d(1.097, -0.007, 0, 0, -0.003, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, -0.007, 0, 0, -0.003, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  29.25% { -webkit-transform: matrix3d(1.025, -0.011, 0, 0, -0.005, 1.025, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.025, -0.011, 0, 0, -0.005, 1.025, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  30.18% { -webkit-transform: matrix3d(1.011, -0.011, 0, 0, -0.006, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.011, -0.011, 0, 0, -0.006, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  30.42% { -webkit-transform: matrix3d(1.008, -0.011, 0, 0, -0.006, 1.008, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.008, -0.011, 0, 0, -0.006, 1.008, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  32.58% { -webkit-transform: matrix3d(0.99, -0.01, 0, 0, -0.005, 0.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99, -0.01, 0, 0, -0.005, 0.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  35.91% { -webkit-transform: matrix3d(0.981, -0.007, 0, 0, -0.004, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.981, -0.007, 0, 0, -0.004, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  40.98% { -webkit-transform: matrix3d(0.989, -0.003, 0, 0, -0.002, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.989, -0.003, 0, 0, -0.002, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  44.51% { -webkit-transform: matrix3d(0.996, -0.001, 0, 0, -0.001, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.996, -0.001, 0, 0, -0.001, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  48.39% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  53.11% { -webkit-transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  54.64% { -webkit-transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0.001, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  70.32% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  78.85% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  87.6% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  96.77% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}





            `}</style>

            <animated.div style={props.animateLoading} className="loading">
                <div className="img">
                    <img ref={imgRef} onLoad={onLoad} alt="1" className={`loadingLogo ${classHide}`} src={asset("/images/logo.png")} />
                </div>
            </animated.div>
        </>

    )
}

Loading.propTypes = {

}

export default Loading
