const QRCode = require('qrcode')

const OPTIONS = {
    errorCorrectionLevel: "M",
    width: 512,
    margin: 4,
}

export default class Qr {


    static async toBase64(text, options = {}) {
        if (!text) return;
        var errorCorrectionLevel = options.hasOwnProperty("errorCorrectionLevel") ? options.errorCorrectionLevel : OPTIONS.errorCorrectionLevel;
        var width = options.hasOwnProperty("width") ? options["width"] : OPTIONS.width;
        var margin = options.hasOwnProperty("width") ? options["margin"] : OPTIONS.margin;

        console.log(width)
        return await QRCode.toDataURL(text, { errorCorrectionLevel, width, margin, })
    }


    static async toBlob(text, options = {}) {
        if (!text) return;
        var errorCorrectionLevel = options.hasOwnProperty("errorCorrectionLevel") ? options.errorCorrectionLevel : OPTIONS.errorCorrectionLevel;
        var width = options.hasOwnProperty("width") ? options["width"] : OPTIONS.width;
        var margin = options.hasOwnProperty("width") ? options["margin"] : OPTIONS.margin;

        const canvas = await QRCode.toCanvas(text, { errorCorrectionLevel, width, margin, });
        return await new Promise(resolve => canvas.toBlob(resolve));
    }

    static dispose() {
        console.log('Qr dispose... !')
        return;
    }
}