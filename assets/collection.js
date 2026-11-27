/* Estantes de Folclore e Arquivos do Terror. Só publica ficha com publicado=true e título. */
(function () {
  var root = document.getElementById('shelves');
  var intro = document.getElementById('intro');
  var url = document.body.getAttribute('data-collection');
  if (!root || !url) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function published(list) {
    return (list || []).filter(function (item) {
      return item && item.publicado === true && String(item.titulo || '').trim();
    });
  }

  fetch(url, { cache: 'no-store' }).then(function (r) {
    return r.ok ? r.json() : null;
  }).then(function (data) {
    if (!data) return;
    if (intro && String(data.introducao || '').trim()) intro.textContent = String(data.introducao).trim();
    var cats = Array.isArray(data.categorias) ? data.categorias : [];
    var fichas = published(data.fichas);
    if (!cats.length) {
      root.innerHTML = '<article class="shelf"><h2>Arquivo</h2><p class="empty">Nenhuma ficha publicada ainda.</p></article>';
      return;
    }
    root.innerHTML = cats.map(function (cat) {
      var id = String(cat.id || '');
      var items = fichas.filter(function (f) { return String(f.categoria || '') === id; });
      var body = items.length
        ? items.map(function (f) {
            var bits = '';
            if (f.numero) bits += '<p class="kicker">Nº ' + esc(f.numero) + (f.data ? ' · ' + esc(f.data) : '') + '</p>';
            else if (f.data) bits += '<p class="kicker">' + esc(f.data) + '</p>';
            bits += '<h3>' + esc(f.titulo) + '</h3>';
            if (String(f.resumo || '').trim()) bits += '<p>' + esc(f.resumo) + '</p>';
            if (String(f.fonte || '').trim()) bits += '<p class="fine">Fonte: ' + esc(f.fonte) + '</p>';
            if (String(f.instagram || '').trim()) bits += '<a class="more" href="' + esc(f.instagram) + '" rel="noopener">Ver no Instagram</a>';
            return '<article class="card">' + bits + '</article>';
          }).join('')
        : '<p class="empty">Nenhuma ficha publicada ainda.</p>';
      return '<section class="shelf" id="' + esc(id) + '"><p class="kicker">Estante</p><h2>' + esc(cat.titulo || 'Sem título') + '</h2>' + body + '</section>';
    }).join('');
  }).catch(function () {});
})();
