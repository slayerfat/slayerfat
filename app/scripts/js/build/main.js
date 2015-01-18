$(document).ready(function(){
  $('.catalogo-carrusel').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000;
  });
});
;// centra el elemento segun su altura
$(function() {
  var patron = /[0-9.]+/;
  var altura = $('.site-welcome').height();
  var rendered = $('.welcome-titulo').height();
  rendered = patron.exec(rendered);
  
  $('.welcome-titulo').css('margin-top', (altura/2) - rendered);
  console.log('.welcome-titulo: rendered: '+rendered+
    ' altura: '+altura);
});
