/* ==========================================================================
   Athens View Maldives – booking page logic
   Builds a live quote and turns it into a WhatsApp / email booking request.
   (No server needed – works on GitHub Pages.)
   ========================================================================== */
(function () {
  'use strict';
  var AV = window.AV, C = AV.config, U = AV.util;
  var $ = U.$, $$ = U.$$, money = U.money, esc = U.esc;
  var form = $('#booking-form'); if (!form) return;

  var TRANSFER = { none: 0, arrival: 1, departure: 1, both: 2 };
  var TRANSFER_LABEL = { none: 'No transfer needed', arrival: 'Airport → Guraidhoo (arrival)', departure: 'Guraidhoo → Airport (departure)', both: 'Round trip (arrival + departure)' };

  var s = U.getSearch();
  var q = new URLSearchParams(location.search);
  var preExc = (q.get('exc') || '').split(',').filter(Boolean);
  var today = U.iso(new Date());

  /* ---- build room options + excursion checklist ---- */
  var roomSel = $('[name=room]', form);
  roomSel.innerHTML = AV.rooms.map(function (r) { return '<option value="' + r.id + '">' + esc(r.name.replace('Ocean View ', '')) + ' · ' + money(r.price) + '</option>'; }).join('');
  roomSel.value = (q.get('room') && U.byId(AV.rooms, q.get('room'))) ? q.get('room') : (U.byId(AV.rooms, s.room) ? s.room : AV.rooms[0].id);

  $('#exc-list').innerHTML = AV.excursions.map(function (x) {
    return '<label class="flex items-center gap-space-md p-space-sm rounded-2xl bg-surface-pure border border-primary/10 hover:border-primary/40 cursor-pointer transition-colors has-[:checked]:border-bougainvillea-primary has-[:checked]:bg-sand-whisper">' +
      '<input type="checkbox" name="exc" value="' + x.id + '" class="w-5 h-5 accent-[#D81B60] shrink-0" ' + (preExc.indexOf(x.id) > -1 ? 'checked' : '') + '/>' +
      '<img class="w-16 h-16 rounded-xl object-cover shrink-0 bg-primary/10" loading="lazy" src="' + x.images[0] + '" alt=""/>' +
      '<span class="flex-1 min-w-0"><span class="block font-title-md text-title-md text-primary truncate">' + esc(x.name) + '</span><span class="block font-label-sm text-label-sm text-on-surface-variant">' + esc(x.duration) + ' · ' + esc(x.depart) + '</span></span>' +
      '<span class="text-right shrink-0"><span class="block font-title-md text-title-md text-primary">' + money(x.price) + '</span><span class="block font-label-sm text-label-sm text-on-surface-variant">per person</span></span></label>';
  }).join('');

  /* ---- initial values ---- */
  var ci = $('[name=checkin]', form), co = $('[name=checkout]', form), gu = $('[name=guests]', form);
  ci.min = today; ci.value = s.checkin; co.min = U.iso(U.addDays(U.fromIso(s.checkin), 1)); co.value = s.checkout; gu.value = String(s.guests);

  /* ---- quote ---- */
  function quote() {
    var room = U.byId(AV.rooms, roomSel.value), guests = Math.max(1, parseInt(gu.value, 10) || 1);
    var nights = U.nightsBetween(ci.value, co.value), rooms = Math.ceil(guests / room.maxGuests);
    var lines = [], total = 0;
    var roomCost = nights > 0 ? room.price * nights * rooms : 0; total += roomCost;
    lines.push({ label: rooms + ' × ' + room.name, sub: nights > 0 ? nights + ' night' + (nights > 1 ? 's' : '') + ' × ' + money(room.price) : 'Choose valid dates', amt: roomCost });
    var excs = $$('[name=exc]:checked', form).map(function (c) { return U.byId(AV.excursions, c.value); });
    excs.forEach(function (x) { var a = x.price * guests; total += a; lines.push({ label: x.name, sub: guests + ' guest' + (guests > 1 ? 's' : '') + ' × ' + money(x.price), amt: a }); });
    var tr = $('[name=transfer]', form).value, trN = TRANSFER[tr];
    if (trN) { var ta = C.transferPrice * guests * trN; total += ta; lines.push({ label: 'Speedboat transfer', sub: TRANSFER_LABEL[tr] + ' · ' + guests + ' guest' + (guests > 1 ? 's' : ''), amt: ta }); }
    return { room: room, guests: guests, nights: nights, rooms: rooms, excs: excs, transfer: tr, lines: lines, total: total };
  }

  function render() {
    var qd = quote();
    var warn = $('#guest-warn');
    warn.textContent = qd.rooms > 1 ? qd.room.name + ' sleeps ' + qd.room.maxGuests + ' – we\'ve included ' + qd.rooms + ' rooms for ' + qd.guests + ' guests.' : '';
    warn.classList.toggle('hidden', qd.rooms <= 1);
    $('#sum-dates').textContent = qd.nights > 0 ? U.prettyDate(ci.value) + ' → ' + U.prettyDate(co.value) + ' (' + qd.nights + ' night' + (qd.nights > 1 ? 's' : '') + ')' : 'Select your dates';
    $('#sum-img').src = qd.room.images[0];
    $('#sum-room').textContent = qd.room.name;
    $('#sum-lines').innerHTML = qd.lines.map(function (l) {
      return '<li class="flex items-start justify-between gap-space-sm py-space-xs"><span><span class="block font-body-sm text-body-sm text-on-surface font-semibold">' + esc(l.label) + '</span><span class="block font-label-sm text-label-sm text-on-surface-variant">' + esc(l.sub) + '</span></span><span class="font-title-md text-title-md text-primary shrink-0">' + money(l.amt) + '</span></li>'; }).join('');
    $('#sum-total').textContent = money(qd.total);
    $('#sum-total-mobile').textContent = money(qd.total);
    U.saveSearch({ checkin: ci.value, checkout: co.value, guests: qd.guests, room: qd.room.id });
  }

  ci.addEventListener('change', function () { var min = U.iso(U.addDays(U.fromIso(ci.value || today), 1)); co.min = min; if (!co.value || co.value < min) co.value = min; render(); });
  form.addEventListener('change', render); form.addEventListener('input', function (e) { if (e.target === gu) render(); });
  $$('[data-step]').forEach(function (b) { b.addEventListener('click', function () { var v = (parseInt(gu.value, 10) || 1) + parseInt(b.dataset.step, 10); gu.value = Math.max(1, Math.min(8, v)); render(); }); });

  /* ---- submit ---- */
  function ref() { return 'AV-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(); }
  function field(n) { var el = form.elements[n]; return el ? el.value.trim() : ''; }
  function fail(el, msg) { U.toast(msg); if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } return false; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var qd = quote();
    if (qd.nights < 1) return fail(co, 'Please choose a check-out date after check-in.');
    if (field('checkin') < today) return fail(ci, 'Check-in cannot be in the past.');
    if (!field('name')) return fail(form.elements.name, 'Please enter your full name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field('email'))) return fail(form.elements.email, 'Please enter a valid email address.');
    if (field('phone').replace(/\D/g, '').length < 6) return fail(form.elements.phone, 'Please enter a phone / WhatsApp number.');

    var r = ref();
    var lines = ['*Booking request ' + r + '* 🌴', '',
      '*Guest:* ' + field('name'), '*Email:* ' + field('email'), '*WhatsApp/Phone:* ' + field('phone'), field('country') ? '*Country:* ' + field('country') : '',
      '', '*Stay:* ' + U.prettyDate(field('checkin')) + ' → ' + U.prettyDate(field('checkout')) + ' (' + qd.nights + ' nights)',
      '*Guests:* ' + qd.guests, '*Room:* ' + qd.rooms + ' × ' + qd.room.name,
      qd.excs.length ? '*Excursions:* ' + qd.excs.map(function (x) { return x.name; }).join(', ') : '',
      '*Transfer:* ' + TRANSFER_LABEL[qd.transfer],
      field('arrival') ? '*Arrival details:* ' + field('arrival') : '', field('notes') ? '*Notes:* ' + field('notes') : '',
      '', '*Estimated total:* ' + money(qd.total) + ' (' + C.rateNote.toLowerCase() + ')'].filter(function (l, i, a) { return l !== '' || (a[i - 1] !== ''); });
    var text = lines.join('\n');

    var record = { ref: r, at: new Date().toISOString(), name: field('name'), email: field('email'), phone: field('phone'), checkin: field('checkin'), checkout: field('checkout'), guests: qd.guests, room: qd.room.id, rooms: qd.rooms, excursions: qd.excs.map(function (x) { return x.id; }), transfer: qd.transfer, total: qd.total };
    try { var all = JSON.parse(localStorage.getItem('av_bookings') || '[]'); all.unshift(record); localStorage.setItem('av_bookings', JSON.stringify(all.slice(0, 10))); } catch (er) {}
    U.postJson(Object.assign({ type: 'booking', summary: text }, record));

    $('#booking-wrap').classList.add('hidden');
    var box = $('#confirmation'); box.classList.remove('hidden');
    $('#conf-ref').textContent = r;
    $('#conf-text').textContent = text.replace(/\*/g, '');
    $('#conf-wa').href = U.wa(text);
    $('#conf-mail').href = 'mailto:' + C.email + '?subject=' + encodeURIComponent('Booking request ' + r) + '&body=' + encodeURIComponent(text.replace(/\*/g, ''));
    $('#conf-copy').onclick = function () { (navigator.clipboard ? navigator.clipboard.writeText(text.replace(/\*/g, '')) : Promise.reject()).then(function () { U.toast('Booking summary copied'); }, function () { U.toast('Select the text and copy it manually'); }); };
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $('#conf-new') && $('#conf-new').addEventListener('click', function () { $('#confirmation').classList.add('hidden'); $('#booking-wrap').classList.remove('hidden'); window.scrollTo({ top: 0 }); });
  render();
})();
