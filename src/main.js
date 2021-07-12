function roll(id) {
    let contId = $(id);
    let slid_id = "_slide" + Math.random().toString().slice(2);
    contId.append(
        '<div class="slide" id="' +
            slid_id +
            '">\
            <ul>\
                <li><img src="./src/images/cat.jpeg"/></li>\
                <li><img src="./src/images/dog.jpeg"/></li>\
                <li><img src="./src/images/er.jpeg"/></li>\
                <li><img src="./src/images/tiger.jpeg"/></li>\
            </ul>\
        </div>',
    );
    let moveImg = function () {
        $("#" + slid_id + " ul").animate(
            {
                left: "-40rem",
            },
            "slow",
            function () {
                $("#" + slid_id + " li:first").appendTo(
                    $("#" + slid_id + " ul"),
                );
                $("#" + slid_id + " ul").css({ left: 0 });
                setTimeout(() => {
                    moveImg();
                }, 2000);
            },
        );
    };
    $("#" + slid_id + " ul").css({
        width: $("#" + slid_id + " li").length * 40 + "rem",
    });
    setTimeout(() => {
        moveImg();
    }, 2000);
}

function roll2(id) {
    let contId = $(id);
    let slid_id = "_slide" + Math.random().toString().slice(2);
    contId.append(
        '<div class="slide" id="' +
            slid_id +
            '">\
            <ul class="transition">\
            <li><img src="./src/images/cat.jpeg"/></li>\
            <li><img src="./src/images/dog.jpeg"/></li>\
            <li><img src="./src/images/er.jpeg"/></li>\
            <li><img src="./src/images/tiger.jpeg"/></li>\
            <li><img src="./src/images/cat.jpeg"/></li>\
            </ul>\
        </div>',
    );
    let step = 0;
    let sum = $("#" + slid_id + " ul li").length;
    let $ul = $("#" + slid_id + " ul");
    $("#" + slid_id + " ul").css({
        width: $("#" + slid_id + " li").length * 40 + "rem",
    });
    let moveImg = function () {
        if ($ul.hasClass("notransition")) {
            $ul.removeClass("notransition");
        }
        $ul.css({ transform: "translate3d(-" + step * 40 + "rem,0, 0)" });
    };

    setInterval(() => {
        step++;
        if (step >= sum) {
            step = 1;
            $ul.addClass("notransition").css({
                transform: "translate3d(0,0, 0)",
            });
        }
        setTimeout(() => {
            moveImg();
        }, 100);
    }, 2200);
}
function ggk() {
    var context = document.getElementById("myCanvas").getContext("2d");
    var $canvas = $("#myCanvas");
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "#ddd";
    // var imageObj = new Image();
    // imageObj.onload = function() {
    // context.drawImage(imageObj, 0, 0,300,100);
    // imageObj.src = "https://xxx.jpg";
    context.fillRect(0, 0, 300, 100);
    var clientOffsetX = $canvas.offset().left || 30;
    var clientOffsetY = $canvas.offset().top;
    $canvas.off();
    $canvas.bind({
        // mouseover: function(event) {
        //   event.preventDefault();
        //   context.globalCompositeOperation = "destination-out";
        //   context.lineJoin = "round";
        //   context.lineCap = "round";
        //   context.strokeStyle = "#dddddd";
        //   context.lineWidth = 20;
        //   context.beginPath();
        //   context.moveTo(event.offsetX, event.offsetY);
        // },
        // mousemove: function(event) {
        //   event.preventDefault();
        //   context.lineTo(event.offsetX, event.offsetY);
        //   context.stroke();
        // },
        // mouseout: function(event) {
        //   event.preventDefault();
        //   context.closePath();
        //   isShow();
        // },
        touchstart: function (event) {
            event.preventDefault();
            context.lineJoin = "round";
            context.lineCap = "round";
            context.lineWidth = 20;
            context.globalCompositeOperation = "destination-out";
            context.beginPath();
            context.moveTo(
                NP.minus(event.changedTouches[0].clientX, clientOffsetX),
                NP.minus(event.changedTouches[0].clientY,clientOffsetY)
            );
            console.log(event.changedTouches[0].clientX);
            console.log(clientOffsetX);
            console.log(NP.minus(event.changedTouches[0].clientX, clientOffsetX));
        },
        touchmove: function (event) {
            event.preventDefault();
            context.lineTo(
                NP.minus(event.changedTouches[0].clientX, clientOffsetX),
                NP.minus(event.changedTouches[0].clientY,clientOffsetY)
            );
            context.stroke();
        },
        touchend: function (event) {
            event.preventDefault();
            context.closePath();
            isShow();
        },
    });
    function isShow() {
        var data = context.getImageData(0, 0, 300, 100).data;
        for (var i = 0, j = 0; i < data.length; i += 4) {
            if (
                data[i] == 0 &&
                data[i + 1] == 0 &&
                data[i + 2] == 0 &&
                data[i + 3] == 0
            ) {
                j++;
            }
        }
        if (j / (300 * 100) > 0.2) {
            console.log("被打开的像素数据大于20%");
        }
    }
}

$(() => {
    roll($("#adv1"));
    roll2($("#adv2"));
    ggk();
});
