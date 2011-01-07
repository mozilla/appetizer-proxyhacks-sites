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
          manifest: manifest,
          url: '/manifest.json',
          callback: function () {
            div.text('Installed!');
            div.addClass('success');
          }
        });
        return false;
      });
      $('a.close', div).click(function () {
        div.remove();
        return false;
      });
      body.prepend(div);
    }
  });

});

manifest = {
  "manifest_version": "0.2",
  "name": "Reddit (proxyhack)",
  "description": "the voice of the internet -- news before it happens",
  "base_url": "http://reddit.colorstudy.com",
  "icons": {
    "16": "favicon.ico"
  },
  "developer": {
    "name": "Mozilla Labs, Ian Bicking",
    "url": "http://apps.mozillalabs.com",
    "email": "ianb@mozilla.com"
  },
  "installs_allowed_from": [
    "https://appstore.mozillalabs.com"
  ],
  "locales": {
    "es": {
      "description": "la voz del Internet - noticias antes de que ocurra"
    }
  },
  "default_locale": "en",
  "release": "2011-01-08T12:00:00Z"
};
