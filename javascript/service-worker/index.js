if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./worker.js')
    .then(() => {
      console.log('ServiceWorker registration successful');
    })
    .catch(() => {
      console.log('ServiceWorker registration failed');
    })
}
