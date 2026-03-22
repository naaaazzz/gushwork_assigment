/* ══════════════════════════════════════════════════
   EUROPEFLEX – script.js
   Carousel · Sticky Header · FAQ · Modals ·
   Process Tabs · Scroll Fade-in · Mobile Nav
══════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────
   IMAGE CAROUSEL
────────────────────────────────────────────── */
var currentSlide   = 0;
var totalSlides    = 3;
var carouselTimer  = null;

function updateCarousel() {
  var track = document.getElementById('carousel-track');
  if (!track) return;

  /* Move track */
  track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

  /* Dots */
  var dots = document.querySelectorAll('.carousel__dot');
  dots.forEach(function (dot, i) {
    dot.classList.toggle('carousel__dot--active', i === currentSlide);
  });

  /* Thumbnails */
  for (var i = 0; i < totalSlides; i++) {
    var thumb = document.getElementById('thumb-' + i);
    if (!thumb) continue;
    if (i === currentSlide) {
      thumb.classList.add('thumb--active');
    } else {
      thumb.classList.remove('thumb--active');
    }
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
  resetCarouselTimer();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
  resetCarouselTimer();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetCarouselTimer();
}

function resetCarouselTimer() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 5000);
}

/* ──────────────────────────────────────────────
   STICKY HEADER
────────────────────────────────────────────── */
var stickyHeader  = null;
var heroSection   = null;
var lastScrollY   = 0;

function handleScroll() {
  if (!stickyHeader || !heroSection) return;

  var scrollY    = window.scrollY || window.pageYOffset;
  var heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  var goingDown  = scrollY > lastScrollY;

  if (scrollY > heroBottom && goingDown) {
    /* Scrolled past hero going down → show */
    stickyHeader.classList.remove('sticky-header--hidden');
    stickyHeader.classList.add('sticky-header--visible');
  } else if (scrollY < lastScrollY || scrollY <= heroBottom) {
    /* Scrolling up OR back inside hero → hide */
    stickyHeader.classList.remove('sticky-header--visible');
    stickyHeader.classList.add('sticky-header--hidden');
  }

  lastScrollY = scrollY;
}

/* ──────────────────────────────────────────────
   MOBILE NAV
────────────────────────────────────────────── */
function toggleMenu() {
  var links    = document.getElementById('nav-links');
  var hamburger = document.getElementById('hamburger');
  if (!links || !hamburger) return;
  links.classList.toggle('nav-open');
  hamburger.classList.toggle('open');
}

function closeMenu() {
  var links     = document.getElementById('nav-links');
  var hamburger = document.getElementById('hamburger');
  if (links)    links.classList.remove('nav-open');
  if (hamburger) hamburger.classList.remove('open');
}

/* Close menu on outside click */
document.addEventListener('click', function (e) {
  var nav  = document.getElementById('main-nav');
  var links = document.getElementById('nav-links');
  if (nav && links && !nav.contains(e.target)) {
    closeMenu();
  }
});

/* ──────────────────────────────────────────────
   FAQ ACCORDION
────────────────────────────────────────────── */
function toggleFaq(btn) {
  var answer  = btn.nextElementSibling;
  var icon    = btn.querySelector('.faq-icon');
  var isOpen  = answer.classList.contains('faq-answer--open');

  /* Close all first */
  document.querySelectorAll('.faq-answer').forEach(function (el) {
    el.classList.remove('faq-answer--open');
  });
  document.querySelectorAll('.faq-icon').forEach(function (el) {
    el.classList.remove('faq-icon--open');
  });

  /* Toggle clicked one */
  if (!isOpen) {
    answer.classList.add('faq-answer--open');
    icon.classList.add('faq-icon--open');
  }
}

/* ──────────────────────────────────────────────
   MODALS
────────────────────────────────────────────── */
function openModal(name) {
  var modal = document.getElementById('modal-' + name);
  if (!modal) return;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(name) {
  var modal = document.getElementById('modal-' + name);
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* Close on backdrop click */
['callback', 'quote', 'brochure'].forEach(function (name) {
  var modal = document.getElementById('modal-' + name);
  if (!modal) return;
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal(name);
  });
});

/* Close on Escape key */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    ['callback', 'quote', 'brochure'].forEach(closeModal);
  }
});

/* ──────────────────────────────────────────────
   FORM SUBMISSION (simulate)
────────────────────────────────────────────── */
function submitForm(name) {
  closeModal(name);
  showToast('✓ Submitted successfully! We\'ll be in touch soon.');
}

function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('toast--show');
  setTimeout(function () {
    toast.classList.remove('toast--show');
  }, 3500);
}

/* ──────────────────────────────────────────────
   MANUFACTURING PROCESS TABS
────────────────────────────────────────────── */
var processData = [
  {
    title: 'High-Grade Raw Material Selection',
    desc:  'We start with incoming quality checks on all raw material lots. Only BIS-certified PE 100 compound batches with verified MFI and carbon black content are approved for production.',
    points: ['PE 100 Grade Compound', 'MFI: 0.2–0.4 g/10min', 'Carbon Black: 2–2.5%'],
    img:   'https://images.unsplash.com/photo-1635348729745-9a55f4e49e4c?w=700&q=80'
  },
  {
    title: 'Compound Blending',
    desc:  'Pigments and UV stabilizers are blended with the base resin in precise ratios for colour consistency and long-term UV resistance in outdoor applications.',
    points: ['UV Stabilizers added', 'Blue/Black stripe pigments', 'Gravimetric dosing system'],
    img:   'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80'
  },
  {
    title: 'Extrusion Process',
    desc:  'The compound is fed into a single-screw extruder. Die temperature and screw speed are precisely controlled to achieve uniform melt flow and wall thickness.',
    points: ['Die temperature: 190–210°C', 'SDR controlled by puller speed', 'Real-time wall thickness gauge'],
    img:   'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80'
  },
  {
    title: 'Cooling & Sizing',
    desc:  'The extruded pipe passes through vacuum sizing tanks and spray cooling troughs to fix dimensions and ensure roundness before cutting.',
    points: ['Vacuum sizing tank', 'Spray cooling baths', 'Ovality < 1.5%'],
    img:   'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=700&q=80'
  },
  {
    title: 'Printing & Marking',
    desc:  'Every pipe is printed with manufacturer details, size, pressure rating, material grade, IS certification mark, and production batch number for full traceability.',
    points: ['IS mark & batch code', 'PN & SDR values', 'Date of manufacture'],
    img:   'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=700&q=80'
  },
  {
    title: 'Final Testing & Dispatch',
    desc:  'Finished pipes undergo hydrostatic pressure tests, dimensional checks, and visual inspection before packing and dispatch with full test documentation.',
    points: ['Hydrostatic test @ 1.5× PN', 'Visual & dimensional QC', 'NABL-accredited lab reports'],
    img:   'https://images.unsplash.com/photo-1635348729745-9a55f4e49e4c?w=700&q=80'
  }
];

function switchProcess(idx, btn) {
  var data = processData[idx];
  if (!data) return;

  /* Update content */
  var titleEl  = document.getElementById('process-title');
  var descEl   = document.getElementById('process-desc');
  var pointsEl = document.getElementById('process-points');
  var imgEl    = document.getElementById('process-img');

  if (titleEl)  titleEl.textContent  = data.title;
  if (descEl)   descEl.textContent   = data.desc;
  if (pointsEl) {
    pointsEl.innerHTML = data.points.map(function (p) {
      return '<li>' + p + '</li>';
    }).join('');
  }
  if (imgEl) {
    imgEl.style.opacity = '0';
    setTimeout(function () {
      imgEl.src = data.img;
      imgEl.style.opacity = '1';
    }, 200);
  }

  /* Update tab buttons */
  var allTabs = document.querySelectorAll('.process-tab');
  allTabs.forEach(function (tab, i) {
    if (i === idx) {
      tab.classList.add('process-tab--active');
    } else {
      tab.classList.remove('process-tab--active');
    }
  });
}

/* ──────────────────────────────────────────────
   SCROLL FADE-IN (Intersection Observer)
────────────────────────────────────────────── */
function initFadeIn() {
  var elements = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    /* Fallback for older browsers */
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
}

/* ──────────────────────────────────────────────
   INIT – run after DOM is ready
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  /* Carousel */
  updateCarousel();
  carouselTimer = setInterval(nextSlide, 5000);

  /* Sticky header references */
  stickyHeader = document.getElementById('sticky-header');
  heroSection  = document.getElementById('hero');
  lastScrollY  = window.scrollY || window.pageYOffset;
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* Scroll fade-in */
  initFadeIn();

  /* Ensure first process step is shown */
  switchProcess(0, null);
});
