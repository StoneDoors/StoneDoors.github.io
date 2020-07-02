var x,y;
var isPen=false;
var pen;
var canvas=document.getElementById("can");
function bb(event){
	isPen=true;
	x=event.offsetX;
	y=event.offsetY;	
	pen=document.getElementById("can").getContext("2d");	
}
function cc(){
	isPen=false;
}
function aa(event){
	if(isPen){
	pen=document.getElementById("can").getContext("2d");
	var x1=event.offsetX;
	var y1=event.offsetY;
	var ox=(x1-x)/2+x;
	var oy=(y1-y)/2+y;
	var r=Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2))/2;
	pen.beginPath();
	pen.strokeStyle=getColor();
	pen.arc(ox,oy,r,0,Math.PI*2);
	pen.stroke();
	pen.save();
	}
}
function getColor(){
	 return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('');
}