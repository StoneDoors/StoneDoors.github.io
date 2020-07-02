$(function(){
        var x=0,y=0;
        $(document).mousedown(function(event){
            x=event.clientX-50;
            y=event.clientY-50;
            window.clearInterval(timer);
            move();
        });
        $(document).mouseup(function(){
            timer=window.setInterval(move,1000);
        });
        function move(){
            var height=window.innerHeight;
            var width=window.innerWidth;
            if(x==0&&y==0){
                x=parseInt(Math.random()*(width-100));
                y=parseInt(Math.random()*(height-100));
            }
            $("#caid1").stop().animate({left:+x+'px',top:+y+'px'},1000);
            x=0;
            y=0;
        }
        var timer=window.setInterval(move,1000);
    });
    $(function(){
        function add(){
            var x=$("#caid1").offset().left;
            var y=$("#caid1").offset().top;

            $("#caid2").append("<img class='caiimg' src='unit.png' style='left:"+x+"px; top:"+y+"px'/>");
            $("#caid2 img").animate({width:'0px',height:'0px',top:'-=10px',left:'+=50px'},500);
            var l=$("#caid2 img").length;
            if(l>500){
                $("#caid2 img:lt(80)").remove();
            }
        }
        window.setInterval(add,10);
    });