if (typeof console == 'undefined') {
  var console = {log: function () {}};
}

var loadedHTML5 = false;

function checkInstall() {
  console.log('Checking install');
  if (! navigator.apps) {
    if (! loadedHTML5) {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://stage.myapps.mozillalabs.com');
      document.head.appendChild(script);
      loadedHTML5 = true;
      console.log('Loading HTML5 API from:',
                  script.getAttribute('src'));
    } else {
      console.log('HTML5 API still not loaded, trying later');
    }
    setTimeout(checkInstall, 200);
    return;
  }
  navigator.apps.getInstalled(function (v) {
    if (v && v.length) {
      console.log('Application already installed:', v);
      showInstalled();
      return;
    }
    runInstall();
  });
}

function showInstalled() {
  var el = document.getElementById('message');
  el.innerHTML = "You've installed the application, yay!";
}

function runInstall() {
  var url = '/manifest.json';
  if (navigator.apps.html5Implementation) {
    navigator.apps.install({
      url: location.protocol + '//' + location.host + url,
      callback: success
    });
  } else {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function () {
      if (req.readyState != 4) {
        return;
      }
      // FIXME: handle errors...
      var manifestObj = JSON.parse(req.responseText);
      navigator.apps.install({
        manifest: manifestObj,
        callback: success
      });
    };
  }
}

function success(result) {
  console.log("installed result:", result);
  if (result === true) {
    showInstalled();
    return;
  }
  if (result === false) {
    // Huh, show error somehow? (cancelled)
  } else {
    // Well, now show internal error somehow
  }
}

if (document.readyState == 'complete') {
  checkInstall();
} else {
  document.addEventListener("load", checkInstall, false);
}
