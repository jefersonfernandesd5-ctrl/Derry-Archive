/* Derry Archive — cache simples para abrir sem internet.
   Mude VERSION sempre que publicar uma nova versão do site. */
const VERSION = 'da-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const same = new URL(r.url).origin === location.origin;
  if (same && (r.mode === 'navigate' || /\.html?$/.test(new URL(r.url).pathname))) {
    // página: tenta a rede primeiro (sempre a versão mais recente), cai para a cache se estiver offline
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(VERSION).then(k => k.put('index.html', c)); return res; }).catch(() => caches.match('index.html')));
    return;
  }
  // restante (ícones, fontes, imagens): cache primeiro, atualiza em segundo plano
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(VERSION).then(k => k.put(r, c)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
