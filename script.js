document.addEventListener('DOMContentLoaded', function() {

  // ===== 1. Dynamic URL Name =====
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('to') || 'Tamu Undangan';
  document.getElementById('guest-name').textContent = guestName;
  const nameInput = document.getElementById('rsvp-name');
  if (nameInput && guestName !== 'Tamu Undangan') {
    nameInput.value = guestName;
  }

  // ===== 2. Music Player & Open Invitation =====
  const audio = new Audio('Brisia Jodie ft Fabio Asher - Aku Memilihmu Lirik.mp3');
  audio.loop = true;
  let isPlaying = false;
  const disc = document.getElementById('disc');
  const btnMusic = document.getElementById('btn-music');
  const btnOpen = document.getElementById('btn-open');
  const cover = document.getElementById('cover');
  const mainContent = document.getElementById('main-content');
  const musicPlayer = document.getElementById('music-player');

  // Hide main content & music initially
  mainContent.style.display = 'none';
  musicPlayer.style.display = 'none';

  btnOpen.addEventListener('click', function() {
    cover.style.display = 'none';
    mainContent.style.display = 'block';
    musicPlayer.style.display = 'flex';
    audio.play().then(function() {
      isPlaying = true;
      disc.classList.add('spinning');
      btnMusic.innerHTML = '&#10074;&#10074;';
    }).catch(function() {
      isPlaying = false;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initObserver();
  });

  btnMusic.addEventListener('click', function() {
    if (isPlaying) {
      audio.pause();
      disc.classList.remove('spinning');
      btnMusic.innerHTML = '&#9654;';
    } else {
      audio.play();
      disc.classList.add('spinning');
      btnMusic.innerHTML = '&#10074;&#10074;';
    }
    isPlaying = !isPlaying;
  });

  // ===== 3. Countdown Timer =====
  // Target: 17 Juni 2026, 09:30 WITA (UTC+8)
  const targetDate = new Date('2026-06-17T09:30:00+08:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-minutes').textContent = '0';
      document.getElementById('cd-seconds').textContent = '0';
      return;
    }
    var d = Math.floor(diff / (1000 * 60 * 60 * 24));
    var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var s = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('cd-days').textContent = d;
    document.getElementById('cd-hours').textContent = h;
    document.getElementById('cd-minutes').textContent = m;
    document.getElementById('cd-seconds').textContent = s;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== 4. RSVP & Guestbook =====
  var msgCount = 2; // 2 dummy messages
  document.getElementById('msg-count').textContent = msgCount;
  var rsvpForm = document.getElementById('rsvp-form');

  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('rsvp-name').value.trim();
    var attendance = document.getElementById('rsvp-attend').value;
    var message = document.getElementById('rsvp-message').value.trim();
    if (!name || !message) return;

    var now = new Date();
    var timeStr = now.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) + ', ' + now.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
    var initial = name.charAt(0).toUpperCase();
    var badgeClass = attendance === 'Hadir' ? 'badge-hadir' : 'badge-tidak';
    var badgeText = attendance === 'Hadir' ? '✓ Hadir' : '✗ Tidak Hadir';

    var card = document.createElement('div');
    card.className = 'msg-card fade-up visible';
    card.innerHTML = '<div class="msg-head"><div class="msg-avatar">' + initial + '</div><div><span class="msg-name">' + name + '</span><span class="badge ' + badgeClass + '">' + badgeText + '</span></div></div><p class="msg-text">' + message + '</p><p class="msg-time">' + timeStr + '</p>';

    var msgList = document.getElementById('msg-list');
    msgList.insertBefore(card, msgList.firstChild);

    msgCount++;
    document.getElementById('msg-count').textContent = msgCount;

    document.getElementById('rsvp-name').value = '';
    document.getElementById('rsvp-attend').value = 'Hadir';
    document.getElementById('rsvp-message').value = '';
  });

  // ===== 5. Copy to Clipboard =====
  document.getElementById('btn-copy').addEventListener('click', function() {
    navigator.clipboard.writeText('1610011590606').then(function() {
      var toast = document.getElementById('copy-toast');
      toast.classList.add('show');
      setTimeout(function() { toast.classList.remove('show'); }, 2000);
    }).catch(function() {
      // Fallback
      var ta = document.createElement('textarea');
      ta.value = '1610011590606';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      var toast = document.getElementById('copy-toast');
      toast.classList.add('show');
      setTimeout(function() { toast.classList.remove('show'); }, 2000);
    });
  });

  // ===== Scroll Fade-Up Animation =====
  function initObserver() {
    var els = document.querySelectorAll('.fade-up');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function(el) { observer.observe(el); });
  }
});
