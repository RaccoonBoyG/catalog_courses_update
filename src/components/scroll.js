import $ from 'jquery';

$(function () {
  $.fn.scrollToTop = function () {
    $(this).hide().removeAttr('href');
    if ($(window).scrollTop() >= '250') $(this).fadeIn('faster');
    var scrollDiv = $(this);
    $(window).scroll(function () {
      if ($(window).scrollTop() <= '250') $(scrollDiv).fadeOut('faster');
      else $(scrollDiv).fadeIn('faster');
    });
    $(this).click(function () {
      $('html, body').animate(
        {
          scrollTop: 0,
        },
        'faster'
      );
    });
  };
});

const scroll = () =>
  $(function () {
    $('.back_to_top').scrollToTop();
  });

export default scroll;
