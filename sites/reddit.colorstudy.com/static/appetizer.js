$(function () {

  var body = $('body');
  if (! body.length) {
    body = $(document);
  }
  navigator.apps.getInstalled(function (v) {
    if (! v.length) {
      // The app is not yet installed
      var div = $('<div class="appetizer"><a href="#">Install this application!</a></div>');
      $('a', div).click(function () {
        navigator.install({
          url: '/manifest.json',
          callback: function () {
            div.text('Installed!');
            div.addClass('success');
          }
        });
      });
      body.prepend(div);
    }
  });

});

