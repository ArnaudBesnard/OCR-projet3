var carousel = $(".carousel");

var objSlider = {

    currDeg: 0,

    initSlider: function () {
        $(".next").on("click", {
            d: "n"
        }, rotate);
        $(".prev").on("click", {
            d: "p"
        }, rotate);

        function rotate(event) {
            if (event.data.d == "n") {
                objSlider.currDeg = objSlider.currDeg - 60;
            }
            if (event.data.d == "p") {
                objSlider.currDeg = objSlider.currDeg + 60;
            }
            carousel.css({
                "-webkit-transform": "rotateY(" + objSlider.currDeg + "deg)",
                "-moz-transform": "rotateY(" + objSlider.currDeg + "deg)",
                "-o-transform": "rotateY(" + objSlider.currDeg + "deg)",
                "transform": "rotateY(" + objSlider.currDeg + "deg)"
            });
        }

        //Gestion du slider via le clavier
        $('body').keydown(function (event) {
            if (event.keyCode === 39) {
                objSlider.currDeg = objSlider.currDeg - 60;
                carousel.css({
                    "transform": "rotateY(" + objSlider.currDeg + "deg)"
                })
            } else if (event.keyCode === 37) {
                objSlider.currDeg = objSlider.currDeg + 60;
                carousel.css({
                    "transform": "rotateY(" + objSlider.currDeg + "deg)"
                })

            }
        })
    }
}
