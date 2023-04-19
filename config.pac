var configUrl = 'https://raw.githubusercontent.com/Vincent056/okd4_files/master/test.config';
var proxyUrls = [], proxyBypassUrls = [];

function updateConfig() {
  fetch(configUrl).then(response => response.json())
    .then(data => {
      proxyUrls = data.proxyUrls;
      proxyBypassUrls = data.proxyBypassUrls;
    })
    .catch(error => console.error('Error fetching config:', error));
}

updateConfig();
setInterval(updateConfig, 60 * 1000);

function FindProxyForURL(url, host) {
  // Use the proxy for URLs matching the proxyUrls
  for (var i = 0; i < proxyUrls.length; i++) {
    if (url.indexOf(proxyUrls[i]) == 0) {
      return 'HTTP 192.168.50.108:1087';
    }
  }

  // Don't use the proxy for URLs matching the proxyBypassUrls
  for (var i = 0; i < proxyBypassUrls.length; i++) {
    if (url.indexOf(proxyBypassUrls[i]) == 0) {
      return 'DIRECT';
    }
  }

  // Default to using the proxy
  return 'HTTP 192.168.50.108:1087';
}
