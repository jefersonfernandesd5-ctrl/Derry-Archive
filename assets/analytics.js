/* Carrega medição só quando site.config.js traz um valor. */
(function () {
  var cfg = (window.DERRY && window.DERRY.analytics) || {};
  var token = String(cfg.cloudflareWebAnalyticsToken || '').trim();
  var ga = String(cfg.ga4MeasurementId || '').trim();

  if (token) {
    var beacon = document.createElement('script');
    beacon.defer = true;
    beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: token }));
    document.head.appendChild(beacon);
  }

  if (/^G-[A-Z0-9]+$/.test(ga)) {
    var gtag = document.createElement('script');
    gtag.async = true;
    gtag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga);
    document.head.appendChild(gtag);
    window.dataLayer = window.dataLayer || [];
    function g() { window.dataLayer.push(arguments); }
    window.gtag = g;
    g('js', new Date());
    g('config', ga);
  }
})();
