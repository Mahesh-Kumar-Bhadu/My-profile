// Loads portfolio data from the REST API and builds the page.
(function () {
  'use strict';

  // Small helper to build elements safely (no innerHTML, so no XSS).
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k === 'class') el.className = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) el.appendChild(c); });
    return el;
  }
  function $(id) { return document.getElementById(id); }
  function get(path) {
    return fetch('/api/' + path).then(function (r) {
      if (!r.ok) throw new Error('Request failed: ' + path);
      return r.json();
    }).then(function (j) { return j.data; });
  }
  function safeUrl(u) { return /^(https?:\/\/|\/)/.test(u || '') ? u : ''; }

  // ---- Profile ----
  function renderProfile(p) {
    document.title = p.name + ' | ' + p.headline;
    $('brand-name').textContent = p.name;
    $('hero-name').textContent = p.name;
    $('hero-tagline').textContent = p.tagline || p.headline;
    $('open-to').lastElementChild.textContent = p.openTo || '';
    var photo = $('hero-photo');
    photo.onerror = function () { photo.onerror = null; photo.src = '/images/profile.svg'; };
    photo.src = safeUrl(p.photoUrl) || '/images/profile.svg';

    var about = $('about-text');
    (p.about || []).forEach(function (t) { about.appendChild(h('p', { text: t })); });

    var edu = $('education');
    (p.education || []).forEach(function (e) {
      edu.appendChild(h('div', { class: 'edu' }, [
        h('strong', { text: e.degree }),
        h('span', { text: e.institute }),
        h('span', { text: e.year }),
        e.note ? h('p', { text: e.note }) : null
      ]));
    });
    var exp = $('experience');
    (p.experience || []).forEach(function (e) {
      exp.appendChild(h('div', { class: 'edu' }, [
        h('strong', { text: e.role }),
        h('span', { text: e.org }),
        e.note ? h('p', { text: e.note }) : null
      ]));
    });
    if (p.location) $('facts').appendChild(h('li', { text: 'Based in ' + p.location }));

    var links = $('contact-links');
    if (p.email) links.appendChild(h('li', {}, [h('a', { href: 'mailto:' + p.email, text: p.email })]));
    var s = p.socials || {};
    if (safeUrl(s.linkedin)) links.appendChild(h('li', {}, [h('a', { href: s.linkedin, target: '_blank', rel: 'noopener noreferrer', text: 'LinkedIn' })]));
    if (safeUrl(s.github)) links.appendChild(h('li', {}, [h('a', { href: s.github, target: '_blank', rel: 'noopener noreferrer', text: 'GitHub' })]));
    if (safeUrl(p.resumeUrl)) links.appendChild(h('li', {}, [h('a', { href: p.resumeUrl, target: '_blank', rel: 'noopener', text: 'Download resume' })]));
  }

  // ---- Skills: grouped as editor timeline tracks ----
  function renderSkills(skills) {
    var groups = {};
    skills.forEach(function (s) { (groups[s.category] = groups[s.category] || []).push(s); });
    var wrap = $('skills-list');
    Object.keys(groups).forEach(function (cat) {
      var track = h('div', { class: 'track' }, [h('h3', { text: cat })]);
      groups[cat].forEach(function (s) {
        var clip = h('div', { class: 'clip' + (cat === 'Editing' ? ' editing' : ''), text: s.name });
        clip.style.width = Math.max(30, Math.min(100, s.level)) + '%';
        track.appendChild(h('div', { class: 'clip-row' }, [clip]));
      });
      wrap.appendChild(track);
    });
  }

  // ---- Projects ----
  function renderProjects(projects) {
    var wrap = $('projects-list');
    projects.forEach(function (p) {
      var tags = h('ul', { class: 'tags' }, (p.tech || []).map(function (t) { return h('li', { text: t }); }));
      var links = [];
      if (safeUrl(p.liveUrl)) links.push(h('a', { href: p.liveUrl, target: '_blank', rel: 'noopener noreferrer', text: 'Live site' }));
      if (safeUrl(p.repoUrl)) links.push(h('a', { href: p.repoUrl, target: '_blank', rel: 'noopener noreferrer', text: 'Source code' }));
      wrap.appendChild(h('article', { class: 'project' }, [
        h('h3', { text: p.title }),
        h('div', {}, [h('p', { text: p.description }), tags, links.length ? h('div', { class: 'project-links' }, links) : null])
      ]));
    });
  }

  // ---- Edits ----
  function renderEdits(edits) {
    var wrap = $('edits-list');
    edits.forEach(function (e) {
      var thumb = h('div', { class: 'thumb' });
      if (safeUrl(e.thumbnail)) thumb.appendChild(h('img', { src: e.thumbnail, alt: e.title, loading: 'lazy' }));
      else thumb.textContent = 'Thumbnail coming soon';
      wrap.appendChild(h('article', { class: 'edit' }, [
        thumb,
        h('div', { class: 'edit-body' }, [
          e.type ? h('span', { class: 'edit-type', text: e.type }) : null,
          h('h3', { text: e.title }),
          h('p', { text: e.description || '' }),
          (e.tools && e.tools.length) ? h('ul', { class: 'tags' }, e.tools.map(function (t) { return h('li', { text: t }); })) : null
        ])
      ]));
    });
  }

  // ---- Hero timecode (one small, deliberate motion) ----
  function startTimecode() {
    var el = $('timecode'), t = 0;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    setInterval(function () {
      t++;
      var m = String(Math.floor(t / 60)).padStart(2, '0');
      var s = String(t % 60).padStart(2, '0');
      el.textContent = '00:' + m + ':' + s;
    }, 1000);
  }

  // ---- Contact form ----
  function setupForm() {
    var form = $('contact-form'), status = $('form-status'), btn = $('send-btn');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      status.className = ''; status.textContent = '';
      var bad = null;
      Array.prototype.forEach.call(form.elements, function (f) {
        if (!f.name || f.name === 'website') return;
        var invalid = !f.checkValidity();
        f.setAttribute('aria-invalid', invalid ? 'true' : 'false');
        if (invalid && !bad) bad = f;
      });
      if (bad) {
        status.className = 'err';
        status.textContent = bad.validationMessage || 'Please check the highlighted field.';
        bad.focus();
        return;
      }
      btn.disabled = true; btn.textContent = 'Sending...';
      var body = {};
      new FormData(form).forEach(function (v, k) { body[k] = v; });
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          status.className = res.ok ? 'ok' : 'err';
          status.textContent = res.body.message || (res.ok ? 'Message sent.' : 'Could not send. Try again.');
          if (res.ok) form.reset();
        })
        .catch(function () { status.className = 'err'; status.textContent = 'Network problem. Please try again.'; })
        .then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
    });
  }

  // ---- Start ----
  $('year').textContent = new Date().getFullYear();
  startTimecode();
  setupForm();
  Promise.all([get('profile'), get('skills'), get('projects'), get('edits')])
    .then(function (r) { renderProfile(r[0]); renderSkills(r[1]); renderProjects(r[2]); renderEdits(r[3]); })
    .catch(function (err) {
      console.error(err);
      $('hero-tagline').textContent = 'Could not load content. Is the server running and the database seeded?';
    });
})();
