var objCanvas = {

    initCanvas: function () {
        var canvas = document.querySelector('#canvas');
        var context = canvas.getContext('2d');

        $('#canvas').mousedown(function (event) {
            var mouseX = event.pageX - this.offsetLeft;
            var mouseY = event.pageY - this.offsetTop;

            paint = true;
            addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
            redraw();
        });
        /******/

        /******/

        $('#canvas').mousemove(function (event) {
            if (paint) {
                addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
                redraw();
            }
        });

        $('#canvas').mouseup(function (event) {
            paint = false;

        });

        $('#canvas').mouseleave(function (event) {
            paint = false;
        });

        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;

        function addClick(x, y, dragging) {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging);
        }

        function redraw() {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
            context.strokeStyle = "#333";
            context.lineJoin = "round";
            context.lineWidth = 4;

            for (var i = 0; i < clickX.length; i++) {
                context.beginPath();
                if (clickDrag[i] && i) {
                    context.moveTo(clickX[i - 1], clickY[i - 1]);
                } else {
                    context.moveTo(clickX[i] - 1, clickY[i]);
                }
                context.lineTo(clickX[i], clickY[i]);
                context.closePath();
                context.stroke();
            }
        }

        function efface() {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        };
        $('.buttonEfface').click(function () {
            efface();
            objCanvas.initCanvas();

        });

    }

}
