'use strict';

var canvasPreview = document.getElementById('canvas-preview');
var canvasJoin = document.getElementById('canvas-joinimage');

canvasJoin.height = screen.height; 
canvasJoin.width = screen.width*2; 

var video = document.getElementById('video');
video.width = screen.width;
video.height = screen.height;

var arrow =  document.getElementById('arrow')

var btPanoramicCamera = document.getElementById('bt-start');

var lastImage = null;

btPanoramicCamera.addEventListener("click",function(){
	canvasJoin.style.opacity = 0;
	video.style.opacity = 1;
	canvasPreview.style.opacity = 1;
		
	drawPreview(canvasPreview,0);
});



function drawPreview(canvas, time){
	
	var ctx  = canvas.getContext("2d");
	
	//if(lastImage != null)
		lastImage = ctx;
	
	ctx.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
	var previewWidth = screen.width*.15;
	var previewHeight = screen.height*.15;
	
	var top = 20;
	
	var marginLeftVideo =  time;
	var marginLeftArrow =  (previewWidth) + 5 + marginLeftVideo;
	

	
	var alt = comprimeImage(video);
	
	//ctx.drawImage(video, marginLeftVideo, top, previewWidth, previewHeight);
	ctx.drawImage(alt, marginLeftVideo, top, previewWidth, previewHeight);
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
	
}


function comprimeImage(video){
	
	var canvalt = document.getElementById("canvas-altenativ");
	var ctxalt = canvalt.getContext("2d");
	canvalt.height = screen.height; 
	canvalt.width = screen.width;
	ctxalt.drawImage(video, 0,0, video.width, video.height);

	
	var size = 10;
	var i = 350;
	//for(var i=0; i< screen.width; i+=size){
		for(var j=0; j< screen.height; j+=size){
			var pixels = ctxalt.getImageData(i+size/2, j+size/2, 1,1);
			var red = pixels.data[0];
			var green = pixels.data[1];
			var blue = pixels.data[2];
			var alfa = pixels.data[3];
			ctxalt.beginPath();
			ctxalt.fillStyle= "rgba("+red+","+green+","+blue+","+alfa/255+")";
			ctxalt.rect(i, j, size, size);
			ctxalt.fill();
		}		
	//}	
	
	return canvalt;
}

function copyImage(canvas1, canvas2, time){
	
	var ctx1 = canvas1.getContext("2d");
	var ctx2 = canvas2.getContext("2d");

	ctx2.drawImage(video,time-.5,0);	

}


