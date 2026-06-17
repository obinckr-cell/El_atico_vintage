const CACHE_NAME = "atico-v5";

const urlsToCache = [
  "./",
  "./index.html",
  "./logo.png",

  "./inglesa.jpg",
  "./brooklyn.jpg",
  "./york.jpg",
  "./aloha.jpg",
  "./manchester.jpg",

  "./brunch_mix.jpg",
  "./brunch.jpg",
  "./brunch_pollo.jpg",

  "./tacos.jpg",
  "./quesadillas.jpg",

  "./colombianas.jpg",

  "./mango.jpg",
  "./sfresa.jpg",
  "./smora_azul.jpg",
  "./ssandia.jpg",
  "./smandarina.jpg",
  "./smanzanaV.jpg",
  "./misoda.jpg",
  "./smaracuya.jpg",
  "./stamarindo.jpg",

  "./coca.jpg",
  "./coronita.jpg",
  "./agua.jpg",
  "./tinto.jpg",
  "./aromatica.jpg",

  "./papas.jpg",
  "./carne.jpg",
  "./salsa.jpg",
  "./queso.jpg"
];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME){
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {

        if(response){
          return response;
        }

        return fetch(event.request)
          .then(networkResponse => {

            const copy = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, copy));

            return networkResponse;

          })
          .catch(() => caches.match("./index.html"));

      })
  );

});