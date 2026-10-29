/**
 * NOUR & MOAMEN - ROMANTIC PORTAL JAVASCRIPT
 * Optimized for iOS Safari, mobile gestures, and smooth 60fps performance
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. AUDIO CONTROLLER & IPHONE SAFARI UNLOCK
     ========================================================================== */
  const audio = document.getElementById('main-audio');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const vinylRecord = document.getElementById('vinyl-record');
  const equalizerBars = document.getElementById('equalizer-bars');
  const playerDiscBtn = document.getElementById('player-disc-btn');
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const totalDurationEl = document.getElementById('total-duration');

  let isPlaying = false;

  function updatePlayState(playing) {
    isPlaying = playing;
    if (playing) {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      vinylRecord.classList.add('spinning');
      equalizerBars.classList.add('active');
    } else {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      vinylRecord.classList.remove('spinning');
      equalizerBars.classList.remove('active');
    }
  }

  function togglePlay() {
    if (!audio) return;
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => updatePlayState(true))
          .catch((err) => {
            console.log('Audio autoplay prevented or error:', err);
            updatePlayState(false);
          });
      }
    } else {
      audio.pause();
      updatePlayState(false);
    }
  }

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
  if (playerDiscBtn) playerDiscBtn.addEventListener('click', togglePlay);

  // Time & Progress Formatting
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  if (audio) {
    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
      if (totalDurationEl) totalDurationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
      updatePlayState(false);
    });
  }

  if (progressContainer && audio) {
    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      if (duration) {
        audio.currentTime = (clickX / width) * duration;
      }
    });
  }

  /* ==========================================================================
     2. INTRO ENVELOPE OPENING & GESTURE UNLOCK
     ========================================================================== */
  const introOverlay = document.getElementById('intro-overlay');
  const envelopeTrigger = document.getElementById('envelope-trigger');
  const openGiftBtn = document.getElementById('open-gift-btn');
  const envelope = document.querySelector('.envelope');

  function openGiftAndPlayAudio() {
    if (envelope) envelope.classList.add('open');

    // Trigger audio inside this user-initiated click (Crucial for iOS Safari!)
    if (audio && audio.paused) {
      audio.play()
        .then(() => updatePlayState(true))
        .catch((e) => console.log('Audio play gesture fallback:', e));
    }

    // Launch celebratory gentle confetti
    launchConfetti(40);

    setTimeout(() => {
      if (introOverlay) {
        introOverlay.classList.add('hidden');
      }
    }, 800);
  }

  if (envelopeTrigger) envelopeTrigger.addEventListener('click', openGiftAndPlayAudio);
  if (openGiftBtn) openGiftBtn.addEventListener('click', openGiftAndPlayAudio);

  // Fallback: If user touches anywhere before opening, unlock audio smoothly
  document.body.addEventListener('touchstart', function unlockAudioOnFirstTouch() {
    if (audio && audio.paused && !introOverlay.classList.contains('hidden')) {
      // Just cue audio context
    }
  }, { once: true });

  /* ==========================================================================
     3. MILESTONE LIVE COUNTERS & HEARTBEATS
     ========================================================================== */
  // Date 1: 6 September 2025 (قراءة الفاتحة)
  const fatihaDate = new Date(2025, 8, 6, 0, 0, 0); // Month is 0-indexed (8 = September)
  // Date 2: 19 September 2025 (الخطوبة)
  const engagementDate = new Date(2025, 8, 19, 0, 0, 0);

  function updateCounters() {
    const now = new Date();

    // 1. Fatiha Counter
    const diffFatiha = Math.abs(now.getTime() - fatihaDate.getTime());
    const fDays = Math.floor(diffFatiha / (1000 * 60 * 60 * 24));
    const fHours = Math.floor((diffFatiha / (1000 * 60 * 60)) % 24);
    const fMinutes = Math.floor((diffFatiha / (1000 * 60)) % 60);
    const fSeconds = Math.floor((diffFatiha / 1000) % 60);

    const fDaysEl = document.getElementById('fatiha-days');
    const fHoursEl = document.getElementById('fatiha-hours');
    const fMinEl = document.getElementById('fatiha-minutes');
    const fSecEl = document.getElementById('fatiha-seconds');

    if (fDaysEl) fDaysEl.textContent = fDays;
    if (fHoursEl) fHoursEl.textContent = fHours;
    if (fMinEl) fMinEl.textContent = fMinutes;
    if (fSecEl) fSecEl.textContent = fSeconds;

    // 2. Engagement Counter
    const diffEng = Math.abs(now.getTime() - engagementDate.getTime());
    const eDays = Math.floor(diffEng / (1000 * 60 * 60 * 24));
    const eHours = Math.floor((diffEng / (1000 * 60 * 60)) % 24);
    const eMinutes = Math.floor((diffEng / (1000 * 60)) % 60);
    const eSeconds = Math.floor((diffEng / 1000) % 60);

    const eDaysEl = document.getElementById('eng-days');
    const eHoursEl = document.getElementById('eng-hours');
    const eMinEl = document.getElementById('eng-minutes');
    const eSecEl = document.getElementById('eng-seconds');

    if (eDaysEl) eDaysEl.textContent = eDays;
    if (eHoursEl) eHoursEl.textContent = eHours;
    if (eMinEl) eMinEl.textContent = eMinutes;
    if (eSecEl) eSecEl.textContent = eSeconds;

    // 3. Heartbeats Counter (approx 72 bpm = 1.2 bps)
    const totalEngSeconds = Math.floor(diffEng / 1000);
    const heartbeats = Math.floor(totalEngSeconds * 1.2);
    const heartbeatCountEl = document.getElementById('heartbeat-count');
    if (heartbeatCountEl) {
      heartbeatCountEl.textContent = heartbeats.toLocaleString('en-US');
    }
  }

  updateCounters();
  setInterval(updateCounters, 1000);

  /* ==========================================================================
     4. INTERACTIVE "MAKE HER SMILE / FORGIVE ME" WIDGET
     ========================================================================== */
  const btnForgiveYes = document.getElementById('btn-forgive-yes');
  const btnForgiveNo = document.getElementById('btn-forgive-no');
  const bubbleText = document.getElementById('bubble-text');
  const bubbleEmoji = document.getElementById('bubble-emoji');
  const forgiveCounterHint = document.getElementById('forgive-counter-hint');
  const celebrationModal = document.getElementById('celebration-modal');
  const celebrationClose = document.getElementById('celebration-close');

  const apologyResponses = [
    { text: "طب وحياة ضحكتك القمر دي تسامحيني؟ 🥺❤️", emoji: "🥺" },
    { text: "طب فنجان قهوة مخصوص وشوكولاتة ونتصالح؟ ☕🍫", emoji: "🥰" },
    { text: "مقدرش على زعلك والله يا روحي.. هونت عليكي؟ 💔", emoji: "😭" },
    { text: "طب شوفي الزرار الأخضر كبر ازاي.. اضغطي عليه بقى يا قلبي! ✨", emoji: "👉" },
    { text: "ده أنتي نور عيني وسر سعادتي.. مفيش زعل بين القلوب الصافية! 🌸", emoji: "🕊️" },
    { text: "خلاص بقى قلبي هيموت من غير رضاكي.. سامحيني يا نور! ❤️", emoji: "💍" }
  ];

  let noClickCount = 0;
  let yesScale = 1.0;

  if (btnForgiveNo) {
    btnForgiveNo.addEventListener('click', () => {
      noClickCount++;
      yesScale += 0.22; // Button grows noticeably!

      // Scale up the Yes button with smooth bounce
      if (btnForgiveYes) {
        btnForgiveYes.style.transform = `scale(${Math.min(yesScale, 2.2)})`;
        btnForgiveYes.style.boxShadow = `0 12px ${30 + noClickCount * 6}px rgba(16, 185, 129, 0.7)`;
      }

      // Pick humorous / loving response
      const item = apologyResponses[(noClickCount - 1) % apologyResponses.length];
      if (bubbleText) bubbleText.textContent = item.text;
      if (bubbleEmoji) bubbleEmoji.textContent = item.emoji;

      if (forgiveCounterHint) {
        forgiveCounterHint.textContent = `محاولة مصالحة رقم ${noClickCount}.. مش هسيبك إلا وانتي راضية ومبتسمة! 🥰`;
      }

      // Pulse animation on dialog
      const dialog = document.getElementById('apology-dialog');
      if (dialog) {
        dialog.style.transform = 'scale(1.05)';
        setTimeout(() => dialog.style.transform = 'scale(1)', 200);
      }
    });
  }

  // Yes / Forgive button clicked
  if (btnForgiveYes) {
    btnForgiveYes.addEventListener('click', () => {
      // Launch massive celebration confetti
      launchConfetti(150);

      if (celebrationModal) {
        celebrationModal.classList.add('active');
        celebrationModal.setAttribute('aria-hidden', 'false');
      }

      if (bubbleText) {
        bubbleText.textContent = "الحمد لله روحي ردت فيا! ربنا ما يحرمني من قلبك الطيب أبداً يا نور ❤️";
      }
      if (bubbleEmoji) {
        bubbleEmoji.textContent = "🥰";
      }
    });
  }

  if (celebrationClose) {
    celebrationClose.addEventListener('click', () => {
      if (celebrationModal) {
        celebrationModal.classList.remove('active');
        celebrationModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ==========================================================================
     5. 10 REASONS WHY I LOVE YOU (INTERACTIVE REVEAL)
     ========================================================================== */
  const reasonCards = document.querySelectorAll('.reason-card');
  const reasonsCountLabel = document.getElementById('reasons-count-label');
  const reasonsFill = document.getElementById('reasons-fill');
  const discoveredSet = new Set();

  reasonCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = card.getAttribute('data-index');
      card.classList.toggle('revealed');
      
      if (!discoveredSet.has(idx)) {
        discoveredSet.add(idx);
        const count = discoveredSet.size;
        if (reasonsCountLabel) {
          reasonsCountLabel.textContent = `اكتشفتي ${count} من 10 أسباب ${count === 10 ? '🎉 كل الأسباب وأكتر بكتير!' : ''}`;
        }
        if (reasonsFill) {
          reasonsFill.style.width = `${(count / 10) * 100}%`;
        }

        if (count === 10) {
          launchConfetti(50);
        }
      }
    });
  });

  /* ==========================================================================
     6. PHOTO GALLERY & FILTER TABS
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden-item');
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });

  /* ==========================================================================
     7. FULLSCREEN LIGHTBOX WITH TOUCH & SWIPE SUPPORT
     ========================================================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  // Collect all gallery items
  const photosData = Array.from(galleryItems).map((item) => ({
    src: item.getAttribute('data-src'),
    caption: item.getAttribute('data-caption')
  }));

  let currentPhotoIndex = 0;

  function openLightbox(index) {
    currentPhotoIndex = index;
    const photo = photosData[currentPhotoIndex];
    if (!photo) return;

    if (lightboxImg) lightboxImg.src = photo.src;
    if (lightboxCaption) lightboxCaption.textContent = photo.caption;
    if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${photosData.length}`;

    if (lightboxModal) {
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
    }
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
    openLightbox(currentPhotoIndex);
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
    openLightbox(currentPhotoIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextPhoto);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevPhoto);

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showPrevPhoto(); // RTL
    if (e.key === 'ArrowLeft') showNextPhoto();  // RTL
  });

  // Mobile Touch Swipe Handlers for iOS Safari
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        showPrevPhoto(); // Swiped right
      } else {
        showNextPhoto(); // Swiped left
      }
    }
  }

  /* ==========================================================================
     8. LIGHTWEIGHT GPU-FRIENDLY CONFETTI CANVAS
     ========================================================================== */
  const canvas = document.getElementById('confetti-canvas');
  let ctx = null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  if (canvas) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  function launchConfetti(count = 80) {
    if (!ctx || !canvas) return;

    const colors = ['#ff5277', '#f7da8d', '#e5b85a', '#ffffff', '#ff758c'];
    confettiParticles = [];

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 10,
        vy: -Math.random() * 8 - 4,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 6,
        gravity: 0.22,
        isHeart: Math.random() > 0.4,
        alpha: 1,
        life: 0
      });
    }

    if (!confettiAnimationId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.life++;

      if (p.life > 90) {
        p.alpha -= 0.02;
      }

      if (p.alpha <= 0 || p.y > canvas.height + 20) {
        confettiParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isHeart) {
        // Draw heart shape
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const topCurveHeight = p.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -p.size / 2, 0, -p.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-p.size / 2, (p.size + topCurveHeight) / 2, 0, (p.size + topCurveHeight) / 2 + 3, 0, p.size);
        ctx.bezierCurveTo(0, (p.size + topCurveHeight) / 2 + 3, p.size / 2, (p.size + topCurveHeight) / 2, p.size / 2, topCurveHeight);
        ctx.bezierCurveTo(p.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
      } else {
        // Golden sparkle rect
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      ctx.restore();
    }

    if (confettiParticles.length > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiAnimationId = null;
    }
  }
});
