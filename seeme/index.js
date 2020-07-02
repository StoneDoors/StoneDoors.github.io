function addOb() {
    var innerHtml = "";
    for (var i = 1; i <= 10000; i++) {
      var color = getRandomColor();
      innerHtml += "<div class='ob' style='background-color:" + color + "'></div>";
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
  window.setInterval('addOb()', 500);