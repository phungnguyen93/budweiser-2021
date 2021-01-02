import gsap, { Sine } from "gsap"

// check for device orientation support
var DEVICE_ORIENTATION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};
var deviceOrientation = DEVICE_ORIENTATION.VERTICAL;


/**
 * @type {AppWebcam}
 */
var webcam;
var isWebcamSupport = false;
var video
var _container;

var isInit = false;
var isSuccess = false;
// var onSetupComplete;

var _scale = 1;
var _videoWidth = 1;
var _videoHeight = 1;

/**
 * 
 * @param {Object} param0 
 * @param {Object} param0.container
 * @param {Function} param0.onRejected
 * @param {Function} param0.onReady
 * @param {"environment|user"} param0.facingMode
 */
function requestWebcam({ container, onRejected, onReady, facingMode = "environment" }) {
  // options = options || {};

  if (isInit) {
    if (isWebcamSupport) {
      video.style.display = "block";

      if (onReady) onReady()

      const webcamloadedmetadata = new CustomEvent("webcamloadedmetadata", {
        detail: {
          videoWidth: _videoWidth,
          videoHeight: _videoHeight,
          scale: _scale,
      }
      });

      window.dispatchEvent(webcamloadedmetadata)
    } else {
      if (onRejected) onRejected()

    }


    // webcamloadedmetadata

    return;
  }
  isInit = true;
  _container = container;
  video = document.createElement("video")
  video.style.position = "absolute"
  video.style.top = 0
  video.style.left = 0
  video.style.width = "100%"
  video.style.height = "100%"
  video.style.zIndex = 5;

  // video.style.opacity = 0;
  container.append(video)

  gsap.set(video, { opacity: 0 });

  // $(video).css("z-index", "-2");
  // $(video).css("position", "absolute");
  // $(video).css("top", "0px");
  // $(video).css("left", "0px");

  stopWebcam();

  webcam = new AppWebcam(video, facingMode);
  webcam.onReady = function (e) {
    setupApp();

    isSuccess = true;
    isWebcamSupport = true;

    if (onReady) onReady(e)
  };

  webcam.onRejected = function (e) {
    setupApp();

    isWebcamSupport = false;

    // if (typeof gaTrackingClick != "undefined") gaTrackingClick('request_permission', 'reject_camera');

    if (onRejected) onRejected(e);
  };

  return webcam;
}


function setupApp() {
  var _isAllow = false;

  if (video) gsap.to(video, { duration: .7, opacity: 1, ease: Sine.easeInOut });

  if (typeof webcam != 'undefined') {
    if (webcam.isAllowed) {
      // gsap.to(video, { duration: 2, opacity: 1 });
      _isAllow = true;
    }
  }
}

function stopWebcam() {
  if (webcam) webcam.remove();
}

/**
 * @param  {HTMLVideoElement} videoElement
 */
function AppWebcam(videoElement, facingMode) {
  // define scope
  var scope = this;

  // private vars
  /**
   * @type {MediaDeviceInfo[]}
   */
  var inputCameras = [];

  /**
   * @type {MediaStreamConstraints}
   */
  var requestedMediaConstraints = {
    video: {
      // width: 640,
      // height: 480,
      // facingMode: { exact: "environment" }
      // facingMode: 'user'
      facingMode: facingMode

    },
    audio: false,
  };

  /**
   * @type {MediaStream}
   */
  var stream;
  var isAllowed = false;
  /**
   * @type {HTMLVideoElement}
   */
  var video;
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'AppWebcam' + new Date().getTime());

  // var requestWidth = deviceOrientation == DEVICE_ORIENTATION.VERTICAL
  //   ? 360
  //   : 640;
  // var requestHeight = deviceOrientation == DEVICE_ORIENTATION.VERTICAL
  //   ? 640
  //   : 360;

  this.currentCamera = null;

  // initialise
  init();

  // constructor
  function init() {
    if (!videoElement) {
      video = document.createElement('video');
    } else {
      video = videoElement;
    }
    //alert("!");

    // canvasElement = document.getElementById ('canvas');
    // canvasElement.width = window.innerWidth - 50;
    // canvasElement.height = canvasElement.width;
    // canvas = canvasElement.getContext ('2d');
    // loadingMessage = document.getElementById ('loadingMessage');

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    // start requesting media permissions:

    console.log("[Camera.js] Requesting:", requestedMediaConstraints);

    if (navigator.mediaDevices.enumerateDevices === undefined) {
      setTimeout(function () {
        handleError({ name: 'Error', message: 'NotSupported' });
      }, 50);
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then(parseDevices)
        .catch(handleError);
    }

    // navigator.mediaDevices.getUserMedia(requestedMediaConstraints).then(() => {
    //   if (typeof navigator.mediaDevices.enumerateDevices == "undefined") {
    //     setTimeout(function () {
    //       handleError({ name: 'Error', message: 'NotSupported' });
    //     }, 50);
    //   } else {
    //     navigator.mediaDevices
    //       .enumerateDevices()
    //       .then(parseDevices)
    //       .catch(handleError);
    //   }
    // }).catch(handleError);
  }

  /**
   * @param  {MediaDeviceInfo[]} devices
   */
  function parseDevices(devices) {
    inputCameras = [];
    devices.forEach(function (device) {
      if (
        device.kind == 'videoinput' &&
        typeof device.deviceId != 'undefined' &&
        device.deviceId != ''
      ) {
        inputCameras.push(device);
      }
    });
    // //alert (JSON.stringify (devices));

    if (inputCameras.length > 0) {
      console.log(inputCameras);
      var cams = '', index = 0;
      var _id = typeof idCamera == "undefined" ? 0 : idCamera;
      var backCamera = inputCameras[_id];

      if ((inputCameras.length > 1)) {
        backCamera = inputCameras[inputCameras.length - 1];
      }

      inputCameras.forEach(function (cam) {
        cams += index + ' - ' + cam.label + ' (' + cam.deviceId + '). \n';

        var label = cam.label.toLowerCase();
        if (label.indexOf('back') > -1 || label.indexOf('facetime') > -1) {
          backCamera = cam;
        }
        index++;
      });

      //alert(backCamera.deviceId);
      scope.currentCamera = backCamera;

      if (scope.onGotDevices) scope.onGotDevices(devices);

      var constraints;
      if (requestedMediaConstraints.facingMode == "environment")
        constraints = {
          video: {
            deviceId: { exact: backCamera.deviceId },
          },
          audio: false,
        };
      else {
        constraints = requestedMediaConstraints;
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(onStreamReceived)
        .catch(handleError);

      // navigator.mediaDevices
      //   .getUserMedia (constraints)
      //   .then (onStreamReceived)
      //   .catch (handleError);
    } else {
      if (scope.onGotDevicesFailed) scope.onGotDevicesFailed();

      const requestedMedia = {
        video: {
        },
        audio: false,
      }

      navigator.mediaDevices
        .getUserMedia(requestedMedia)
        .then(onStreamReceived)
        .catch(handleError);
    }
    // } else {
    //   // They clicked no
    //   handleError ({name: 'NotAllowedError', message: 'NotAllowedError'});
    // }
  }

  function getStreamOfCameraId(id) {
    var constraints = {
      video: { deviceId: { exact: id } },
      audio: false,
    };

    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(resolve)
        .catch(reject);
    })
  }

  /**
   * @param  {MediaStream} stream
   */
  function onStreamReceived(stream) {
    if (inputCameras.length == 0) {
      console.log("[Camera.js] Not found any back cameras, request again?")
      navigator.mediaDevices
        .enumerateDevices()
        .then(parseDevices)
        .catch(handleError);
      return;
    }

    isAllowed = true;

    playWebcamVideo(stream);
  }

  /**
   * @param  {MediaStream} _stream
   */
  function playWebcamVideo(_stream) {
    stream = _stream;

    if ('srcObject' in video) {
      // //alert ('GOT STREAM VIDEO OBJECT');
      video.srcObject = _stream;
    } else {
      // //alert ('GOT STREAM VIDEO SOURCE URL');
      // Avoid using this in new browsers, as it is going away.
      video.src = window.URL.createObjectURL(_stream);
    }

    // required to tell iOS safari we don't want fullscreen
    video.setAttribute('playsinline', true);
    video.setAttribute('muted', true);
    video.setAttribute('autoplay', true);
    video.muted = true;
    video.autoplay = true;
    video.style.objectFit = 'cover';
    video.play();

    // auto play
    video.addEventListener('canplay', function (e) {
      // //alert ('CAN PLAY');
    });

    video.addEventListener('canplaythrough', function (e) {
      // //alert ('CAN PLAY THROUGH');
    });

    video.addEventListener('error', (e) => console.log("[Camera.js] <video> error:", e))

    video.addEventListener('stalled', function (e) {
      // //alert ('CANNOT GET METADATA');
      isAllowed = false;
      console.log('[Camera.js] <video> stalled:', e);
      if (scope.onRejected != null) scope.onRejected(e);
    });

    video.addEventListener('loadedmetadata', function (e) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      let scale = 1;

      canvas.style.width = window.outerWidth + 'px'
      canvas.style.height = window.outerHeight + 'px'

      if (scope.currentCamera.label.toLowerCase().indexOf('facetime') > -1) {
        video.style.transform = 'scaleX(-1)';
        video.style.webkitTransform = 'scaleX(-1)';
        scale = -1;
      }

      if (facingMode == "user") {
        video.style.transform = 'scaleX(-1)';
        video.style.webkitTransform = 'scaleX(-1)';
        scale = -1;
      }

      video.play();

      if (scope.onReady) scope.onReady(video);

      _videoWidth = video.videoWidth;
      _videoHeight = video.videoHeight;
      _scale = scale;

      const webcamloadedmetadata = new CustomEvent("webcamloadedmetadata", {
        detail: {
          videoWidth: _videoWidth,
          videoHeight: _videoHeight,
          scale: _scale,
        }
      });

      window.dispatchEvent(webcamloadedmetadata)
    });
  }

  function handleError(err) {
    console.error(err);
    var errMsg = '[Camera.js] ' + err.name + ': ' + err.message;
    console.error(errMsg);

    isAllowed = false;

    if (scope.onRejected != null) scope.onRejected(err);
  }

  function drawVideo() {
    var ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  }

  function captureAsBase64(callback) {
    console.log(`[Camera.js] Base64 captured -> ${video.videoWidth}x${video.videoHeight}`);

    drawVideo();

    setTimeout(() => {
      var screenshot = canvas.toDataURL('image/png');
      if (callback) callback(screenshot);
    }, 200);

    // TweenMax.delayedCall(0.2, function () {
    //   var screenshot = canvas.toDataURL('image/png');
    //   if (callback) callback(screenshot);
    // });
  }

  function captureAsImageData() {
    drawVideo();

    var ctx = canvas.getContext('2d');
    return ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
  }

  function dispose() { }

  function enable() { }

  function disable() { }

  function remove() {
    video.style.display = "none";
    // if (stream) stream.getTracks().forEach(track => track.stop());
    // // container.append(video)
    // _container.removeChild(video);
    // isInit = false;

    // video.style.display = 'none';
  }

  // exports
  this.enable = enable;
  this.disable = disable;
  this.video = video;
  this.inputCameras = inputCameras;
  this.canvas = canvas;
  this.captureAsBase64 = captureAsBase64;
  this.captureAsImageData = captureAsImageData;
  this.onReady = null;
  this.onRejected = null;
  this.onGotDevices = null;
  this.onGotDevicesFailed = null;
  this.init = init;
  this.remove = remove;
  this.stream = stream;
}

function getSizeByRatio(videoWidth, videoHeight, compareWidth, compareHeight) {
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



export {
  getSizeByRatio,
  video,
  webcam,
  isWebcamSupport,
  requestWebcam,
  stopWebcam,
}