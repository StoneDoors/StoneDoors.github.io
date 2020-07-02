var x=0;
var y=0;
var n=0;
function bb(){
    isPen=true;
    aa();
    x=parseInt(Math.random()*(document.getElementById("can").width));
    y=parseInt(Math.random()*(document.getElementById("can").height));
    n++;
}
function getcolor() {
    let color="#";
    for(let i=0;i<6;i++){
        let j=parseInt(Math.random()*15);
        if(j==10){
            color+="A";
        }else if(j==11) {
            color += "B";
        }else if(j==12) {
            color += "C";
        }else if(j==13) {
            color += "D";
        }if(j==14) {
            color += "E";
        }if(j==15) {
            color += "F";
        }else{
            color+=j;
        }
    }
    return color;
}
var a=window.setInterval(bb,500);
function aa(){
    if(isPen){
        var c=document.getElementById("can");
        var pen=c.getContext("2d");
        pen.strokeStyle =getcolor();
        var x1=x;
        var y1=y;
        pen.lineTo(x1,y1);
        pen.moveTo(x,y);
        pen.stroke();
        x=x1;
        y=y1;
    }
}
   	