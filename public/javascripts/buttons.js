$('#on').click(function() {
  $.get('/on', function(data) {
    $('.result').html(data);
  });
});

$('#off').click(function() {
  $.get('/off', function(data) {
    $('.result').html(data);
  });
});

$('#blink').click(function() {
  $.get('/blink', function(data) {
    $('.result').html(data);
  });
});
