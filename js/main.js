/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

var videoElement = document.querySelector('video');
var arrayCameras = [];
var currentCamera= 0;
var btSwitchCamera = document.getElementById('bt-switch');
var flagResizeCam = false;

function gotDevices(deviceInfos) { 
  	
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
   
	if (deviceInfo.kind === 'videoinput') {
      arrayCameras.push(deviceInfo.deviceId);
    }
  }
}


navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  
  //setTimeout(resizeCamera, 100);
  return navigator.mediaDevices.enumerateDevices();
}

function start() {
  
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  //var audioSource = audioInputSelect.value;
  var videoSource = arrayCameras[currentCamera]; //videoSelect.value;
  var constraints = {
    //audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).catch(handleError);
        
}


btSwitchCamera.addEventListener("click",function(){
      currentCamera++;
      if(currentCamera >= arrayCameras.length)
      	currentCamera =0;
		
		start();
});


start();

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}
