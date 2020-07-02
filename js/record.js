var baseUrl = "http://stonedoors.cn:8099/test";

var startTime = 1;
var limit = 1;
var clock = 0;

function initOb() {
    var innerHtml = "";
    for (var i = 1; i <= 15600; i++) {
        var color = "#666666";
        innerHtml += "<div class='ob' id='" + i + "' style='background-color: " + color + "'></div>";
    }
    document.getElementById("oa").innerHTML = innerHtml;
}

function startFind() {
    clock = setInterval(function () {
        $.post(baseUrl + "/findHistory",
            {
                startTime: startTime,
                limit: limit,
            },
            function (data) {
                if (data.code = 200) {
                    var list = data.data;
                    if (list.length != 0) {
                        for (var i = 0; i < list.length; i++) {
                            var id = list[i].quarryId;
                            var color = list[i].quarryColor;
                            document.getElementById(id).style.backgroundColor = color;
                        }
                        startTime = list[list.length - 1].createTime;
                        initTimeStamp();
                    } else {
                        clearInterval(clock);
                        clock = 0;
                    }
                }
            }
        );
    }, 100)
}

function endFind() {
    clearInterval(clock);
    clock = 0;
}

function find() {
    if (clock == 0) {
        startFind();
    } else {
        endFind();
    }
}

function initTimeStamp() {
    $("#timeStamp").text(timestampToTime(startTime))
}

function chooseTime() {
    if ($("#datePick").val() != undefined && $("#datePick").val() != "") {
        initOb()
        startTime = new Date($("#datePick").val()).getTime();
        initTimeStamp();
    }
}

initOb()

function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}