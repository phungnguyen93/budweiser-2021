import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Qr from 'plugins/qr/Qr'
const QRCode = require('qrcode')



const QRScene = props => {

    const [base64, setbase64] = useState("")

    const onChange = (e) => {
        console.log(e.currentTarget.value);

        createQr(e.currentTarget.value);
    }

    const createQr = async (params) => {
        const blob = await Qr.toBlob(params)

        setbase64(URL.createObjectURL(blob));
    }


    return (
        <>
            <style global jsx>{`
            html, body{
                background-color: black;
            }
            `}</style>
            <style jsx>{`
            
            `}</style>

            <div>
                <form>
                    <input onChange={onChange}></input>
                </form>

                <img src={base64}></img>
            </div>
        </>

    )
}

QRScene.propTypes = {

}

export default QRScene
