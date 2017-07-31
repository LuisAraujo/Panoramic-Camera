'use strict';

var canvasPreview = document.getElementById('canvas-preview');
var canvasJoin = document.getElementById('canvas-joinimage');

canvasJoin.height = screen.height; 
canvasJoin.width = screen.width*2; 

var video = document.getElementById('video');
var arrow =  document.getElementById('arrow')

var btPanoramicCamera = document.getElementById('bt-start');

btPanoramicCamera.addEventListener("click",function(){
	canvasJoin.style.opacity = 0;
	video.style.opacity = 1;
	canvasPreview.style.opacity = 1;
		
	drawPreview(canvasPreview,0);
});



function drawPreview(canvas, time){
	var ctx  = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
	var previewWidth = screen.width*.15;
	var previewHeight = screen.height*.15;
	
	var top = 20;
	
	var marginLeftVideo =  time;
	var marginLeftArrow =  (previewWidth) + 5 + marginLeftVideo;
	ctx.drawImage(video, marginLeftVideo, top, previewWidth, previewHeight);
	ctx.drawImage(arrow, marginLeftArrow , top + (previewWidth/2) + 10, 20,20);
	
	ctx.beginPath();
	ctx.lineWidth="1";
	ctx.strokeStyle="#aaa";
	ctx.rect(0,top,canvasPreview.width-2,previewHeight );
	ctx.stroke();
	
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.strokeStyle="#fff";
	ctx.rect(marginLeftVideo,top, previewWidth, previewHeight);
	ctx.stroke();	
	
	if(time > (screen.width - previewWidth*2) ){
		time = 0;
		canvasJoin.style.opacity = 1;
		video.style.opacity = 0;
		canvasPreview.style.opacity = 0;
	}else {
		copyImage(canvas, canvasJoin, time);
		
		setTimeout(function() {
			drawPreview(canvas,time+.5);
		}, 0);
	}
}


function copyImage(canvas1, canvas2, time){
	
	var ctx1 = canvas1.getContext("2d");
	var ctx2 = canvas2.getContext("2d");

	ctx2.drawImage(video,time-.5,0);	
	

}