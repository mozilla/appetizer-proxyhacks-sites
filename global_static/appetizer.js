var onReady = function () {
  if (! navigator.apps) {
    // Hasn't loaded for some reason :P
    setTimeout(onReady, 100);
    return;
  }

  var body = document.getElementsByTagName('body')[0];
  navigator.apps.getInstalled(function (v) {
    if (! v.length) {
      // The app is not yet installed
      var div = document.createElement('div');
      div.className = 'appetizer';
      div.innerHTML = '<a href="#" class="close">&#215;</a>' +
        '<a href="#" class="install">Install this application!</a>';
      var close = div.getElementsByTagName('a')[0];
      var install = div.getElementsByTagName('a')[1];
      close.addEventListener('click', function () {
        div.style.display = 'none';
        return false;
      }, false);
      install.addEventListener('click', function () {
        navigator.apps.install({
          url: location.protocol + '//' + location.host + "/manifest.json",
          callback: function () {
            install.innerHTML = "Installed!";
            div.className += ' success';
          }
        });
        return false;
      }, false);
      body.insertBefore(div, body.childNodes[0]);
    }
  });
};

if (document.readyState == 'complete' || true) {
  onReady();
} else {
  document.addEventListener("load", onReady, false);
}

