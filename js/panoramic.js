'use strict';

var canvasPreview = document.getElementById('canvas-preview');
var video = document.getElementById('video');
var arrow =  document.getElementById('arrow')
var contextCanvasPreview = canvasPreview.getContext("2d");
drawPreview(contextCanvasPreview,0);

function drawPreview(ctx, time){
	ctx.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
	var previewWidth = screen.width*.15;
	var previewHeight = screen.height*.15;
	
	var top = 20;
	if(time > (screen.width - previewWidth*2) )
		time = 0;
	
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
	
	setTimeout(function() {
        drawPreview(ctx,time+.5);
      }, 0);
}