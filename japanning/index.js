function addOb() {
    var innerHtml = "";
    for (var i = 1; i <= 10000; i++) {
        var color = "#666666"
        innerHtml += "<div class='ob' id='ob" + i + "' style='background-color:" + color + "'></div>";
    }
    document.getElementById("oa").innerHTML = innerHtml;
}

var getRandomColor = function () {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('');
}

function japanning() {
    var id = Math.floor(Math.random() * 9999) + 1;
    document.getElementById("ob" + id).style.backgroundColor = getRandomColor();
}

addOb()
window.setInterval('japanning()', 1);