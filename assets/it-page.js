/* Páginas /it, /pennywise e /derry. Os textos factuais vêm de assets/it-data.js. */
(function () {
  var data = window.IT_DATA;
  var app = document.getElementById('app');
  if (!data || !app) return;

  var focus = document.body.getAttribute('data-focus') || 'it';
  var tipos = {
    romance: 'Romance', filme: 'Filme', serie: 'Série',
    minisserie: 'Minissérie', telefilme: 'Telefilme'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function nome(x) { return x.pt || x.t || ''; }
  function ficha(id) {
    return '<a class="more" href="/#obra/' + encodeURIComponent(id) + '">Abrir a ficha na enciclopédia</a>';
  }
  function work(x) {
    var orig = x.pt && x.pt !== x.t ? '<p class="orig">' + esc(x.t) + '</p>' : '';
    return '<article class="card"><p class="kicker">' + esc(x.y || 'Sem ano') + ' · ' + esc(tipos[x.k] || x.k) + '</p><h2>' + esc(nome(x)) + '</h2>' + orig + (x.s ? '<p>' + esc(x.s) + '</p>' : '') + ficha(x.id) + '</article>';
  }
  function adapt(x) {
    var quando = x.st === 'futuro' ? 'Em breve' : (x.y || 'Sem data');
    var onde = [x.on, x.d && x.d !== '—' ? x.d : ''].filter(Boolean).join(' · ');
    var orig = x.pt && x.pt !== x.t ? '<p class="orig">' + esc(x.t) + '</p>' : '';
    return '<article class="card"><p class="kicker">' + esc(quando) + ' · ' + esc(tipos[x.k] || x.k) + (onde ? ' · ' + esc(onde) : '') + '</p><h2>' + esc(nome(x)) + '</h2>' + orig + (x.s ? '<p>' + esc(x.s) + '</p>' : '') + ficha(x.id) + '</article>';
  }
  function buys() {
    var q = 'It A Coisa Stephen King';
    var amazon = 'https://www.amazon.com.br/s?k=' + encodeURIComponent(q);
    var shopee = 'https://shopee.com.br/search?keyword=' + encodeURIComponent(q);
    return '<div class="buys"><a class="btn" data-aff="amazon" data-q="' + esc(q) + '" href="' + amazon + '" rel="sponsored noopener">Comprar na Amazon</a><a class="btn" data-aff="shopee" data-q="' + esc(q) + '" href="' + shopee + '" rel="sponsored noopener">Comprar na Shopee</a></div>';
  }
  function mapBlock() {
    var lis = (data.map.places || []).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
    return '<section class="section"><h2>' + esc(data.map.title) + '</h2><p class="dek">' + esc(data.map.note) + '</p><ul class="places">' + lis + '</ul></section>';
  }

  var itAdapts = data.adaptations.filter(function (a) { return (a.src || []).indexOf('it') !== -1; });
  var otherAdapts = data.adaptations.filter(function (a) { return (a.src || []).indexOf('it') === -1; });
  var otherBooks = data.books.filter(function (b) { return b.id !== 'it'; });
  var html = '';

  if (focus === 'pennywise') {
    html += '<section class="section"><h2>Nas telas</h2><div class="stack">' + itAdapts.map(adapt).join('') + '</div></section>';
    html += '<section class="section"><h2>No livro</h2>' + work(data.novel) + buys() + '</section>';
    html += '<section class="section"><h2>A cidade</h2><article class="card"><p class="kicker">' + esc(data.universe.sub) + '</p><h2>' + esc(data.universe.n) + '</h2><p>' + esc(data.universe.d) + '</p><a class="more" href="/derry/">Abrir a página de Derry</a></article></section>';
  } else if (focus === 'derry') {
    html += mapBlock();
    html += '<section class="section"><h2>Livros ligados a Derry</h2><p class="dek">Só entram obras que a enciclopédia já marca neste universo. Revisão de ' + esc(data.revisao) + '.</p><div class="stack">' + data.books.map(work).join('') + '</div></section>';
    html += '<section class="section"><h2>Adaptações</h2><div class="stack">' + data.adaptations.map(adapt).join('') + '</div></section>';
    html += buys();
  } else {
    html += '<section class="section">' + work(data.novel) + '</section>';
    html += '<section class="section"><h2>Pennywise nas telas</h2><div class="stack">' + itAdapts.map(adapt).join('') + '</div></section>';
    html += '<section class="section"><h2>Outros livros de Derry</h2><div class="stack">' + otherBooks.map(work).join('') + '</div></section>';
    if (otherAdapts.length) {
      html += '<section class="section"><h2>Adaptações desses livros</h2><div class="stack">' + otherAdapts.map(adapt).join('') + '</div></section>';
    }
    html += '<section class="section"><h2>A cidade</h2><article class="card"><p class="kicker">' + esc(data.universe.sub) + '</p><h2>' + esc(data.universe.n) + '</h2><p>' + esc(data.universe.d) + '</p><a class="more" href="/derry/">Ver Derry</a></article></section>';
    html += mapBlock();
    html += buys();
  }

  html += '<section class="section"><div class="follow"><div><p class="eyebrow">Série</p><h2>Arquivos do Terror</h2><p>O episódio sai no Instagram. O arquivo fica no site.</p></div><a class="btn primary" href="https://www.instagram.com/derryarchive.site/" rel="noopener">Seguir no Instagram</a></div><p class="fine" style="margin-top:14px"><a href="/comece-aqui/#newsletter">Receber a newsletter semanal</a></p></section>';
  app.innerHTML = html;

  var lead = document.getElementById('lead');
  if (lead && focus === 'derry') lead.textContent = data.universe.d;
})();
