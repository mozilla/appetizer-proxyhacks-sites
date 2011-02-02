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
      script.setAttribute('src', 'https://stage.myapps.mozillalabs.com/jsapi/include.js');
      document.getElementsByTagName('head')[0].appendChild(script);
      loadedHTML5 = true;
      console.log('Loading HTML5 API from:',
                  script.getAttribute('src'));
    } else {
      console.log('HTML5 API still not loaded, trying later');
    }
    setTimeout(checkInstall, 200);
    return;
  }
  console.log('navigator.apps available:', navigator.apps);
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
    console.log('Installing via html5 implementation');
    navigator.apps.install({
      url: location.protocol + '//' + location.host + url,
      callback: success
    });
  } else {
    console.log('fetching manifest to install from:', url);
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function () {
      if (req.readyState != 4) {
        return;
      }
      // FIXME: handle errors...
      var manifestObj = JSON.parse(req.responseText);
      console.log('Manifest loaded:', manifestObj);
      navigator.apps.install({
        manifest: manifestObj,
        callback: success
      });
    };
    req.send();
  }
}

function success(result, extra) {
  console.log("installed result:", result, extra);
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

console.log('readyState', document.readyState);
if (document.readyState === 'complete') {
  setTimeout(checkInstall, 10);
} else {
  window.addEventListener("load", checkInstall, false);
}
