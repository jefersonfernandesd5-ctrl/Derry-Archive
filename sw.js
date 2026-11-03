// Service worker mínimo: não faz cache, apenas deixa os pedidos seguirem para a rede.
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', () => { /* sem interceção */ });
