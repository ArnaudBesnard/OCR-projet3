   jQuery(document).ready(function ($) {


     var slideCount = $('#slider ul li').length;
     var slideWidth = $('#slider ul li').width();
     var slideHeight = $('#slider ul li').height();
     var sliderUlWidth = slideCount * slideWidth;

     $('#slider').css({
       width: slideWidth,
       height: slideHeight
     });

     $('#slider ul').css({
       width: sliderUlWidth,
       marginLeft: -slideWidth
     });

     $('#slider ul li:last-child').prependTo('#slider ul');
     //fonction slider vers la gauche
     function moveLeft() {
       $('#slider ul').animate({
         left: +slideWidth
       }, 200, function () {
         $('#slider ul li:last-child').prependTo('#slider ul');
         $('#slider ul').css('left', '');
       });
     };
     //Fonction slider vers la droite
     function moveRight() {
       $('#slider ul').animate({
         left: -slideWidth
       }, 200, function () {
         $('#slider ul li:first-child').appendTo('#slider ul');
         $('#slider ul').css('left', '');
       });
     };

     $('a.control_prev').click(function () {
       moveLeft();
     });

     $('a.control_next').click(function () {
       moveRight();
     });

     //Gestion du slider via le clavier
     $('body').keydown(function (e) {
       if (e.keyCode === 39) {
         console.log("click vers la droite")
         moveRight();
       } else if (e.keyCode === 37) {
         console.log("click vers la gauche")
         moveLeft();
       }
     })


   });
