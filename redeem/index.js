$(function () {
    var x = 0, y = 0;
    var num = 500;
    var innerHtml = "";
    for (var i = 1; i <= num; i++) {
        innerHtml += "<div class='caiimg'  style='border-radius:50%;op:0px;left:0px;background-color:" + getRandomColor() + " ' id='caid" + i + "'/>";
    }
    $("#div1").html(innerHtml);
    $(document).mousedown(function (event) {
        x = event.clientX - 50;
        y = event.clientY - 50;
        run()
    });

    function run() {
        var radius = Math.floor(Math.random() * 100);
        for (var i = 1; i <= num; i++) {
            move("#caid" + i);
            $("#caid" + i).css("border-radius", radius + "%");
            $("#caid" + i).css("opacity", radius + "%");
        }
    }

    window.setInterval(run, 1500);

    function move(id) {
        var height = window.innerHeight;
        var width = window.innerWidth;
        if (x == 0 && y == 0) {
            x = parseInt(Math.random() * (width - 100));
            y = parseInt(Math.random() * (height - 100));
        }
        $(id).stop().animate({left: +x + 'px', top: +y + 'px'}, 1000);
        x = 0;
        y = 0;
    }
});

var getRandomColor = function () {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('');
}
