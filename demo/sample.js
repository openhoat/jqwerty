$(function () {

  $('li').insertAfterBegin('This is ');
  $('li').insertBeforeEnd(' of the list');
  $('p').insertAfterEnd('<a id="link" href="#">click me</a>');
  $('#link').onclick = function () {
    $('h2').toggle2('orange', 'blue');
    $('li').toggle2('orange', 'blue');
    return false;
  };

});
