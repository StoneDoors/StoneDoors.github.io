//获取canvas的上下文
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
setSize();
var txt = "ꦿ: ོོꦿ℘༊ོོꦿ℘";
var arr = txt.split("");
var font_size = 16;
var column = Math.floor(canvas.width / font_size);
var drop = [];
var num = canvas.height / 16
for (var i = 0; i < column; i++) {
    drop[i] = num;
}

init();

//初始化
function init() {
    setSize();
    setInterval(drawLR, 50)
    setInterval(drawRL, 50)
}

//输入文字
function drawLR() {
    ctx.fillStyle = "rgba(137,91,138,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";//文字颜色
    // ctx.font = font_size +"px arial";
    //逐行输出文字、
    for (var i = 0; i < drop.length; i++) {
        //随机输出文字
        var text = arr[Math.floor(Math.random() * arr.length)];
        //输出文字,重新计算坐标
        ctx.fillText(text, drop[i] * font_size, i * font_size);
        if (drop[i] == 0 || Math.random() > 0.9) {
            drop[i] = num;
        }
        drop[i]--;
    }
}

function drawRL() {
    ctx.fillStyle = "rgba(137,91,138,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";//文字颜色
    // ctx.font = font_size +"px arial";
    //逐行输出文字、
    for (var i = 0; i < drop.length; i++) {
        //随机输出文字
        var text = arr[Math.floor(Math.random() * arr.length)];
        //输出文字,重新计算坐标
        ctx.fillText(text, canvas.width - drop[i] * font_size, canvas.height - i * font_size);

        if (drop[i] == 0 || Math.random() > 0.9) {
            drop[i] = num;
        }
        drop[i]--;
    }
}

//重新计算画布大小
window.onresize = function () {
    setSize();
}

//设置画布大小
function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}