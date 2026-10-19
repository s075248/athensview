/* ==========================================================================
   Athens View Maldives – shared behaviour (navigation, cards, modals, forms)
   ========================================================================== */
(function () {
  'use strict';
  var AV = window.AV, C = AV.config;

  /* ---------- tiny helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var money = function (n) { return C.currency + Number(n).toLocaleString('en-US'); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var iso = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var fromIso = function (s) { var p = (s || '').split('-'); return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]) : null; };
  var addDays = function (d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; };
  var nightsBetween = function (a, b) { var A = fromIso(a), B = fromIso(b); return A && B ? Math.round((B - A) / 864e5) : 0; };
  var prettyDate = function (s) { var d = fromIso(s); return d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'; };
  var byId = function (list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; };
  var wa = function (text) { return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(text); };

  /* ---------- search state (shared between pages) ---------- */
  function defaults() {
    var t = new Date(); t.setHours(0, 0, 0, 0);
    return { checkin: iso(addDays(t, 14)), checkout: iso(addDays(t, 19)), guests: 2, room: 'all' };
  }
  function getSearch() {
    var s = defaults(), q = new URLSearchParams(location.search), saved = {};
    try { saved = JSON.parse(sessionStorage.getItem('av_search') || '{}'); } catch (e) {}
    ['checkin', 'checkout', 'guests', 'room'].forEach(function (k) {
      var v = q.get(k) || saved[k]; if (v) s[k] = k === 'guests' ? Math.max(1, Math.min(8, parseInt(v, 10) || 2)) : v;
    });
    var today = iso(new Date());
    if (s.checkin < today) { var d = defaults(); s.checkin = d.checkin; s.checkout = d.checkout; }
    if (s.checkout <= s.checkin) s.checkout = iso(addDays(fromIso(s.checkin), 1));
    return s;
  }
  function saveSearch(s) { try { sessionStorage.setItem('av_search', JSON.stringify(s)); } catch (e) {} }
  function qs(obj) { var p = new URLSearchParams(); Object.keys(obj).forEach(function (k) { if (obj[k] !== '' && obj[k] != null) p.set(k, obj[k]); }); return p.toString(); }

  /* ---------- toast ---------- */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.id = 'av-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  }

  /* ---------- modal ---------- */
  var modal, lastFocus;
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div'); modal.className = 'av-modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = '<div class="sheet" tabindex="-1"></div>';
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('[data-close-modal]')) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    document.body.appendChild(modal); return modal;
  }
  function openModal(html) {
    ensureModal(); lastFocus = document.activeElement;
    $('.sheet', modal).innerHTML = html; modal.classList.add('open'); document.body.style.overflow = 'hidden';
    $('.sheet', modal).scrollTop = 0; $('.sheet', modal).focus();
  }
  function closeModal() { if (!modal) return; modal.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }

  /* ---------- image fallback (remote photos) ---------- */
  document.addEventListener('error', function (e) {
    var t = e.target; if (t && t.tagName === 'IMG' && !t.dataset.failed) { t.dataset.failed = '1'; t.classList.add('img-fallback'); t.removeAttribute('srcset'); t.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='3'/%3E"; }
  }, true);

  /* ---------- card renderers ---------- */
  function roomLink(room, s) { return 'booking.html?' + qs({ room: room.id, checkin: s.checkin, checkout: s.checkout, guests: s.guests }); }

  function roomCard(room, s, opts) {
    opts = opts || {};
    var n = nightsBetween(s.checkin, s.checkout), fits = s.guests <= room.maxGuests, need = Math.ceil(s.guests / room.maxGuests);
    var total = '';
    if (opts.showTotal && n > 0) {
      total = '<div class="mt-space-sm px-space-md py-space-xs rounded-xl bg-sand-whisper text-primary font-label-md text-label-md flex flex-wrap items-center justify-between gap-1">' +
        '<span>' + n + ' night' + (n > 1 ? 's' : '') + ' · ' + prettyDate(s.checkin) + ' → ' + prettyDate(s.checkout) + '</span>' +
        '<span class="font-title-md text-title-md">' + money(room.price * n * need) + ' total' + (need > 1 ? ' (' + need + ' rooms)' : '') + '</span></div>' +
        (!fits ? '<p class="mt-1 font-label-sm text-label-sm text-bougainvillea-primary">Sleeps up to ' + room.maxGuests + ' — we\'ve priced ' + need + ' rooms for ' + s.guests + ' guests.</p>' : '');
    }
    return '<article class="rounded-3xl bg-surface-pure shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 border border-primary/5" data-room="' + room.id + '">' +
      '<div class="relative w-full h-56 md:h-80 overflow-hidden bg-primary/10">' +
      '<img loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="' + room.images[0] + '" alt="' + esc(room.name) + ' interior"/>' +
      '<span class="absolute top-space-md left-space-md px-space-md py-1 rounded-full ' + (room.badgeStyle === 'magenta' ? 'bg-bougainvillea-primary' : 'bg-primary-container') + ' text-on-primary font-label-sm text-label-sm shadow-md">' + esc(room.badge) + '</span>' +
      '<button type="button" data-room-details="' + room.id + '" class="absolute bottom-space-md right-space-md flex items-center gap-1 px-space-sm py-1 rounded-full bg-inverse-surface/80 backdrop-blur-md text-surface-pure font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px]">photo_camera</span><span>' + room.photos + ' Photos</span></button>' +
      '<div class="absolute bottom-space-md left-space-md px-space-md py-1.5 rounded-xl bg-surface-pure/95 backdrop-blur-md shadow-md text-primary"><span class="font-headline-sm text-headline-sm font-bold">' + money(room.price) + '</span><span class="font-label-sm text-label-sm text-on-surface-variant"> / night</span></div></div>' +
      '<div class="p-space-lg md:p-space-xl flex flex-col flex-1 justify-between"><div>' +
      '<div class="flex items-center justify-between gap-space-sm mb-space-xs"><h3 class="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary">' + esc(room.name) + '</h3>' +
      '<div class="flex items-center gap-1 text-secondary font-label-sm text-label-sm shrink-0"><span class="material-symbols-outlined text-[18px]">square_foot</span><span>' + room.size + ' m²</span></div></div>' +
      '<p class="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed"><span class="md:hidden">' + esc(room.short) + '</span><span class="hidden md:inline">' + esc(room.desc) + '</span></p>' +
      '<div class="md:hidden flex flex-wrap gap-space-xs mb-space-md">' + room.chips.map(function (c) { return '<span class="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-sand-whisper text-primary font-label-sm text-label-sm"><span class="material-symbols-outlined text-[14px]">' + c[0] + '</span>' + c[1] + '</span>'; }).join('') + '</div>' +
      '<div class="hidden md:grid grid-cols-2 sm:grid-cols-3 gap-space-sm pt-space-xs pb-space-md">' + room.features.map(function (f) {
        return '<div class="flex items-center gap-space-xs font-body-sm text-body-sm ' + (f.accent ? 'text-bougainvillea-primary' : 'text-on-surface') + '"><span class="material-symbols-outlined ' + (f.accent ? 'text-bougainvillea-primary' : 'text-primary') + ' text-[18px]">' + f.icon + '</span><span>' + f.label + '</span></div>'; }).join('') + '</div>' +
      total + '</div>' +
      '<div class="pt-space-md flex items-center justify-between gap-space-md">' +
      '<button type="button" data-room-details="' + room.id + '" class="font-label-lg text-label-lg text-primary hover:text-primary-container flex items-center gap-1 transition-colors">Room Details<span class="material-symbols-outlined text-[18px]">chevron_right</span></button>' +
      '<a href="' + roomLink(room, s) + '" class="px-space-lg py-3 rounded-full bg-bougainvillea-primary hover:bg-bougainvillea-vivid text-on-primary font-label-lg text-label-lg shadow-md hover:-translate-y-0.5 transition-all">Book Now</a></div></div></article>';
  }

  function excCard(x, big) {
    return '<article class="group relative rounded-2xl overflow-hidden ' + (big ? 'h-[420px]' : 'h-72 md:h-[420px]') + ' shadow-lg flex flex-col justify-end p-space-md md:p-space-lg bg-primary cursor-pointer" data-exc-card="' + x.id + '" tabindex="0" role="button" aria-label="' + esc(x.name) + ' – details">' +
      '<img loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" src="' + x.images[0] + '" alt="' + esc(x.name) + '"/>' +
      '<div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>' +
      '<div class="absolute top-space-sm md:top-space-md left-space-sm md:left-space-md right-space-sm md:right-space-md flex items-center justify-between gap-1">' +
      '<span class="px-space-sm py-0.5 rounded-full bg-surface-pure/90 backdrop-blur-md text-primary font-label-sm text-label-sm">' + esc(x.area) + '</span>' +
      (x.tag ? '<span class="px-space-sm py-0.5 rounded-full bg-bougainvillea-primary text-on-primary font-label-sm text-label-sm">' + esc(x.tag) + '</span>' : '<span class="px-space-sm py-0.5 rounded-full bg-surface-pure/30 backdrop-blur-md text-surface-pure font-label-sm text-label-sm">' + esc(x.duration) + '</span>') + '</div>' +
      '<div class="relative z-10"><span class="font-label-sm text-label-sm text-secondary-fixed">' + esc(x.duration) + ' • ' + esc(x.sub) + '</span>' +
      '<h3 class="font-title-md md:font-headline-sm text-title-md md:text-headline-sm text-surface-pure font-bold mt-1 mb-space-xs">' + esc(x.name) + '</h3>' +
      '<p class="hidden md:block font-body-sm text-body-sm text-surface-container-low line-clamp-2 mb-space-md">' + esc(x.short) + '</p>' +
      '<div class="flex items-center justify-between pt-space-xs"><div><span class="font-title-md text-title-md font-bold text-surface-pure">' + money(x.price) + '</span><span class="font-label-sm text-label-sm text-surface-container-low"> / person</span></div>' +
      '<span class="w-10 h-10 rounded-full bg-surface-pure/20 group-hover:bg-surface-pure group-hover:text-primary backdrop-blur-md text-surface-pure flex items-center justify-center transition-all"><span class="material-symbols-outlined text-[20px]">arrow_forward</span></span></div></div></article>';
  }

  /* ---------- modals content ---------- */
  function roomModal(room) {
    var s = getSearch();
    var thumbs = room.images.map(function (src, i) { return '<button type="button" data-thumb="' + i + '" class="w-20 h-14 rounded-lg overflow-hidden border-2 ' + (i ? 'border-transparent' : 'border-bougainvillea-primary') + '"><img class="w-full h-full object-cover" src="' + src + '" alt="' + esc(room.name) + ' photo ' + (i + 1) + '"/></button>'; }).join('');
    openModal('<div class="relative"><img id="modal-main" class="w-full h-64 md:h-96 object-cover bg-primary/10" src="' + room.images[0] + '" alt="' + esc(room.name) + '"/>' +
      '<button type="button" data-close-modal aria-label="Close" class="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-pure/90 text-primary flex items-center justify-center shadow-md"><span class="material-symbols-outlined">close</span></button>' +
      '<div class="absolute bottom-space-sm left-space-md flex gap-space-xs">' + thumbs + '</div></div>' +
      '<div class="p-space-lg md:p-space-xl"><div class="flex flex-wrap items-start justify-between gap-space-sm"><div><span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">' + esc(room.badge) + '</span>' +
      '<h3 class="font-headline-md text-headline-md text-primary">' + esc(room.name) + '</h3></div><div class="text-right"><span class="font-headline-md text-headline-md text-primary font-bold">' + money(room.price) + '</span><span class="font-label-md text-label-md text-on-surface-variant"> / night</span><p class="font-label-sm text-label-sm text-on-surface-variant">' + C.rateNote + '</p></div></div>' +
      '<p class="mt-space-sm font-body-md text-body-md text-on-surface-variant leading-relaxed">' + esc(room.desc) + '</p>' +
      '<div class="mt-space-md grid grid-cols-2 md:grid-cols-3 gap-space-sm"><div class="flex items-center gap-space-xs font-body-sm text-body-sm"><span class="material-symbols-outlined text-primary text-[18px]">square_foot</span>' + room.size + ' m²</div><div class="flex items-center gap-space-xs font-body-sm text-body-sm"><span class="material-symbols-outlined text-primary text-[18px]">group</span>Sleeps ' + room.maxGuests + '</div>' +
      room.features.map(function (f) { return '<div class="flex items-center gap-space-xs font-body-sm text-body-sm"><span class="material-symbols-outlined ' + (f.accent ? 'text-bougainvillea-primary' : 'text-primary') + ' text-[18px]">' + f.icon + '</span>' + f.label + '</div>'; }).join('') + '</div>' +
      '<div class="mt-space-lg flex flex-wrap gap-space-sm"><a href="' + roomLink(room, s) + '" class="px-space-lg py-3 rounded-full bg-bougainvillea-primary hover:bg-bougainvillea-vivid text-on-primary font-label-lg text-label-lg shadow-md transition-all">Book This Room</a>' +
      '<a target="_blank" rel="noopener" href="' + wa('Hello Athens View! I\'d like to ask about the ' + room.name + '.') + '" class="px-space-lg py-3 rounded-full border-[1.5px] border-primary text-primary hover:bg-tertiary-fixed/30 font-label-lg text-label-lg transition-all inline-flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">chat</span>Ask on WhatsApp</a></div></div>');
    $$('[data-thumb]', modal).forEach(function (b) { b.addEventListener('click', function () { $('#modal-main', modal).src = room.images[+b.dataset.thumb]; $$('[data-thumb]', modal).forEach(function (o) { o.classList.toggle('border-bougainvillea-primary', o === b); o.classList.toggle('border-transparent', o !== b); }); }); });
  }

  function excModal(x) {
    var s = getSearch();
    openModal('<div class="relative"><img class="w-full h-64 md:h-80 object-cover bg-primary/10" src="' + x.images[0] + '" alt="' + esc(x.name) + '"/>' +
      '<button type="button" data-close-modal aria-label="Close" class="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-pure/90 text-primary flex items-center justify-center shadow-md"><span class="material-symbols-outlined">close</span></button></div>' +
      '<div class="p-space-lg md:p-space-xl"><div class="flex flex-wrap items-start justify-between gap-space-sm"><div><span class="font-label-sm text-label-sm text-lagoon-cyan uppercase tracking-widest">' + esc(x.area) + '</span><h3 class="font-headline-md text-headline-md text-primary">' + esc(x.name) + '</h3></div>' +
      '<div class="text-right"><span class="font-headline-md text-headline-md text-primary font-bold">' + money(x.price) + '</span><span class="font-label-md text-label-md text-on-surface-variant"> / person</span></div></div>' +
      '<div class="mt-space-sm flex flex-wrap gap-space-sm"><span class="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-sand-whisper text-primary font-label-sm text-label-sm"><span class="material-symbols-outlined text-[14px]">schedule</span>' + esc(x.hours) + '</span><span class="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-sand-whisper text-primary font-label-sm text-label-sm"><span class="material-symbols-outlined text-[14px]">event</span>' + esc(x.depart) + '</span></div>' +
      '<p class="mt-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed">' + esc(x.desc) + '</p>' +
      '<h4 class="mt-space-md font-title-md text-title-md text-primary">What\'s included</h4><ul class="mt-space-xs grid sm:grid-cols-2 gap-space-xs">' + x.includes.map(function (i) { return '<li class="flex items-center gap-space-xs font-body-sm text-body-sm"><span class="material-symbols-outlined text-lagoon-cyan text-[18px]">check_circle</span>' + esc(i) + '</li>'; }).join('') + '</ul>' +
      '<div class="mt-space-lg flex flex-wrap gap-space-sm"><a href="booking.html?' + qs({ checkin: s.checkin, checkout: s.checkout, guests: s.guests, exc: x.id }) + '" class="px-space-lg py-3 rounded-full bg-bougainvillea-primary hover:bg-bougainvillea-vivid text-on-primary font-label-lg text-label-lg shadow-md transition-all">Add to My Booking</a>' +
      '<a target="_blank" rel="noopener" href="' + wa('Hello Athens View! I\'m interested in the ' + x.name + ' excursion.') + '" class="px-space-lg py-3 rounded-full border-[1.5px] border-primary text-primary hover:bg-tertiary-fixed/30 font-label-lg text-label-lg transition-all inline-flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">chat</span>Ask on WhatsApp</a></div></div>');
  }

  /* ---------- mount: rooms / excursions / gallery ---------- */
  function mountRooms() {
    $$('[data-rooms]').forEach(function (box) {
      var s = getSearch(), showTotal = box.dataset.rooms === 'priced', filter = box.dataset.filter !== 'off';
      var list = AV.rooms.filter(function (r) { return !filter || s.room === 'all' || s.room === r.id; });
      box.innerHTML = list.map(function (r) { return roomCard(r, s, { showTotal: showTotal }); }).join('');
      if (filter && s.room !== 'all' && list.length < AV.rooms.length) {
        var more = document.createElement('div'); more.className = 'col-span-full text-center';
        more.innerHTML = '<button type="button" data-show-all-rooms class="px-space-lg py-3 rounded-full border-[1.5px] border-primary text-primary hover:bg-tertiary-fixed/30 font-label-lg text-label-lg transition-all">Show all rooms</button>';
        box.appendChild(more);
      }
    });
  }
  function mountExcursions() {
    $$('[data-excursions]').forEach(function (box) {
      var limit = parseInt(box.dataset.limit || '0', 10), cat = box.dataset.active || 'all';
      var list = AV.excursions.filter(function (x) { return cat === 'all' || x.category === cat; }); if (limit) list = list.slice(0, limit);
      box.innerHTML = list.map(function (x) { return excCard(x); }).join('') || '<p class="col-span-full text-center text-on-surface-variant py-space-xl">No excursions in this category yet.</p>';
    });
  }
  function mountGallery() {
    $$('[data-gallery]').forEach(function (box) {
      box.innerHTML = AV.gallery.map(function (g) {
        return '<a href="https://instagram.com/' + C.instagram + '" target="_blank" rel="noopener" class="relative group rounded-2xl overflow-hidden aspect-square shadow-md bg-primary/10"><img loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="' + g.src + '" alt="' + esc(g.alt) + '"/>' +
          '<div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center justify-center text-surface-pure gap-space-md"><span class="flex items-center gap-1 font-label-sm text-label-sm"><span class="material-symbols-outlined text-[18px]">favorite</span>' + g.likes + '</span><span class="flex items-center gap-1 font-label-sm text-label-sm"><span class="material-symbols-outlined text-[18px]">chat_bubble</span>' + g.comments + '</span></div></a>';
      }).join('');
    });
  }
  function mountFaq() {
    $$('[data-faq]').forEach(function (box) {
      box.innerHTML = AV.faq.map(function (f) {
        return '<details class="av-acc rounded-2xl bg-surface-pure shadow-sm border border-primary/5"><summary class="flex items-center justify-between gap-space-md p-space-md font-title-md text-title-md text-primary">' + esc(f[0]) + '<span class="material-symbols-outlined acc-chevron text-primary shrink-0">expand_more</span></summary><p class="px-space-md pb-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed">' + esc(f[1]) + '</p></details>';
      }).join('');
    });
  }

  document.addEventListener('click', function (e) {
    var r = e.target.closest('[data-room-details]'); if (r) { var room = byId(AV.rooms, r.dataset.roomDetails); if (room) roomModal(room); return; }
    var x = e.target.closest('[data-exc-card]'); if (x) { var ex = byId(AV.excursions, x.dataset.excCard); if (ex) excModal(ex); return; }
    if (e.target.closest('[data-show-all-rooms]')) {
      var cur = getSearch(); cur.room = 'all'; saveSearch(cur);
      $$('form[data-search] [name=room]').forEach(function (sel) { sel.value = 'all'; }); mountRooms(); return;
    }
    var chip = e.target.closest('[data-cat]');
    if (chip) {
      $$('[data-cat]').forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      $$('[data-excursions]').forEach(function (b) { b.dataset.active = chip.dataset.cat; }); mountExcursions();
    }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-exc-card]')) { e.preventDefault(); e.target.click(); }
  });

  /* ---------- search widget ---------- */
  function initSearch() {
    $$('form[data-search]').forEach(function (form) {
      var s = getSearch(), today = iso(new Date());
      var ci = $('[name=checkin]', form), co = $('[name=checkout]', form), gu = $('[name=guests]', form), rm = $('[name=room]', form);
      ci.min = today; ci.value = s.checkin; co.min = iso(addDays(fromIso(s.checkin), 1)); co.value = s.checkout;
      if (gu) gu.value = String(s.guests); if (rm) rm.value = s.room;
      ci.addEventListener('change', function () {
        var min = iso(addDays(fromIso(ci.value || today), 1)); co.min = min; if (!co.value || co.value < min) co.value = min;
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!ci.value || !co.value || co.value <= ci.value) { toast('Please choose a check-out date after check-in.'); return; }
        var next = { checkin: ci.value, checkout: co.value, guests: gu ? +gu.value : 2, room: rm ? rm.value : 'all' };
        saveSearch(next);
        if (form.dataset.search === 'inline') { mountRooms(); var t = $('[data-rooms]'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); toast('Rates updated for ' + nightsBetween(next.checkin, next.checkout) + ' night(s).'); }
        else location.href = 'booking.html?' + qs(next);
      });
    });
  }

  /* ---------- request senders (shared by contact / booking / newsletter) ---------- */
  function postJson(payload) {
    if (!C.formEndpoint) return Promise.resolve(false);
    return fetch(C.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  function initContactForm() {
    var f = $('#inquiry-form'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = Object.fromEntries(new FormData(f).entries());
      if (!d.name || !d.message) { toast('Please add your name and a short message.'); return; }
      var text = 'Hello Athens View! 🌴\nName: ' + d.name + (d.contact ? '\nContact: ' + d.contact : '') + (d.dates ? '\nTravel dates: ' + d.dates : '') + '\n\n' + d.message;
      postJson({ type: 'inquiry', name: d.name, contact: d.contact, dates: d.dates, message: d.message });
      try { localStorage.setItem('av_last_inquiry', JSON.stringify({ at: Date.now(), name: d.name })); } catch (er) {}
      var out = $('#inquiry-out'); if (out) {
        out.classList.remove('hidden');
        out.innerHTML = '<p class="font-title-md text-title-md text-primary flex items-center gap-1"><span class="material-symbols-outlined text-lagoon-cyan icon-fill">check_circle</span>Your message is ready to send</p><p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Tap a button below to deliver it to our reception.</p>' +
          '<div class="mt-space-sm flex flex-wrap gap-space-xs"><a target="_blank" rel="noopener" href="' + wa(text) + '" class="px-space-md py-2 rounded-full bg-bougainvillea-primary text-on-primary font-label-md text-label-md inline-flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">chat</span>Send via WhatsApp</a>' +
          '<a href="mailto:' + C.email + '?subject=' + encodeURIComponent('Enquiry from ' + d.name) + '&body=' + encodeURIComponent(text) + '" class="px-space-md py-2 rounded-full border border-primary text-primary font-label-md text-label-md inline-flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">mail</span>Send by email</a></div>';
      }
      f.reset();
    });
  }

  function initNewsletter() {
    $$('form[data-newsletter]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault(); var email = $('input[type=email]', f).value.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { toast('Please enter a valid email address.'); return; }
        if (C.formEndpoint) { postJson({ type: 'newsletter', email: email }).then(function (ok) { toast(ok ? 'Thank you – you\'re on the Island Chronicle list!' : 'Could not subscribe right now – please try again.'); if (ok) f.reset(); }); }
        else { location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent('Island Chronicle sign-up') + '&body=' + encodeURIComponent('Please add ' + email + ' to the Island Chronicle list.'); toast('Opening your email app to confirm…'); }
      });
    });
  }


  /* generic "send to WhatsApp" forms (e.g. dining table request) */
  function initWaForms() {
    $$('form[data-wa-form]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var d = Object.fromEntries(new FormData(f).entries());
        if (!d.name) { toast('Please add your name.'); return; }
        var lines = [f.dataset.waPrefix || 'Hello Athens View!'];
        Object.keys(d).forEach(function (k) { if (d[k]) lines.push((f.elements[k].dataset.label || k) + ': ' + d[k]); });
        postJson({ type: f.dataset.waForm, fields: d });
        window.open(wa(lines.join('\n')), '_blank', 'noopener');
        toast('Opening WhatsApp with your request…');
      });
    });
  }

  /* ---------- header, mobile menu, reveal ---------- */
  function initChrome() {
    var burger = $('#menu-toggle'), panel = $('#mobile-menu');
    if (burger && panel) {
      burger.addEventListener('click', function () {
        var open = panel.classList.toggle('hidden') === false; burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        $('.material-symbols-outlined', burger).textContent = open ? 'close' : 'menu';
      });
      $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { panel.classList.add('hidden'); }); });
    }
    var hdr = $('header'); if (hdr) window.addEventListener('scroll', function () { hdr.classList.toggle('shadow-lg', window.scrollY > 8); }, { passive: true });
    var page = document.body.dataset.page;
    $$('[data-nav]').forEach(function (a) { if (a.dataset.nav === page) { a.setAttribute('aria-current', 'page'); a.classList.add('text-primary', 'border-b-2', 'border-bougainvillea-primary', 'font-semibold'); a.classList.remove('text-on-surface-variant'); } });
    $$('[data-bnav]').forEach(function (a) { if (a.dataset.bnav === page) { a.classList.add('text-bougainvillea-primary'); a.classList.remove('text-on-surface-variant'); var ic = $('.material-symbols-outlined', a); if (ic) ic.classList.add('icon-fill'); } });
    $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { threshold: .08 });
      $$('.reveal').forEach(function (el) { io.observe(el); });
    } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }
    $$('[data-copy]').forEach(function (b) { b.addEventListener('click', function () { var t = b.dataset.copy; (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { toast('Copied: ' + t); }, function () { toast(t); }); }); });
  }

  /* expose for booking.js */
  AV.util = { $: $, $$: $$, esc: esc, money: money, iso: iso, fromIso: fromIso, addDays: addDays, nightsBetween: nightsBetween, prettyDate: prettyDate, byId: byId, wa: wa, toast: toast, getSearch: getSearch, saveSearch: saveSearch, qs: qs, postJson: postJson, openModal: openModal, closeModal: closeModal };

  document.addEventListener('DOMContentLoaded', function () {
    initChrome(); initSearch(); mountRooms(); mountExcursions(); mountGallery(); mountFaq(); initContactForm(); initNewsletter(); initWaForms();
  });
})();
