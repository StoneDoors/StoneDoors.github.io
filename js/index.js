var baseUrl = "http://stonedoors.cn:8099/test";
var lastTime = undefined;
var penColor = "#666666";

function addOb() {
    if (lastTime == undefined) {
        var defaultNumber = 1040;
        for (var count = 0; count < 15; count++) {
            var finalId = count * defaultNumber + 1;
            $.post(baseUrl + "/findQuarrys",
                {
                    id: finalId,
                    number: defaultNumber,
                },
                function (data) {
                    if (data.code = 200) {
                        var list = data.data;
                        for (var i = 0; i < list.length; i++) {
                            var id = list[i].id;
                            var color = list[i].quarryColor;
                            document.getElementById(id).style.backgroundColor = color;
                        }
                    }
                });

        }
    } else {
        $.post(baseUrl + "/findMineRecord",
            {
                lastTime: lastTime,
            },
            function (data) {
                if (data.code = 200) {
                    var list = data.data;
                    for (var i = 0; i < list.length; i++) {
                        var id = list[i].quarryId;
                        var color = list[i].quarryColor;
                        document.getElementById(id).style.backgroundColor = color;
                    }
                }
            });
    }
}

function updatOb(object) {
    $.post(baseUrl + "/updateQuarry",
        {
            id: object.id,
            quarryColor: penColor
        },
        function (data) {
            if (data.code = 200) {
                lastTime = data.data;
                addOb();
            }
        });
}

var getRandomColor = function () {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('');
}

function addPencolor() {
    var innerHtml = "<div class='pencolor' id='pen0' style='background-color:#666666 '></div>";
    for (var i = 1; i < 85; i++) {
        innerHtml += "<div class='pencolor' id='pen" + i + "' style='background-color: " + getRandomColor() + "'></div>";
    }
    document.getElementById("cj").innerHTML = innerHtml;
    $("#pen0").css({"height": "30px", "width": "30px"});
    $(".pencolor").click(function () {
        $(this).css({"height": "30px", "width": "30px"});
        $(this).siblings().css({"height": "20px", "width": "20px"});
        penColor = $(this).css("background-color");
    })
}

function initOb() {
    var innerHtml = "";
    for (var i = 1; i <= 15600; i++) {
        var color = "#666666";
        innerHtml += "<div class='ob' id='" + i + "' style='background-color: " + color + "'></div>";
    }
    document.getElementById("oa").innerHTML = innerHtml;
    $(".ob").click(function () {
        updatOb(this);
    })
}

function addBtns() {
    var innerHtml = "";
    innerHtml += "<a href=\"child/record.html\">忆往昔</a>";
    innerHtml += "<a href=\"shyoo\">Shyoo</a>";
    innerHtml += "<a href=\"VinciEgg\">VinciEgg</a>";
    innerHtml += "<a href=\"noFish\">子非鱼</a>";   
    innerHtml += "<a href=\"redeem\">你要跳舞吗</a>";   
    innerHtml += "<a href=\"fireworks\">打上火花</a>";
    innerHtml += "<a style=\"float: right\" href=\"http://beian.miit.gov.cn/\" target=\"view_window\">辽ICP备19019844号</a>";
    document.getElementById("bts").innerHTML = innerHtml;
}

initOb()
addOb()
addPencolor()
addBtns()
