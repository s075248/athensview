/* Keeps every phone / WhatsApp / email / Instagram link in sync with assets/js/data.js */
(function () {
  if (!window.AV) return;
  var C = window.AV.config;
  document.querySelectorAll('[data-wa-link]').forEach(function (a) { a.href = 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent('Hello Athens View! I would like to know more about staying with you.'); });
  document.querySelectorAll('[data-tel-link]').forEach(function (a) { a.href = 'tel:' + C.phoneTel; });
  document.querySelectorAll('[data-mail-link]').forEach(function (a) { a.href = 'mailto:' + C.email; });
  document.querySelectorAll('[data-ig-link]').forEach(function (a) { a.href = 'https://instagram.com/' + C.instagram; });
  document.querySelectorAll('[data-phone]').forEach(function (n) { n.textContent = C.phoneDisplay; });
  document.querySelectorAll('[data-email]').forEach(function (n) { n.textContent = C.email; });
  document.querySelectorAll('[data-map-link]').forEach(function (a) { a.href = 'https://www.google.com/maps/search/?api=1&query=' + C.lat + ',' + C.lng; });
})();
