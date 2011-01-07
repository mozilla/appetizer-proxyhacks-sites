jQuery(function () {

  var body = $('body');
  if (! body.length) {
    body = $(document);
  }
  navigator.apps.getInstalled(function (v) {
    if (! v.length) {
      // The app is not yet installed
      var div = $('<div class="appetizer"><a href="#" class="close">&#215;</a> <a href="#" class="install">Install this application!</a></div>');
      $('a.install', div).click(function () {
        navigator.apps.install({
          url: '/manifest.json',
          callback: function () {
            div.text('Installed!');
            div.addClass('success');
          }
        });
      });
      $('a.close', div).click(function () {
        div.remove();
      });
      body.prepend(div);
    }
  });

});

