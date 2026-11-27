/* Liga formulário, afiliados e UTMs ao site.config.js. Não envia nada se o campo estiver vazio. */
(function () {
  var cfg = window.DERRY || {};
  var aff = cfg.affiliates || {};
  var news = cfg.newsletter || {};

  document.querySelectorAll('[data-aff="amazon"]').forEach(function (a) {
    var tag = String(aff.amazonBrTag || '').trim();
    if (!tag) return;
    try {
      var u = new URL(a.href);
      u.searchParams.set('tag', tag);
      a.href = u.toString();
    } catch (e) {}
  });

  document.querySelectorAll('[data-aff="shopee"]').forEach(function (a) {
    var pattern = String(aff.shopeeAffiliateUrl || '').trim();
    if (!pattern || pattern.indexOf('{q}') === -1) return;
    var q = a.getAttribute('data-q') || '';
    a.href = pattern.replace('{q}', encodeURIComponent(q));
  });

  var form = document.getElementById('newsletter');
  if (form) {
    var action = String(news.formAction || '').trim();
    var note = document.getElementById('newsletter-note');
    var field = String(news.emailField || 'email').trim() || 'email';
    var email = form.querySelector('input[type="email"]');
    if (email) email.name = field;
    if (action) {
      form.action = action;
      form.method = 'POST';
    } else {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (note) note.hidden = false;
        var ig = document.getElementById('newsletter-ig');
        if (ig) ig.focus();
      });
    }
  }

  var params = new URLSearchParams(location.search);
  var keep = [];
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
    var value = params.get(key);
    if (value) keep.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  });
  if (!keep.length) return;
  var qs = keep.join('&');
  document.querySelectorAll('a[href^="/"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.indexOf('utm_') !== -1) return;
    var hash = '';
    var cut = href.indexOf('#');
    if (cut !== -1) {
      hash = href.slice(cut);
      href = href.slice(0, cut);
    }
    a.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + qs + hash);
  });
})();
