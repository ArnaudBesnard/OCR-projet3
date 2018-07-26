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

        function rotate(e) {
            if (e.data.d == "n") {
                objSlider.currDeg = objSlider.currDeg - 60;
            }
            if (e.data.d == "p") {
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
        $('body').keydown(function (e) {
            if (e.keyCode === 39) {
                objSlider.currDeg = objSlider.currDeg - 60;
                carousel.css({
                    "transform": "rotateY(" + objSlider.currDeg + "deg)"
                })
            } else if (e.keyCode === 37) {
                objSlider.currDeg = objSlider.currDeg + 60;
                carousel.css({
                    "transform": "rotateY(" + objSlider.currDeg + "deg)"
                })

            }
        })
    }
}
