// 烟花
function Firework(sx, sy, ex, ey, hue){
    this.sx = sx; // 开始x轴
    this.sy = sy; // 开始y轴
    this.ex = ex; // 结束x轴
    this.ey = ey; // 结束y轴
    this.x = sx; // 实时x轴
    this.y = sy; // 实时y轴
    this.old = new Array(); // 之前的旧角度
    this.speed = random(50, 100);
    this.angle = Math.atan2(ey - sy, ex - sx); // 角度
    this.actualDistance = 0; // 实际路径
    this.distance = countDistance(sx, sy, ex, ey); // 计算总距离
    this.acceleration = 1.05; // 加速
    this.friction = 0.95 //摩擦力
    this.gravity = 1; //重力
    this.hue = hue; // 色调
    this.brightness = random(50, 80); //随机明度
    this.alpha = 1; //初始透明度
    this.decay = random(0.015, 0.03); //碎屑小时的时间
    this.color = "black";
    // 现将old存储两个xy, 防止画出的时候下标溢出
    this.old.push({x:this.x, y:this.y});
    this.old.push({x:this.x, y:this.y});
}
// 烟花路径更新
Firework.prototype.update = function(){
    this.old.push({x:this.x, y:this.y}); // 储存废旧路径
    var x = Math.cos(this.angle) * this.speed;
    var y = Math.sin(this.angle) * this.speed;
    this.actualDistance = countDistance(this.sx, this.sy, this.x + x, this.y + y);
    this.x += x;
    this.y += y;
    this.old.push({x:this.x, y:this.y});
    if(this.distance < this.actualDistance) // 行走路径大于实际路径
        return false; // 烟花到目标燃放点
    else
        return true; // 烟花未到目标燃放点
}
// 爆炸颗粒
function Particle(x, y, hue){
    this.x = x;
    this.y = y;
    this.old = new Array(); // 记录步数
    this.angle = random(0, 2 * Math.PI); // 任意角度
    this.speed = random(1, 10); //随机速度
    this.friction = 0.95 //摩擦力
    this.gravity = 1; //重力
    this.hue = random(hue - 20, hue + 20); //生成与烟花色彩相近的碎屑
    this.brightness = random(50, 80); //随机明度
    this.alpha = 1; //初始透明度
    this.decay = random(0.015, 0.03); //碎屑存在时间
}
// 爆炸颗粒更新
Particle.prototype.update = function(){
    this.old.push({x:this.x, y:this.y});
    this.speed *= this.friction; // 添加重力
    this.x += Math.cos(this.angle) * this.speed; // 计算下一步x轴
    this.y += Math.sin(this.angle) * this.speed + this.gravity; // 计算下一步y轴 + 重力
    this.old.push({x:this.x, y:this.y});
    this.alpha -= this.decay; // 每走一步消除碎屑透明度
    if(this.alpha < this.decay){ // 碎屑透明度轻于碎屑存在时间
        return false; // 烟花要消失
    }else{
        return true; // 烟花在燃放
    }
}
// 爆炸颗粒工厂
function ParticleFactory(sx, sy, hue){
    var array = new Array();
    var size = random(50, 500); // 烟花数量
    var scope = random(50, 500); // 烟花范围
    for(var i = 0 ; i < size ; i++){
        array.push(new Particle(sx, sy, hue));
    }
    return array;
}
// 随机数
function random(min, max) {
    return Math.random() * (max - min) + min;
}
// 随机颜色
function randomRgba(min, max) {
    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    var opacity = random(0.1, 1);
    var color = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
    return color;
}
// 计算角度
function countDistance(x, y, xx, yy) {
    var a = x - xx;
    var b = y - yy;
    return Math.sqrt(a * a + b * b);
}
// 清空画布
function clear(){
//	ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
}
// 画线
function draw(obj){
    ctx.beginPath();
    ctx.moveTo(obj.old[obj.old.length-2].x, obj.old[obj.old.length-2].y);
    ctx.lineTo(obj.x, obj.y);
    var color = 'hsla(' + obj.hue + ',100%,' + obj.brightness + '%,' + obj.alpha + ')';
    ctx.strokeStyle = color;
    ctx.stroke();
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = window.innerWidth - 10, height = window.innerHeight - 10;
var widthBorder = width * 0.1;
var heightBorder = height * 0.1;
var hue = 20;
canvas.width = width;
canvas.height = height;

// canvas.onclick = function(){
//     moveParticle(ParticleFactory(event.x, event.y, hue+=10))
// }
//
// canvas.oncontextmenu = function(e){
//     e.preventDefault();
//     clear();
// }

setInterval(function () {
    moveParticle(ParticleFactory(Math.random()*width,Math.random()*height, hue+=10))
},500)

setInterval(function () {
    clear();
},2000)
// 组合
function run(){
    var x = width / 2;
    var y = height;
    var xx = random(widthBorder, width - widthBorder);
    var yy = random(heightBorder, height - heightBorder);
    var firework = new Firework(x, y, xx, yy, hue);
    hue += 10;
    moveFirework(firework);
}
// 烟花线
function moveFirework(f){
    var id = setInterval(function(){
        // 设置不画线
        draw(f);
        if(!f.update()){
            draw(f);
            clearInterval(id);
            moveParticle(ParticleFactory(f.x, f.y, f.hue));
        }
    }, 200);

}
// 爆炸屑
function moveParticle(arr){
    var id = setInterval(function(){
        var i = arr.length;
        var o = null;
        if(i){
            //	 clear();
        }else{
            clearInterval(id);
        }
        while(i--){
            o = arr[i];
            if(o.update()){
                draw(o);
            }else{
                arr.splice(i, 1);
            }
        }
    }, 100);
}
